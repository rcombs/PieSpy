#! /usr/bin/env node
var http = require("http"),
	fs = require("fs"),
	path = require("path"),
	url = require('url'),
	uuid = require("node-uuid"),
	basePath = "/Users/11rcombs/PieSpy/images",
	ROOT = "/piespy",
	port = 8756;
	
var watchers = {};
	
function pad8(number){
	var n = number.toString();
	while(n.length < 8){
		n = "0" + n;
	}
	return n;
}

function listDirectory(dir, cb){
	fs.readdir(dir, function(err, files){
		if(err){
			cb(err, files);
			return;
		}
		var outFiles = [];
		for(var i = 0; i < files.length; i++){
			if(files[i].indexOf(".") !== 0){
				outFiles.push(files[i]);
			}
		}
		cb(err, outFiles);
	});
}

var homepageFile = fs.readFileSync(__dirname + "/index.htm").toString().replace(/\%ROOT\%/g, ROOT);

function requestListener(req, res){
	var parsedURL = url.parse(req.url, true);
	var split = parsedURL.pathname.split("/");
	for(var i = 0; i < split.length; i++){
		if(split[i] == ""){
			split.splice(i, 1);
		}
	}
	if(split[0] == "graphs"){
		switch(split.length){
			default:
			case 1:
				// Default to listing networks
				listDirectory(basePath, function(err, list){
					if(err){
						res.end(err.toString());
					}else{
						res.end(JSON.stringify(list));
					}
				});
				break;
			case 2:
				// List channels for a network
				listDirectory(path.join(basePath, split[1]), function(err, list){
					if(err){
						res.end(err.toString());
					}else{
						res.setHeader("content-type", "application/json");
						res.end(JSON.stringify(list));
					}
				});
				break;
			case 3:
			case 4:
				var png = false;
				if(split[3] == "png"){
					png = true;
				}
				var p = path.join(basePath, split[1], split[2], "current." + (png ? "png" : "json"));
				fs.exists(p, function(exists){
					if(exists){
						res.setHeader("content-type", png ? "image/png" : "application/json");
						fs.createReadStream(p).pipe(res);
					}else{
						res.setHeader("content-type", "text/plain");
						res.end("E_DOESNOT_EXIST");
					}
				});
				break;
		}
	}else if(split[0] == "es"){
		if(split.length == 3){
			if(!watchers[split[1]]){
				watchers[split[1]] = {};
			}
			if(!watchers[split[2]]){
				var reqs = {};
				watchers[split[2]] = {
					watcher: fs.watch(path.join(basePath, split[1], split[2], "current.json"), {}, function(event, filename){
						fs.readFile(path.join(basePath, split[1], split[2], "current.json"), function(err, data){
							if(err){
								return;
							}else{
								for(var i in reqs){
									reqs[i].res.write("data: " + data + "\n\n");
								}
							}
						});
					}),
					reqs: reqs
				};
			}
			var id = uuid.v1();
			watchers[split[2]].reqs[id] = {req: req, res: res};
			res.setHeader("content-type", "text/event-stream");
			res.write("\n");
			req.on("close", function(){
				delete watchers[split[2]].reqs[id];
			});
		}else{
			res.end(split.toString());
		}
	}else if(split[0] == "static"){
		if(split[1] == "icon"){
			res.setHeader("content-type", "image/png");
			fs.createReadStream("icon.png").pipe(res);
		}
	}else{
		res.setHeader("content-type", "text/html");
		res.setHeader("content-disposition", "inline");
		var title = "Social Graph Viewer";
		if(split.length > 1){
			title = "Social Graph - #" + split[1] + " on " + split[0];
			var imgsrc = path.join(ROOT, "graphs", split[0], split[1], "png");
			fs.readFile(path.join(basePath, "graphs", split[0], split[1], "current.json"), function(err, content){
				if(err){
					res.end(homepageFile.replace("%TITLE%", title).replace("%JSON%", "false").replace("%IMGSRC%", imgsrc));
				}else{
					res.end(homepageFile.replace("%TITLE%", title).replace("%JSON%", content).replace("%IMGSRC%", imgsrc));
				}
			});
		}else{
			res.end(homepageFile.replace("%TITLE%", title).replace("%JSON%", "{}"));
		}
	}
}

var server = http.createServer(requestListener);
server.listen(port);
