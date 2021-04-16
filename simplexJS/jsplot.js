let my_arr = [];

for (let i = 0; i < 10; i++) {
    my_arr.push(i);
}

let labelsx = [];
for (let i = 0; i < 16; i++) {
    labelsx.push(i);
}

let varArr = [];

// let variables = document.querySelectorAll('input[type="number"]');
// let varLength = variables.length;

// for (let i = 0; i < varLength; ++i) {
//     varArr.push(parseFloat(variables[i].value));
// }

function feature(x, y, c) {
  b = my_arr.map(
      function(currentValue){
          return ((c - x*currentValue)/y);
      }
  );
}

let b = [];

function run() {
  let variables = document.querySelectorAll('input[type="number"]');
  let varLength = variables.length;

  for (let i = 0; i < varLength; ++i) {
      varArr.push(parseFloat(variables[i].value));
  }

  

  const labels = labelsx
  const data = {
  labels: labels,
  datasets: [{
      label: 'My First Dataset',
      data: b,
      borderColor: 'rgb(75, 192, 192)'
  }]
  };
  function createAPlot() {
    let ctx = document.querySelector('.myChart').getContext('2d');
  let chart = new Chart(ctx, {
  // Тип графика
  type: 'line',
  data: data,

  // Настройки графиков
  options: {
    y: {
      max: 25,
      min: 0,
      ticks: {
            stepSize: 1
        }
    }
  }
  });
  }
}

// const labels = labelsx
// const data = {
// labels: labels,
// datasets: [{
//     label: 'My First Dataset',
//     data: b,
//     borderColor: 'rgb(75, 192, 192)'
// }]
// };
// function createAPlot() {
//   let ctx = document.querySelector('.myChart').getContext('2d');
// let chart = new Chart(ctx, {
// // Тип графика
// type: 'line',
// data: data,

// // Настройки графиков
// options: {
//   y: {
//     max: 25,
//     min: 0,
//     ticks: {
//           stepSize: 1
//       }
//   }
// }
// });
// }
