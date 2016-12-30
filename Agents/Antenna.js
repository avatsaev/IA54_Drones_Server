class Antenna{
    constructor(position, positionNeighbours){
        this.position : position;
        this.nbIntruders : 0;
        this.infoAntennas= [];
        this.positionNeighbours : positionNeighbours;
        positionNeighbours.forEach(function(neighbour){
            var myNeighbour = new InfoAntenna{
                position :neighbour;
                nbIntruders : 0;
            }
            this.infoAntennas.push(myNeighbour);
        });

    }

    setInfoNewIntruder(infoNewIntruder){
        let myAntenna = this.infoAntennas.filter((item) => {item.position == infoNewIntruder.position })[0];
        if(myAntenna != null){   // ne devrait pas servir si au début on lui donne les antennes voisines
            myAntenna.nbIntruders = infoNewIntruder.nbIntruders;
        }
        else{
            this.infoAntennas.push(new InfoAntenna(infoNewIntruder));
        }
    }

}

class InfoAntenna{
    constructor(position, nbIntruders){
        this.position = position;
        this.nbIntruders = nbIntruders;
    }
}