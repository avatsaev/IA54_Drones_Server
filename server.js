let io = require('socket.io')(8080);



io.on('connection', (socket) =>{
  console.log("connected");

  socket.on('move', (data) =>{
    console.log(`onMove ${data.x} sdsd`);
    socket.emit("onMove", {"x_": 12});
  });

  socket.on('disconnect', (data) => {

  });
})


