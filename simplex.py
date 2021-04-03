import numpy as np

np.set_printoptions(precision=2, floatmode='fixed')

k = np.array([0, 1, 8, 0, 0, 0])

T = np.array([[0, 8, 4, -1, 1, 0, 0],
              [0, 5, -1, 2, 0, 1, 0],
              [0, 1, -2, 1, 0, 0, 1]])

TF = T.astype(np.float)


# Расчет оценок
def deltaJ(matrix):
    p = 1  # индекс элементов массива с оценками
    global marks
    marks = np.array([])
    a = len(marks)
    while a != 6:
        mark = 0
        for i in range(len(matrix)):
            mark += matrix[i][0] * matrix[i][p]
        mark -= k[p - 1]
        marks = np.append(marks, mark)
        a = len(marks)
        p += 1


def marks_check(grades):
    for grade in grades:
        if grade < 0:
            return False
        else:
            return True


# Нахождение опорного элемента
def reference_elem(matrix, grades):
    global reference
    global min_reference  # Будет возвращать значение опорного элемента
    global row_refer  # Строка с опорным элементом
    for i in range(len(matrix)):
        if matrix[i][grades.argmin() + 1] > 0:
            min_reference = matrix[i][grades.argmin() + 1]
            row_refer = i
            score = matrix[i][1] / min_reference
            break
    for i in range(len(matrix)):
        if (matrix[i][1]/matrix[i][grades.argmin() + 1] < score) and (matrix[i][1]/matrix[i][grades.argmin() + 1] > 0):
            min_reference = matrix[i][grades.argmin() + 1]
            row_refer = i
    reference = min_reference
    return reference


# Создание новой таблицы на основе старой
def new_iteration(matrix):
    m2 = matrix.copy()
    r = reference  # Беру опорный элемент
    matrix[row_refer][0] = k[marks.argmin()]
    for i in range(1, len(matrix[0])):
        matrix[row_refer][i] /= r
    for i in range(len(matrix)):
        if i == row_refer:
            continue
        for j in range(1, len(m2[i])):
            matrix[i][j] = m2[i][j] - matrix[row_refer][j] * m2[i][marks.argmin() + 1]
    deltaJ(TF)
    reference_elem(TF, marks)



deltaJ(TF)
reference_elem(TF, marks)
print(TF)
print(marks)
print('Опорный элемент: ' + str(reference))
print('Строка опорного элемента: ' + str(row_refer))
print('\n')

new_iteration(TF)
print(TF)
print(marks)
print('Опорный элемент: ' + str(reference))
print('Строка опорного элемента: ' + str(row_refer))
print('\n')

new_iteration(TF)
print(TF)
print(marks)
print('Опорный элемент: ' + str(reference))
print('Строка опорного элемента: ' + str(row_refer))
print('\n')

new_iteration(TF)
print(TF)
print(marks)
print('Значение целевой функции: ' + str(marks[0]))
