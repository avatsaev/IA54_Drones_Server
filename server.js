let io = require('socket.io').listen(8080);

let DroneAgent = require("./Agents/DroneAgent");
let IntruderAgent = require('./Agents/IntruderAgent');
let EnvAgent = require('./Env/EnvAgent');
let BeaconAgent = require('./Env/BeaconAgent');



let mainEnv = new EnvAgent({
  drone_base_position: {
    x: 0,
    y: 0,
    z: 0
  },
  poi_positions: [
    {x:1, y:0, z:0},
    {x:1, y:0, z:1},
    {x:0, y:0, z:1},
  ]

});





mainEnv.init(4,8);

console.log(mainEnv)

io.on('connection', (socket) =>{
  console.log("connected");

  // socket.on('move', (data) =>{
  //   console.log(`onMove ${data.x} sdsd`);
  //   socket.emit("onMove", {"x_": 12});
  // });
  //
  // socket.on("getDroneList", () =>{
  //
  //   console.log("get drone list");
  //
  //   socket.emit("onDroneList", {drones});
  //
  // });

  socket.on('disconnect', (data) => {

  });
})
