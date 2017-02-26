let express = require('express'),
    app = express(),
    engines = require('consolidate'),
    bodyParser = require('body-parser');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('browser'));
// app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res){
    res.render('index', { 'rows': [['','',''],['','',''],['','','']], 'nums': Array(9).fill(0) } );
});

app.use(function(req, res){
    res.sendStatus(404);
});

app.listen(process.env.PORT || 5000, function() {
    var port = process.env.PORT || 5000;
    console.log('Server listening on port %s.', port);
});
