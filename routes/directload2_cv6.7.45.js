var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();


router.get('/*', function (req, res) {
	
	try {

		if (cvjs_debug) console.log("first in directload2");	

		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
		res.setHeader('Access-Control-Allow-Credentials', true); // If needed	

		var directFile = JSON.stringify(req.params);

		if (cvjs_debug) console.log("directFile = "+ directFile);	

		var inputFile = req.params["0"];


		if (inputFile==undefined){
			inputFile = req.body.filename;
		}			

		inputFile = config.ServerLocation + inputFile;

		if (cvjs_debug) console.log("inputFile = "+ inputFile);	

		inputFile = decodeURI(inputFile);
		inputFile = inputFile.replace(/%3A/g, ':');
		inputFile = inputFile.replace(/%2F/g, '/');
		inputFile = inputFile.replace(/%20/g, ' ');


		if (cvjs_debug) console.log("inputFile = "+ inputFile);	

		var fs = require('fs');
		fs.readFile( inputFile, null, function(err, data) {
			if (err){
				//throw err;

				res.send("error -loadfile: "+err);  // no file
				if (config.cvjs_debug) console.log(err);
			}
			else{

				if (inputFile.indexOf(".png")>0 )
					res.setHeader('Content-Type','image/png'); // If needed	
				if (inputFile.indexOf(".gif")>0 )
					res.setHeader('Content-Type','image/gif'); // If needed	
				if (inputFile.indexOf(".jpeg")>0 || inputFile.indexOf(".jpg")>0 )
					res.setHeader('Content-Type','image/jpeg'); // If needed	
				if (inputFile.indexOf(".zip")>0 )
					res.setHeader('Content-Type','application/zip'); // If needed	
					//res.writeHead(200, {'Content-Type': 'image/png'});
				if (inputFile.indexOf(".svg")>0 )
					res.setHeader('Content-Type','image/svg+xml'); // If needed	
			
					//console.log(data);

					res.send(data);	

			}
			// send string back up to request
		});	
	}
	catch (e) {
		res.send("error -loadfile2 ");  // no file
		if (cvjs_debug) console.log(e);
	}
		

});

module.exports = router;
    
    