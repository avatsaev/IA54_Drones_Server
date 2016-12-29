
class DynamicAgent{

  constructor(data={}, env){

    this.env = env;

    this.id = data.id;
    this.state = data.state;
    this.position = data.position;
    this.speedV = data.speed_vector;
    this.destination;

  }

  moveTo(position){
    this.destination = position;
  }

}

module.exports = DynamicAgent;
