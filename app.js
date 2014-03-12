var restify = require('restify');
var mongojs = require('mongojs');
 
var ip_addr = '127.0.0.1';
var port    =  '3000';
 
var server = restify.createServer({
    name : "app"
});

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

/*

server.use(restify.authorizationParser());

server.use(function authenticate(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    if (req.authorization.basic){
		if (req.authorization.basic.username === 'hektor' && req.authorization.basic.password === '123456'){
	    	return next();
	    }
    }
    return next(new restify.NotAuthorizedError());
});

*/

var connection_string = '127.0.0.1:27017/test';
var db = mongojs(connection_string, ['test']);
var songs = db.collection("songs");

function allSongs(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    songs.find().limit(20).sort({postedOn : -1} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(200 , success);
            return next();
        }else{
            return next(err);
        }
    });
}
 
function findSong(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    songs.findOne({_id:mongojs.ObjectId(req.params.songId)} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(200 , success);
            return next();
        }
        return next(err);
    })
}
 
function postSong(req , res , next){
    var song = {};
    song.title = req.params.title;
    song.duration = req.params.duration;
    song.publishedOn = new Date();
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    songs.save(song , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(201 , song);
            return next();
        }else{
            return next(err);
        }
    });
}

function editSong(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');

    var song = {};
    song.title = req.params.title;
    song.duration = req.params.duration;

    songs.update({_id:mongojs.ObjectId(req.params.songId)}, { $set:song } , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(201 , song);
            return next();
        }else{
            return next(err);
        }
    }); 
}
 
function deleteSong(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    songs.remove({_id:mongojs.ObjectId(req.params.songId)} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(204);
            return next();      
        } else{
            return next(err);
        }
    })
 
}
 
var PATH = '/songs'
server.get({path : PATH }, allSongs);
server.post({path : PATH }, postSong);
server.put({path : PATH +'/:songId' }, editSong);
server.get({path : PATH +'/:songId' }, findSong);
server.del({path : PATH +'/:songId' }, deleteSong);


server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
});
