const express = require('express');
// const bodyParser = require('body-parser');


// const index = require('./routes/index');
// const projects = require('./routes/projects');
// const obligations = require('./routes/obligations');
// const collaborators = require('./routes/collaborators');

const app = express();

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');     
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};


app.use(allowCrossDomain);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(__dirname + '/client'));

// app.use('/api/', index);
// app.use('/api/projects', projects);
// app.use('/api/obligations', obligations);
// app.use('/api/collaborators', collaborators);

app.listen(4000, () => {
	console.log('Сервер работает на 4000 порту');
});