class Antenna{
    constructor(position, positionNeighbours){
        this.position = position;
        this.nbIntruders = 0;
        this.infoAntennas = [];
        this.positionNeighbours = positionNeighbours;
        positionNeighbours.forEach(function(neighbour){
            var myNeighbour = new InfoAntenna{
                position = neighbour;
                nbIntruders = 0;
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

        shareInfoIntruder(infoNewIntruder);
    }

    shareInfoIntruder(infoNewIntruder){
        this.positionNeighbours.forEach(function(neighbour){
                // envoie à ses voisins (dans la liste "positionNeighbours") l' "infoNewIntruder" du type "InfoAntenna" via un socket;

        });
    }

    giveNewDestination(){       //détermination probabiliste de la nouvelle destination. Plus une antenne a eu d'intrus, plus elle a de chances d'être choisie (algo:http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
        let listToShuffle = [];
        this.infoAntennas.forEach(function(myAntenna){
            for(let i=0;i<myAntena.nbIntruders+2;i++){
                listToShuffle.push(myAntenna.position);
            }
        });
        shuffle(listToShuffle);
        return listToShuffle[0];
    }

    shuffle(myList){
        var currentIndex = myList.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = myList[currentIndex];
            myList[currentIndex] = myList[randomIndex];
            myList[randomIndex] = temporaryValue;
        }

        return myList;
    }

}

class InfoAntenna{
    constructor(position, nbIntruders){
        this.position = position;
        this.nbIntruders = nbIntruders;
    }
}