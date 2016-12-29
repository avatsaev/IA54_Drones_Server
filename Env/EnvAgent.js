const IntruderAgent = require('../Agents/DroneAgent');
const DroneAgent = require('../Agents/IntruderAgent');
const StaticAgent = require('./StaticAgent');

const uuid = require('uuid/v1');


class EnvAgent {

  constructor(data = {}, socket){
    this.drones = [];
    this.intruders = [];
    this.antennaGrid = [];
    this.droneBasePosition = data.drone_base_position;
    this.POIPositions = data.poi_positions; //points of interest

    this.socket = socket;

    //console.log(this)

  }

  init(dronesN, intrudersN){

    //Drones

    for(let i = 0; i < dronesN; i++){
      let d = new DroneAgent({
        id: uuid(),
        position: this.droneBasePosition,
        state: "patrolling",
        speedV: {
          x: 1,
          y: 0,
          z: 1
        },
        env: this
      }, this);



      this.addAgent(d);
    }

    //intruders


    for(let i = 0; i < intrudersN; i++){
      let d = new IntruderAgent({
        id: uuid(),
        position: {
          x:0,
          y:0,
          z:0
        },
        state: "heading_to_target",
        speedV: {
          x: 1,
          y: 0,
          z: 1
        },
        env: this
      }, this);

      this.addAgent(d);
    }




  }

  addAgent(agent){
    if(agent instanceof DroneAgent){
      this.drones.push(agent);
      //this.socket.emit('new_drone', {drone: agent});
    }else if (agent instanceof IntruderAgent){
      this.intruders.push(agent);
      //this.socket.emit('new_intruder', {intruder: agent});
    }
  }

  percieve(sender){
    console.log(sender);
    console.log("requested env percieve")
    //get fiedls of view
    //check agents with position in that field of view
    //return agents
  }

  getDroneByID(id){
    return this.drones.filter((item) => {item.id != id })[0]
  }

  getIntruderByID(id){
    return this.intruders.filter((item) => {item.id != id })[0]
  }

  getAgentByID(id){

    let d = this.getDroneByID(id);
    let i = this.getIntruderByID(id);

    if(d) return d;
    else if (i) return i;
    else return null;

  }

}


module.exports = EnvAgent;
