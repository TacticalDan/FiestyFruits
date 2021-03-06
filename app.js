global.app = require('http').createServer(handler)
global.io = require('socket.io').listen(app, { log: false })
global.fs = require('fs')
global.gm = require('gm');

  /*, dogecoin = require('node-dogecoin')({ // doge coin experimentation
      user: "nathan",
      pass: "gorbyporby"
  });
dogecoin.exec('getbalance', function(err, balance) {
  console.log(balance.result);
})
*/


require('./js/Game.js')
require('./js/IdArray.js')
require('./js/Connection.js')
require('./js/Gameobject.js')
require('./js/Player.js')
require('./js/World.js')
require('./js/Point.js')
require('./js/Time.js')
require('./js/Unit.js')
require('./js/Graphics.js')

Graphics.compileRequiredTexturesList();
Game.isServer = true;

var deleteFolderRecursive = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

deleteFolderRecursive("img/rendered");

setInterval(function() {
    Game.update();
}, 33);

app.listen(1337);

var blacklist = {"/app.js":true}; // any file put in here can not be requested from the client


function handler (req, res) {
  var fileName;
  if (blacklist.hasOwnProperty(req.url)) return res.end('Error loading '+req.url); // if this file is blacklisted, hide it from the client
  if ( req.url == '/') {
    fileName = '/index.html';
  }
  else {
    fileName = req.url;
  }
  fs.readFile(__dirname + fileName,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading '+req.url);
    }

    res.writeHead(200);
    res.end(data);
  });
}

Connection.io = io;

io.sockets.on('connection', function (socket) {
  var player = Gameobject.list.add(new Player());
  var connection = new Connection({player:player, socket:socket, io:io});
  Graphics.renderColoredTextures(player.playerID, function(){
    Game.registerAllEvents(connection);
  });
});

