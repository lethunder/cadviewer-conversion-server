var version = "CADViewer Server v6.8.82"
const express = require('express');
const httprequest = require('request');
const app = express();
const bodyParser = require('body-parser');

const path = require('path');
const fs = require('fs');

var config = require('./CADViewer_config.json');


// serve static files  6.8.80   - pull /app/ content from /cadviewer folder
app.use(express.static('cadviewer'))


// 6.5.09  - DLL load
//var ffi = require('ffi');

var makesinglepagepdf = require("./routes/makesinglepagepdf_cv6.5.8.js");
var makethumbnails = require("./routes/makethumbnails_cv6.5.8.js");
var copyfile = require("./routes/copyfile_cv6.5.10.js");
var savefile = require("./routes/savefile_cv6.5.10.js");
var appendfile = require("./routes/appendfile_cv6.5.10.js");
var getCADViewerContent = require("./routes/getcadviewercontent_cv6.8.82.js");
var returnpdfparams = require("./routes/returnpdfparams_cv6.5.9.js");
var returnpdfparams = require("./routes/returnpdfparams_cv6.5.9.js");
var temp_print = require("./routes/temp_print_cv6.5.9.js");
var files = require("./routes/files_cv6.5.9.js");
var mergedwg = require("./routes/mergedwg_cv6.5.9.js");
var loadfile = require("./routes/loadfile_cv6.5.9.js");
var directload = require("./routes/directload_cv6.5.9.js");
var directloadcadviewer = require("./routes/directloadcadviewer_cv6.8.80.js");

var directload2 = require("./routes/directload2_cv6.8.80.js");
var uploadfile = require("./routes/uploadfile_cv6.8.63.js");
var saveredline = require("./routes/saveredline_cv6.7.45.js");
var listdirectory = require("./routes/listdirectory_cv6.7.45.js");
var listdirectoryredlines = require("./routes/listdirectoryredlines_cv6.7.45.js");
var loadredline = require("./routes/loadredlines_cv6.7.46.js");
var callapiconversion = require("./routes/callapiconversion_cv6.8.82.js");


var cvjs_debug = config.cvjs_debug;

var port = config.ServerPort;  // 3000  or 4000


var globalCounter = 0;

console.log("Version: "+version)
console.log("ServerUrl: "+config.ServerUrl);
console.log("ServerFrontEndUrl: "+config.ServerFrontEndUrl);
console.log("ServerLocation: "+config.ServerLocation);
console.log("Callback: "+config.callbackMethod);
console.log("svgz_compress: "+config.cvjs_svgz_compress);
console.log("debug: "+config.cvjs_debug);
console.log("AX converter: "+config.ax2020_executable);
console.log("LInkList converter: "+config.linklist2020_executable);


//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(bodyParser.json({limit: '99mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '99mb', extended: true, parameterLimit: 50000 }));


app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  next();
});


// CADViewer  - handlers

app.post('/returnpdfparams', returnpdfparams);
app.post('/loadredline', loadredline);
app.post('/uploadfile', uploadfile);
app.post('/makesinglepagepdf', makesinglepagepdf);
app.post('/makethumbnails', makethumbnails);
app.post('/copyfile', copyfile);
app.post('/listdirectory', listdirectory);
app.post('/listdirectoryredlines', listdirectoryredlines);
app.post('/saveredline', saveredline);
app.post('/savefile', savefile);
app.post('/appendfile', appendfile);
app.get('/getcadviewercontent', getCADViewerContent);
app.get('/callapiconversion', callapiconversion);
app.post('/callapiconversion', callapiconversion);
app.post('/returnpdfparams', returnpdfparams);
app.get('/temp_print', temp_print);
app.get('/files', files);
app.post('/mergedwg', mergedwg);
app.get('/loadfile', loadfile);
app.post('/loadfile', loadfile);

app.get('/directloadcadviewer', directloadcadviewer);
app.post('/directloadcadviewer', directloadcadviewer);

app.get('/directload', directload);


// 6.4.34  - loading of content for print Modal

app.get('/app/*', (req, res) => {

    try{
        var inputFile = req.path;
		inputFile = decodeURI(inputFile);
		inputFile = inputFile.replace(/%3A/g, ':');
		inputFile = inputFile.replace(/%2F/g, '/');
		inputFile = inputFile.replace(/%20/g, ' ');
		
        inputFile = config.ServerLocation + inputFile
            
        var fs = require('fs');
        fs.readFile( inputFile, 'utf8', function(err, data) {
            if (err){
                //throw err;
                res.send("error - get /app/* "+err);  // no file
                if (config.cvjs_debug) console.log(err);
            }
            else

                res.send(data);	
            // send string back up to request
        });	
//        res.send("flat  /app/* path:"+req.path);
    }
    catch(e){
        res.send("error - get /app/*");  // no file
        if (config.cvjs_debug) console.log("error - get /app/*"+e);
    }    
});


// TEST CONTENT

// test + direct load parameter
// loadfile get
app.get('/helloworld', function (req, res) {
	if (config.cvjs_debug) console.log("hello ");	
    res.send("hello world!");
});



app.get('/favicon.ico', (req, res) => res.status(204));

// LAST BRANCH
// LOAD EVERYTHING UP!!

 app.get('/*', directload2);  // direct load all other 



// ECHO SERVER LOCATION:

app.listen(port, () => console.log('CADViewer Server is listening on port:'+port+'!'))

