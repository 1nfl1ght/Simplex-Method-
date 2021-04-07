let k = ([0, 0, 0, 0, 0, 0]);

let t = ([[0, 0, 0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0, 1, 0],
          [0, 0, 0, 0, 0, 0, 1]])

let initial_data = new Array();

function write_init() {
    initial_data = [];
    let allinputs = document.querySelectorAll('input[type="number"]');
    let myLength = allinputs.length;

    for (let i = 0; i < myLength; ++i) {
        initial_data.push(parseFloat(allinputs[i].value))
    }
}

function push_init(your_data) {
    let p = 0;
    for (let i = 0, j = 2; i < 3, j < your_data.length; i++, j+=3) {
        t[i][1] = your_data[j];
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 2; j < 4; j++) {
            if (p == 2 || p == 5) {
                t[i][j] = initial_data[p+1];
                p++;
            }
            else {
                t[i][j] = initial_data[p];
                p++;
            }
        }
    }
    console.log(t)
}

function hui() {
    write_init();
    console.log(initial_data);
    push_init(initial_data);
}

let marks = new Array();

// Расчет оценок
function deltaJ(matrix) {
    let p = 1;  // индекс элементов массива с оценками
    marks = [];
    let a = marks.length;
    while (a != 6){
        mark = 0;
        for (let i = 0; i < matrix.length; i++) {
            mark += matrix[i][0] * matrix[i][p];
        }
        mark -= k[p - 1];
        a = length(marks);
        p += 1;
    }
}

function marks_check(grades) {
    for (grade of grades) {
        if (grade < 0) {
            return True;
        }
    }
}
    


// Нахождение опорного элемента
function reference_elem(matrix, grades) {
    let reference;
    let min_reference;  // Будет возвращать значение опорного элемента
    let row_refer; // Строка с опорным элементом
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][grades.argmin() + 1] > 0) {
            min_reference = matrix[i][grades.argmin() + 1];
            row_refer = i;
            score = matrix[i][1] / min_reference;
            break;
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        if ((matrix[i][1]/matrix[i][grades.argmin() + 1] < score) && (matrix[i][1]/matrix[i][grades.argmin() + 1] > 0)) {
            min_reference = matrix[i][grades.argmin() + 1];
            row_refer = i;
        }
    }
    reference = min_reference;
    return reference;
}
    


// Создание новой таблицы на основе старой
function new_iteration(matrix) {
    let m2 = matrix;
    let r = reference;  // Беру опорный элемент
    matrix[row_refer][0] = k[marks.argmin()]
    for (let i = 1; i < matrix.length; i++) {
        matrix[row_refer][i] /= r;
    }
    for (let i = 0; i < matrix.length; i++) {
        if (i == row_refer) {
            continue;
        }
            
        for (let j = 1; j < m2[i].length; j++) {
            matrix[i][j] = m2[i][j] - matrix[row_refer][j] * m2[i][marks.argmin() + 1];
        }
    }
    deltaJ(matrix);
}


function start() {
    deltaJ(tf);
     while (marks_check(marks) == True) {
        reference_elem(tf, marks);
        new_iteration(tf);
     }
     return marks[0];
}


// start()
// print(tf)
// print(marks)
// print(marks[0])
