function note_data() {
  let variables = document.querySelectorAll('input[type="number"]');
  let varLength = variables.length;

  let varArr = [];

  window.xs = []

  for (let i = -5; i < 6; i++) {
    xs.push(i);
  }

  for (let i = 0; i < varLength; ++i) {
      varArr.push(parseFloat(variables[i].value));
  }

  window.args1 = [];

  for (let i = 0; i < 3; i++) {
    args1.push(varArr[i]);
  }

  window.args2 = [];

  for (let i = 3; i < 6; i++) {
    args2.push(varArr[i]);
  }

  window.args3 = [];

  for (let i = 6; i < 9; i++) {
    args3.push(varArr[i]);
  }

  window.obj_func = [];

  for (let i = 9; i < 11; i++) {
    obj_func.push(varArr[i]);
  }

  window.y1Values = xs.map(
    function(currentValue){
        return ((-args1[0]*currentValue+args1[2])/args1[1]);
    }
  );

  window.y2Values = xs.map(
    function(currentValue){
        return ((-args2[0]*currentValue+args2[2])/args2[1]);
    }
  );

  window.y3Values = xs.map(
    function(currentValue){
        return ((-args3[0]*currentValue+args3[2])/args3[1]);
    }
  );
  }

function createAPlot() {
  
  note_data()

  TESTER = document.querySelector('#tester');

  var trace1 = {
    x: xs,
    y: y1Values,
    name: args1[0]+ 'x' + ' + ' + args1[1] + 'y' + ' = ' + args1[2],
    type: 'scatter'
  };
  var trace2 = {
    x: xs,
    y: y2Values,
    name: args2[0]+ 'x' + ' + ' + args2[1] + 'y' + ' = ' + args2[2],
    type: 'scatter'
  };

  var trace3 = {
    x: xs,
    y: y3Values,
    name: args3[0]+ 'x' + ' + ' + args3[1] + 'y' + ' = ' + args3[2],
    type: 'scatter'
  };

  var trace4 = {
    x: [0, obj_func[0]],
    y: [0, obj_func[1]],
    name: 'Целевая функция',
    mode: 'lines',
    line: {
      dash: 'dot',
      width: 4
    }
  };


  var data = [trace1, trace2, trace3, trace4];

  var layout = {
    legend: {
      x: 1,
      xanchor: 'right',
      y: 1
    },
    autosize: false,
    width: 650,
    height: 700,
    margin: {
      l: 50,
      r: 50,
      b: 100,
      t: 100,
      pad: 4
    },
    title: 'Графическое изображение решения',
    xaxis: {
      tick0: 0,
      dtick: 1,
      range: [-5, 10],
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
      range: [-5, 10],
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

  Plotly.newPlot('tester', data, layout, {showSendToCloud: true});
}
