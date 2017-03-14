function createChart(RadarChart, elementId, route) {
  let margin = {top: 100, right: 100, bottom: 100, left: 100};
  let width = Math.min(700, window.innerWidth - 10) - (margin.left + margin.right);
  let height = Math.min(width, window.innerHeight - (margin.top + margin.bottom) - 20);
  let radarChartOptions = {
    w: width,
    h: height,
    margin: margin,
    maxValue: 1.5,
    levels: 3,
    roundStrokes: true
  };

  fetch(route, {method: 'get'}).then(function processData(response) {
    response.json().then(function (data) {
      console.log('received data', data);
      data = data.map(function transformToD3Format(entry) {
        return [{
          axis: "Library Engagement",
          value: entry.library_engagement
        }, {
          axis: 'Attendance',
          value: entry.attendance
        }, {
          axis: "LMS Activity",
          value: entry.lms_activity
        }, {
          axis: "Assessment Activity",
          value: entry.assessment_activity
        }, {
          axis: "Grades",
          value: entry.grades
        }
        ];
      });
      RadarChart('#' + elementId, data, radarChartOptions);
    });
  }).catch(function (err) {
    alert(err);
  });
}
