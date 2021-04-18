// let variables = document.querySelectorAll('input[type="number"]');
// let varLength = variables.length;

// for (let i = 0; i < varLength; ++i) {
//     varArr.push(parseFloat(variables[i].value));
// }


// b = my_arr.map(
//     function(currentValue){
//         return ((c - x*currentValue)/y);
//     }
// );


function createAPlot() {

  TESTER = document.querySelector('#tester');

  var trace1 = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [8, 7, 6, 5, 4, 3, 2, 1, 0],
    name: 'Первый график',
    type: 'scatter'
  };
  var trace2 = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    name: 'Второй график',
    type: 'scatter'
  };
  var data = [trace1, trace2];

  var layout = {
    title: 'Графическое изображение решения',
    xaxis: {
      tick0: 0,
      dtick: 1,
      showgrid: true,
      zeroline: true,
      showline: true,
      mirror: 'ticks',
      gridcolor: '#bdbdbd',
      gridwidth: 2,
      zerolinecolor: '#969696',
      zerolinewidth: 4,
      linecolor: '#636363',
      linewidth: 6
    },
    yaxis: {
      tick0: 0,
      dtick: 1,
      showgrid: true,
      zeroline: true,
      showline: true,
      mirror: 'ticks',
      gridcolor: '#bdbdbd',
      gridwidth: 2,
      zerolinecolor: '#969696',
      zerolinewidth: 4,
      linecolor: '#636363',
      linewidth: 6
    }
  };

  Plotly.newPlot('tester', data, layout);
}
