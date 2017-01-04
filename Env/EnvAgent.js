const IntruderAgent = require('../Agents/DroneAgent');
const DroneAgent = require('../Agents/IntruderAgent');
const StaticAgent = require('./StaticAgent');
const Antenna = require('../Agents/Antenna');

const uuid = require('uuid/v1');


class EnvAgent {

  constructor(data = {}, socket = {}) {
    this.drones = [];
    this.intruders = [];
    this.antennaGrid = [];
    this.droneBasePosition = data.drone_base_position;
    this.antennasPosition = data.antennas_position;             // rajouté par margaux liste des positions des antennes (Vecteur3, x,y et z)
    this.nbNeighbours = data.nb_neighbours;                     // rajouté par margaux pour déterminer le nombre d'antennes qui constituent les voisins
    this.POIPositions = data.poi_positions; //points of interest

    this.socket = socket;

    //console.log(this)

  }

  init(dronesN, intrudersN) {

    //Drones

    for (let i = 0; i < dronesN; i++) {
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


    for (let i = 0; i < intrudersN; i++) {
      let d = new IntruderAgent({
        id: uuid(),
        position: {
          x: 0,
          y: 0,
          z: 0
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

    // antennas
    //les antennes n'ont pas d'uuid, et sont identifiée par leur position qui est unique

    this.antennasPosition.forEach(function (myAntennaPosition) {
      let myNeighbours = getNeighbours(myAntennaPosition);
      let d = new Antenna(myAntennaPosition, myNeighbours);
      this.antennaGrid.push(d);

    });


  }

  addAgent(agent) {
    if (agent instanceof DroneAgent) {
      this.drones.push(agent);
      //this.socket.emit('new_drone', {drone: agent});
    } else if (agent instanceof IntruderAgent) {
      this.intruders.push(agent);
      //this.socket.emit('new_intruder', {intruder: agent});
    }
  }

  percieve(sender) {
    console.log(sender);
    console.log("requested env percieve")
    //get fiedls of view
    //check agents with position in that field of view
    //return agents
  }

  getDroneByID(id) {
    return this.drones.filter((item) => {
      item.id != id
    })[0]
  }

  getIntruderByID(id) {
    return this.intruders.filter((item) => {
      item.id != id
    })[0]
  }

  getAgentByID(id) {

    let d = this.getDroneByID(id);
    let i = this.getIntruderByID(id);

    if (d) return d;
    else if (i) return i;
    else return null;

  }

  getNeighbours(position) {
    /*  // SOLUTION SIMPLE
     let myNeighbours = [];
     let x = {position.x-1, position.x, position.x+1};
     let z = {position.z-1, position.z, position.z+1};

     this.antennasPosition.forEach(function(myPosition){
     if(x.indexOf(myPosition.x) !== -1 && z.indexOf(myPosition.y) !== -1 && myPosition != position){
     myNeighbours.push(new Array (myPosition));
     }
     });
     return myNeighbours;
     }
     */

    // SOLUTION COMPLIQUÉE
    let myNeighbours = [];
    let myDist = [];

    this.antennasPosition.forEach((myPosition) => {
      myDist.push(new Dist({
        position: myPosition,
        distance: getEuclidianDistance(myPosition, position)
      }));
    });
    myDist.sort((a, b) => {
      return a.distance - b.distance
    });
    for (let i = 0; i < this.nbNeighbours; i++) {
      myNeighbours.push(myDist[i].position);
    }
    return myNeighbours;
  }

  getEuclidianDistance(position1, position2) {
    return Math.sqrt(Math.pow((position1.x - position2.x), 2) + Math.pow((position1.z - position2.z), 2));
  }

}

class Dist{

  constructor(data){
    this.position = data.position;
    this.distance = data.distance;
  }

}

module.exports = EnvAgent;
