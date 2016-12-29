const StaticAgent = require('./StaticAgent');

class BeaconAgent extends StaticAgent {


  //position
  //detections


  constructor(data = {}, env){
    super(data,env)
    detectionN = 0; //number of detected intrusions
  }

}