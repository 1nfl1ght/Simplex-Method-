// Количество столбцов массива
let ccol = 5;

// Количество строк массива
let crow = 2;

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
}

// Индекс минимального элемента массива
function argmin(your_arr) {
    let min = your_arr[0];
    let index_min = 0;
    for (let i = 0; i < your_arr.length; i++) {
        if (your_arr[i] < min) {
            min = your_arr[i];
            index_min = i;
        }
    }
    return index_min;
}

// Массив с оценками
let marks = new Array();

// Расчет оценок
function deltaJ(matrix) {
    let index_j = 1;  // индекс элементов массива с оценками
    marks = [];
    let a = marks.length;
    while (a != (matrix.length-1)){
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

// Проверка оценок
function marks_check(grades) {
    for (let i = 0; i < grades.length; i++) {
        if (grades[i] < 0) {
            return true;
        }
    }
}

// Определение интвервалов
function intervals() {
    let message1 = ('Решение оптимально для всех лямба > сигмы');
    let message2 = ('Решение оптимально для всех лямба < сигмы');
    let count_neg = 0;
    let count_pos = 0;
    let ratio_max = -t[0][2]/t[0][1];
    let ratio_min = -t[0][2]/t[0][1];
    let q_min
    let p_min

    for (let i = 0; i < t.length; i++) {
        if (t[i][2] < 0) {
            count_neg += 1;
        }

        else if (t[i][2] > 0) {
            count_pos += 1;
        }
    }

    if (count_neg == t.length) {
        console.log(message2);
    }
    
    else if (count_pos == t.length) {
        console.log(message1);
    }

    else {
        for (let i = 0; i < t.length; i ++) {
            if (t[i][2] > 0) {
                if (-t[i][2]/t[i][1] > ratio_max) {
                    ratio_max = -t[i][2]/t[i][1];
                    let q_max = t[i][1];
                    let p_max = -t[i][2];
                }
            }

            if (t[i][2] < 0) {
                if (-t[i][2]/t[i][1] < ratio_min) {
                    ratio_min = -t[i][2]/t[i][1];
                    q_min = t[i][1];
                    p_min = -t[i][2];
                }
            }
        }
    }
}

// Нахождение опорного элемента
function reference_elem(matrix, grades) {
    let score;
    window.reference;
    let min_reference;  // Будет возвращать значение опорного элемента
    window.row_refer; // Строка с опорным элементом
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][argmin(grades) + 1] > 0) {
            min_reference = matrix[i][argmin(grades) + 1];
            row_refer = i;
            score = matrix[i][1] / min_reference;
            break;
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        if ((matrix[i][1]/matrix[i][argmin(grades) + 1] < score) && (matrix[i][1]/matrix[i][argmin(grades) + 1] > 0)) {
            min_reference = matrix[i][argmin(grades) + 1];
            row_refer = i;
        }
    }
    reference = min_reference;
    return reference;
}

// Копия дефолтной матрицы
let m2 = new Array();

// Создание новой таблицы на основе старой
function new_iteration(matrix) {
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
    deltaJ(matrix);
}

function start() {
    deltaJ(t);
    while (marks_check(marks) == true) {
       reference_elem(t, marks);
       new_iteration(t);
    }
}

// Запуск программы
function calc() {
    
    start();
    document.querySelector('#output').innerHTML = marks[0];
}
