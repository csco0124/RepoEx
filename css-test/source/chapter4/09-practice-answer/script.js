var pieData = {
  labels: ['고양이', '개', '기린', '그 외'],
  series: [35, 30, 20, 15]
};

var pieOptions = {
  width: '100%',
  height: '300px'
};

new Chartist.Pie('.animal-chart', pieData, pieOptions);