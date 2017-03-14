let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let babyParse = require('babyparse');

const PORT = process.env.PORT || 8080;

//let results = babyParse.parseFiles('./simulated_data.csv', {header: true, skipEmptyLines: true});
let results = findStudent('simulated_data');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/d3', express.static(__dirname + '/node_modules/d3/build'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
function loadFile(fileName) {
    return babyParse.parseFiles('./' + fileName +'.csv', { header: true, skipEmptyLines: true });
}

function findStudent(req, res, next) {
  res.locals.currentStudent = results.data[Number(req.params.id) - 1];
  next();
}

app.get('/scores/:id', findStudent, function (req, res) {
  if (res.locals.currentStudent) {
    res.json([res.locals.currentStudent]);
  } else {
    res.status(404).send(`Student ${req.params.id} not found`);
  }
});

app.get('/students/:id', findStudent, function (req, res) {
  if (res.locals.currentStudent) {
    res.render('student', Object.assign({id: req.params.id}, res.locals.currentStudent));
  } else {
    res.status(404).send(`Student ${req.params.id} not found`);
  }
});

app.listen(PORT, function () {
  console.log('Web server running on port ' + PORT);
});