let io = require('socket.io')(8080);

let DroneAgent = require("./Drones/DroneAgent");

let drones = [];

let droneN = 10;

for (let i = 0; i<droneN; i++){
  drones.push(new DroneAgent())
}

io.on('connection', (socket) =>{
  console.log("connected");

  socket.on('move', (data) =>{
    console.log(`onMove ${data.x} sdsd`);
    socket.emit("onMove", {"x_": 12});
  });

  socket.on("getDroneList", () =>{

    console.log("get drone list");

    socket.emit("onDroneList", {drones});

  });

  socket.on('disconnect', (data) => {

  });
})


