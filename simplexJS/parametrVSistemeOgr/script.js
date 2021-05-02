let k = ([0, 0, 0]);

let t = ([[0, 0, 0, 0],
          [0, 0, 0, 0]])

let initial_data = new Array();

let n = 1;
let m = 2;

function addRow() {
    let sense = document.querySelector('.senses').value;
    let limit = document.querySelector('.limits').value;

    if (sense && limit) {
        let tr = document.createElement('tr');

        let 
    }
}

function take_limits() {
    lim_data = [];
    let lim_input = document.querySelectorAll('.limits');
    let limLength = lim_input.length;

    for (let i = 0; i < limLength; ++i) {
        lim_data.push(parseFloat(lim_input[i].value));
    }

    console.log(lim_data);
}

function take_senses() {
    sense_data = [];
    let sense_input = document.querySelectorAll('.senses');
    let senseLength = sense_input.length;

    for (let i = 0; i < senseLength; ++i) {
        sense_data.push(parseFloat(sense_input[i].value));
    }

    console.log(sense_data);
}

// Создание двумерного массива
function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
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
                p+=2;
            }
            else {
                t[i][j] = initial_data[p];
                p++;
            }
        }
    }
}

function objective_func() {
    for (let i = 1, j = 9; i < 2, j < 11; i++, j++) {
        k[i] = initial_data[j];
    }
}

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

let marks = new Array();

// Расчет оценок
function deltaJ(matrix) {
    let index_j = 1;  // индекс элементов массива с оценками
    marks = [];
    let a = marks.length;
    while (a != 6){
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

function marks_check(grades) {
    for (let i = 0; i < grades.length; i++) {
        if (grades[i] < 0) {
            return true;
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
    
let m2 = new Array();

// Создание новой таблицы на основе старой
function new_iteration(matrix) {
    let m2 = [];
    for (let i = 0; i < matrix.length; i++) {
        m2.push(matrix[i].slice());
    }
    // console.log("Копия пред матрицы: ");
    // console.log(m2);
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
    //    console.log(t);
    //    console.log(marks);
    }
}

// Запуск программы
function calc() {
    k = ([0, 0, 0, 0, 0, 0]);
    t = ([[0, 0, 0, 0, 1, 0, 0],
         [0, 0, 0, 0, 0, 1, 0],
         [0, 0, 0, 0, 0, 0, 1]])
    write_init();
    console.log(initial_data);
    push_init(initial_data);
    objective_func();
    
    start();
    // console.log(marks[0]);
    document.querySelector('#output').innerHTML = marks[0];
}