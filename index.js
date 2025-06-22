   const io = require('socket.io')(8000);

   const users = {};

  io.on('connection', socket => {
     socket.on('new-user-joined', name => {
       if (!name) return;
       console.log("New user:", name);
       users[socket.id] = name;
       socket.broadcast.emit('user-joined', name);
   });

     socket.on('send', message => {
       if (!message) return;
       socket.broadcast.emit('receive', { message, name: users[socket.id] });
     });
     socket.on('disconnect', () => {
       const name = users[socket.id];
       socket.broadcast.emit('user-left', name);
       delete users[socket.id];
     });
   });
 

