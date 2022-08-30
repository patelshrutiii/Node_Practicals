let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

var Chat = require('./models/echoChatModel');


const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('client-message', (message) => {
      var newchat = new Chat();
      newchat.msg=message;
      newchat.save(function(err,chat){
        if(err) console.log(err)
        console.log(chat + " is store to Database");
      })
      console.log(message);
      io.emit('server-message', message);
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
