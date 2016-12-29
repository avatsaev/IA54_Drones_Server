let DynamicAgent  = require('./DynamicAgent');


class IntruderAgent extends DynamicAgent {

  constructor(data = {}, env) {
    super(data,env);
    this.POIPositions = this.env.POIPositions; //list of points of interest coordinates
    this.mainTarget;


    this.isCaptured = false;
    this.isDetected = false;

    this.pickTarget();
    this.moveTo(this.mainTarget);
  }


  pickTarget() {
    // picks target randomly
   this.mainTarget = this.POIPositions[Math.floor(Math.random() * this.POIPositions.length)];
  }

}

module.exports = IntruderAgent;
