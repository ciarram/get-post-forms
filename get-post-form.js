var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

/*app.use(bodyParser.urlencoded({ extended: false }));*/
/*app.use(bodyParser.json());*/

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 60790);


app.get('/',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'data':p,'result':req.query[p]})
  }
  var getResults = {};
  getResults.dataList = qParams;
  res.render('get-response', getResults);
});

app.post('/', function(req,res){
  var urlParam = [];
  for (var u in req.query){
    urlParam.push({'data':u,'result':req.query[u]})
  }
  var jsonParam = [];
  for (var j in req.body){
    jsonParam.push({'jdata':j,'jresult':req.body[j]})
  }

  console.log(urlParam);
  console.log(req.query);
  var urlResult = {};
  urlResult.dataList = urlParam;

  console.log(jsonParam);
  console.log(req.body);
  var jsonResult = {};
  jsonResult.dataList = jsonParam;
  jsonResult.urlList = urlParam;
  res.render('url-post-response', jsonResult);

  /*if(Array.isArray(urlParam) && urlParam.length){
    res.render('url-post-response', context); 
  }*/ 
  
  /*var jsonParam = [];
  for (var j in req.body){
    jsonParam.push({'jdata':j, 'jresult':req.body[j]})
  }
  console.log(jsonParam);
  console.log(req.body);
  var newList = {};
  newList.dataList = urlParam;
  res.render('url-post-response', newList);*/
});

/*app.post('/', function(req,res){
  var jsonParam = [];
  for (var j in req.body){
    jsonParam.push({'jdata':j,'jresult':req.body[j]})
  }
  console.log(jsonParam);
  console.log(req.body);
  var jsonResult = {};
  jsonResult.dataList = jsonParam;
  res.render('json-post-response', jsonResult);
});*/

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
