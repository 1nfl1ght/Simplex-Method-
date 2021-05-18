// Количество столбцов массива
let ccol = 5;

// Количество строк массива
let crow = 2;

let result; // Запись интервалов
let result_max;
let result_min;

// Добавить колонку
$(document).ready(function(){
    $('#addColumnChild').click(function(){
        $('#Atable tr').each(function(){
        $(this).append('<td><input class="senses" type="number" value="0"></td>');
        });
        $('#ObjTable tr').append('<td><input class="objF" type="number" value="0"></td>');
        ccol += 1;
    });
});

// Добавить строку
$(document).ready(function(){
    $('#addRowChild').click(function(){
        $('#default-row').clone().appendTo('#Atable');
        $('#scnd-default-row').clone().appendTo('.BTable');
        crow += 1;
    });
});

// Удалить колонку
$(document).ready(function(){
    $('#delColumnChild').click(function(){
        $('#Atable tr').each(function(){
        $(this).find("td:last-child").remove();
        });
        $('#ObjTable tr').find("td:last-child").remove();
        ccol -= 1;
    });
});

// Удалить строку
$(document).ready(function(){
    $('#delRowChild').click(function(){
        $('#Atable').find("tr:last-child").remove();
        $('.BTable').find("tr:last-child").remove();
        crow -= 1;
    });
});
  
// Создание двумерного массива по исходным данным
function Create2DArray(rows,columns) {
    let x = new Array(rows);
    for (var i = 0; i < rows; i++) {
        x[i] = new Array(columns);
    }
    return x;
}

// Элементы целевой функции
let k = [0, 0];

// Симплекс таблциа(пока ещё ни что)
let t;

// Заполнение симплекс таблицы нулями перед началом работы
function fillTable() {
    t = Create2DArray(parseInt(crow),parseInt(ccol));
    for (let i = 0; i < t.length; i++) {
        for (let j = 0; j < t[i].length; j++) {
            t[i][j] = 0;
        }
    }
}

// Считавание данных из A
function init_A() {
    let A_data = [];
    let Ainputs = document.querySelectorAll('.senses');
    let ALength = Ainputs.length;

    for (let i = 0; i < ALength; ++i) {
        A_data.push(parseFloat(Ainputs[i].value))
    }
    window.ATable = Create2DArray(parseInt(crow),parseInt(ccol-3));
    let aindex = 0;
    for (let i = 0; i < ATable.length; i++) {
        for (let j = 0; j < ATable[i].length; j++) {
            ATable[i][j] = A_data[aindex];
            aindex += 1;
        }
    }
}

// Считавание данных из всех B
function init_B() {
    let B_data = [];
    let Binputs = document.querySelectorAll('.Blim');
    let BLength = Binputs.length;

    for (let i = 0; i < BLength; ++i) {
        B_data.push(parseFloat(Binputs[i].value))
    }
    window.BTable = Create2DArray(parseInt(crow),parseInt(2));
    let bindex = 0;
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < BTable.length; j++) {
            BTable[j][i] = B_data[bindex];
            bindex += 1;
        }
    }
}

// Считывание данных из С
function init_C() {
    window.C_data = [];
    let Cinputs = document.querySelectorAll('.objF');
    let CLength = Cinputs.length;

    for (let i = 0; i < CLength; ++i) {
        k.push(parseFloat(Cinputs[i].value));
        C_data.push(parseFloat(Cinputs[i].value));
    }
}

// Проверка столбцов
function col_check(col_index) {
    units = 0;
    window.unit_pos = 0;
    if (ATable[0][col_index] == 1) {
        for (let i = 1; i < ATable.length; i++) {
            if (ATable[i][col_index] != 0) {
                return false;
            }
        }
        unit_pos = 0;
        return true;
    }
    else if (ATable[0][col_index] == 0) {
        for (let i = 1; i < ATable.length; i++) {
            if (ATable[i][col_index] != 0 && ATable[i][col_index] != 1) {
                return false;
            }
            else if (ATable[i][col_index] == 1) {
                units += 1;
                unit_pos = i;
            }
            else if (ATable[i][col_index] == 0) {
                continue;
            }
        }
        if (units == 1) {
            return true;
        }
    }
    else {
        return false;
    }
}

// Определение базисных векторов и их индексов
function find_bas() {
    window.bas_index = [];
    units_order = [];
    for (let i = 0; i < ATable[0].length; i++) {
        if (col_check(i)) {
            bas_index.push(i);
            units_order.push(unit_pos);
        }
    }
}

// Заполнение симплекс таблицы
function fill_simplex() {
    // Добавление элементов из A
    fillTable();
    init_A();
    for (let i = 0; i < t.length; i++) {
        for (let j = 0; j < ATable[i].length; j++) {
            t[i][j + 3] = ATable[i][j];
        }
    }
    
    // Добавление элементов из B
    init_B();
    for (let i = 0; i < t.length; i++) {
        for (let j = 0; j < BTable[i].length; j++) {
            t[i][j + 1] = BTable[i][j];
        }
    }

    init_C();
    
    // Нашёл и записал индексы базисных векторов 
    find_bas();

    //Добавил значения из C, соответствующие базисным векторам
    for (let i = 0; i < t.length; i++) {
        for (let j = 0; j < C_data.length; j++) {
            if (j == bas_index[i])t[units_order[i]][0] = C_data[j];
        }
    }

    for (let i = 0; i < t.length; i++) {
        if (t[i][1] < 0) {
            for (let j = 1; j < t[i].length; j++) {
                if (j == 2) {
                    continue;
                }
                t[i][j] *= -1;
            }
        }
        
    }
    console.log(t);
    console.log(k);
}

// Индекс минимального элемента массива
function argmin(your_arr) {
    let min = your_arr[0];
    let index_min = 0;
    for (let i = 2; i < your_arr.length; i++) {
        if (your_arr[i] < min) {
            min = your_arr[i];
            index_min = i;
        }
    }
    return index_min;
}

// Массив с оценками
let marks = new Array();
let marks_max = new Array();
let marks_min = new Array();

// Расчет оценок
function deltaJ(matrix) {
    let index_j = 1;  // индекс элементов массива с оценками
    marks = [];
    let a = marks.length;
    while (a != k.length) {
        mark = 0;
        for (let i = 0; i < matrix.length; i++) {
            mark += matrix[i][0] * matrix[i][index_j];
        }
        mark -= k[index_j - 1];
        marks.push(mark);
        a = marks.length;
        index_j += 1;
    }
}

function deltaJ_max(matrix) {
    let index_j = 1;  // индекс элементов массива с оценками
    marks_max = [];
    let a = marks_max.length;
    while (a != k.length) {
        mark = 0;
        for (let i = 0; i < matrix.length; i++) {
            mark += matrix[i][0] * matrix[i][index_j];
        }
        mark -= k[index_j - 1];
        marks_max.push(mark);
        a = marks_max.length;
        index_j += 1;
    }
}

function deltaJ_min(matrix) {
    let index_j = 1;  // индекс элементов массива с оценками
    marks_min = [];
    let a = marks_min.length;
    while (a != k.length) {
        mark = 0;
        for (let i = 0; i < matrix.length; i++) {
            mark += matrix[i][0] * matrix[i][index_j];
        }
        mark -= k[index_j - 1];
        marks_min.push(mark);
        a = marks_min.length;
        index_j += 1;
    }
}

// Проверка оценок
function marks_check(grades) {
    for (let i = 3; i < grades.length; i++) {
        if (grades[i] < 0) {
            return true;
        }
    }
    return false;
}

// Проверка на конец программы
function end_of_intervals_max() {
    let count_pos = 0;
    let count_neg = 0;

    for (let i = 0; i < t.length; i++) {
        if (t[i][2] > 0) {
            count_pos += 1;
        }

        if (t[i][2] < 0) {
            count_neg += 1;
        }
    }

    if (count_pos == t.length) {
        result_max.push("Плюс бесконечность");
        return false;
    }

    if (count_neg == t.length) {
        result_max.push("Минус бесконечость");
        return false;
    }

    if (!research_intervals(output_row_max)) {
        result_max.push("не имеет решений при лямбда < " + String(q_max) + "/" + String(-p_max));
        return false;
    }
    return true;
}

function end_of_intervals_min() {
    let count_pos = 0;
    let count_neg = 0;

    for (let i = 0; i < t.length; i++) {
        if (t[i][2] > 0) {
            count_pos += 1;
        }

        if (t[i][2] < 0) {
            count_neg += 1;
        }
    }

    if (count_pos == t.length) {
        result_min.push("Плюс бесконечность");
        return false;
    }

    if (count_neg == t.length) {
        result_min.push("Минус бесконечость");
        return false;
    }

    if (!research_intervals(output_row_min)){
        result_min.push("Задача не имеет решений при лямба > " + String(q_min) + "/" + String(-p_min));
        return false;
    }

    return true;
}

// Определение интвервалов
function intervals() {
    let ratio_max;
    let ratio_min;

    for (let i  = 0; i < t.length; i++) {
        if (t[i][2] > 0) {
            ratio_max = -(t[i][1]/t[i][2]);
            break;
        }
    }

    for (let i  = 0; i < t.length; i++) {
        if (t[i][2] < 0) {
            ratio_min = -(t[i][1]/t[i][2]);
            break;
        }
    }

    window.q_min = 0;
    window.p_min = 0;
    window.q_max = 0;
    window.p_max = 0;
    // индекс строки, которая будет выводиться из базизса
    window.output_row_max;
    window.output_row_min;

    for (let i = 0; i < t.length; i ++) {
        // лямба штрих снизу
        if (t[i][2] > 0) {
            if (-t[i][1]/t[i][2] >= ratio_max) {
                ratio_max = -t[i][1]/t[i][2];
                q_max = t[i][1];
                p_max = -t[i][2];
                output_row_max = i;
            }
        }

        // лямба штрих сверху
        if (t[i][2] < 0) {
            if (-t[i][1]/t[i][2] <= ratio_min) {
                ratio_min = -t[i][1]/t[i][2];
                q_min = t[i][1];
                p_min = -t[i][2];
                output_row_min = i;
            }
        }
    }
    console.log("строка max: " + String(output_row_max));
    console.log("строка min: " + String(output_row_min));
}

// исследование при лямба мин и макс. Проверяет, подходит ли для двойственного симплекс метода
function research_intervals(your_row) {
    for (let i = 3; i < t[0].length; i++) {
        if (t[your_row][i] < 0) {
            return true;
        }
    }
    return false;
}

let for_check_max; // Есил в след таблицу будут одинаковые соотношения лямбд
let for_check_min; 
let reference;
let reference_max;
let reference_min;
let refer_pos_max;
let refer_pos_min;
let row_refer_max;
let row_refer_min;

// Опорный элемент для двойственного симплекс метода максимум
function dual_simplex_refer_max(matrix) {
    let score_max;
    if (research_intervals(output_row_max)) {
        row_refer_max = output_row_max; // Строка с опорным элементом
        for (let i = 3, j = 2; i < matrix[0][0].length, j < marks_max.length; i++, j++) {
            if (matrix[row_refer_max][i] < 0) {
                reference_max = matrix[row_refer_max][i];
                refer_pos_max = i;
                score_max = marks_max[j]/matrix[row_refer_max][i];
                for_check_max = matrix[row_refer_max][1]/-matrix[row_refer_max][2];
                result.push(matrix[row_refer_max][1] + "/" + -matrix[row_refer_max][2]);
                break;
            }
        }

        for (let i = 3, j = 2; i < matrix[0][0].length, j < marks_max.length; i++, j++) {
            if (matrix[row_refer_maxr][i] < 0) {
                if (marks_max[j]/matrix[row_refer_max][i] < score_max) {
                    reference = matrix[row_refer_max][i];
                    for_check_max = matrix[row_refer_max][1]/-matrix[row_refer_max][2]
                    result.push(matrix[row_refer_max][1] + "/" + -matrix[row_refer_max][2]);
                    refer_pos_max = i;
                }
            }
        }
    }
}

// Опорный элемент для двойственного симплекс метода минимум
function dual_simplex_refer_min(matrix) {
    let score_min;
    if (research_intervals(output_row_min)) {
        row_refer_min = output_row_min; // Строка с опорным элементом
        for (let i = 3, j = 2; i < matrix[0][0].length, j < marks_min.length; i++, j++) {
            if (matrix[row_refer_min][i] < 0) {
                reference_min = matrix[row_refer_min][i];
                refer_pos_min = i;
                score_min = marks_min[j]/matrix[row_refer_min][i];
                for_check_min = matrix[row_refer_min][1]/-matrix[row_refer_min][2]
                result.push(matrix[row_refer_min][1] + "/" + -matrix[row_refer_min][2]);
                break;
            }
        }

        for (let i = 3, j = 2; i < t[0][0].length, j < marks_min.length; i++, j++) {
            if (matrix[row_refer_min][i] < 0) {
                if (marks_min[j]/matrix[row_refer_min][i] < score_min) {
                    reference_min = matrix[row_refer_min][i];
                    for_check_min = matrix[row_refer_min][1]/-matrix[row_refer_min][2]
                    result.push(matrix[row_refer_min][1] + "/" + -matrix[row_refer_min][2]);
                    refer_pos_min = i;
                }
            }
        }
    }
}

// Нахождение опорного элемента обычного
function reference_elem(matrix, grades) {
    let score_default;
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][argmin(grades) + 1] > 0) {
            reference = matrix[i][argmin(grades) + 1];
            row_refer = i;
            score_default = matrix[i][1] / reference;
            break;
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        if ((matrix[i][1]/matrix[i][argmin(grades) + 1] < score_default) && (matrix[i][1]/matrix[i][argmin(grades) + 1] > 0)) {
            reference = matrix[i][argmin(grades) + 1];
            row_refer = i;
        }
    }
}

// Копия дефолтной матрицы
let m2 = new Array();
let t_max = [];
let t_min = [];

// Новая таблица по максимуму или минимуму
function new_iteration_max(matrix) {
    let m2 = [];

    if (t_max) {
        for (let i = 0; i < t_max.length; i++) {
            m2.push(t_max[i].slice());
        }
    }

    else { 
        for (let i = 0; i < matrix.length; i++) {
            m2.push(matrix[i].slice());
        }
        for (let i = 0; i < m2.length; i++) {
            t_max.push(m2[i].slice());
        }
    }

    let r = reference_max;  // Беру опорный элемент
    t_max[row_refer_max][0] = k[refer_pos_max - 1];
    for (let i = 1; i < matrix[0].length; i++) {
        t_max[row_refer_max][i] /= r;
    }
    for (let i = 0; i < matrix.length; i++) {
        if (i == row_refer_max) {
            continue;
        }
         
        for (let j = 1; j < m2[i].length; j++) {
            t_max[i][j] = m2[i][j] - matrix[row_refer_max][j] * m2[i][refer_pos_max];
        }
    }
}

function new_iteration_min(matrix) {
    let m2 = [];

    if (t_min) {
        for (let i = 0; i < t_min.length; i++) {
            m2.push(t_min[i].slice());
        }
    }

    else { 
        for (let i = 0; i < matrix.length; i++) {
            m2.push(matrix[i].slice());
        }
        for (let i = 0; i < m2.length; i++) {
            t_min.push(m2[i].slice());
        }
    }

    let r = reference_min;  // Беру опорный элемент
    t_min[row_refer_min][0] = k[refer_pos_min - 1];
    for (let i = 1; i < matrix[0].length; i++) {
        t_min[row_refer_min][i] /= r;
    }
    for (let i = 0; i < matrix.length; i++) {
        if (i == row_refer_min) {
            continue;
        }
         
        for (let j = 1; j < m2[i].length; j++) {
            t_min[i][j] = m2[i][j] - matrix[row_refer_min][j] * m2[i][refer_pos_min];
        }
    }
}

// Создание новой таблицы на основе старой
function new_iteration_default(matrix) {
    let m2 = [];
    for (let i = 0; i < matrix.length; i++) {
        m2.push(matrix[i].slice());
    }
    let r = reference;  // Беру опорный элемент
    matrix[row_refer][0] = k[argmin(marks)]
    for (let i = 1; i < matrix[0].length; i++) {
        matrix[row_refer][i] /= r;
    }
    for (let i = 0; i < matrix.length; i++) {
        if (i == row_refer) {
            continue;
        }
            
        for (let j = 1; j < m2[i].length; j++) {
            matrix[i][j] = m2[i][j] - matrix[row_refer][j] * m2[i][argmin(marks) + 1];
        }
    }
}

function test() {
    result = [];
    fill_simplex();
    deltaJ(t);
    console.log(marks);
    
    if (marks_check(marks)) {
        reference_elem(t, marks);
        new_iteration_default(t);
    }

    else {
        intervals();
        if (output_row_max) {
            if (research_intervals(output_row_max)) {
                dual_simplex_refer_max(t);
                new_iteration_max(t);
            }
            else if (!end_of_intervals_max()) {
                console.log(result_max);
            }
        }

        if (output_row_min) {
            if (research_intervals(output_row_min)) {
                dual_simplex_refer_min(t);
                new_iteration_min(t);
            }
            else if (!end_of_intervals_min()) {
                console.log(result_min);
            }
        }
        else {
            console.log(result_min,"-------", result_max);
        }
    }
    console.log(result_min,"-------", result_max);
}

// Запуск программы
function calc() {
    start();
    document.querySelector('#output').innerHTML = marks[0];
}
