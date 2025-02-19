const fs = require('fs')
const bufferData = fs.readFileSync('Data.json')
const dataJSON = bufferData.toString()
const data = JSON.parse(dataJSON)
console.log(data)
console.log("The setting file has properly imported.")
let Sections = new Object();
Sections.data = data.Sections;
let Trains = new Object();
Trains.data = data.Trains;
Trains.SetOccupy = new Object;
Trains.SetOccupy.UpdateOccupy = function(TrainName){
    for(let i = Trains.data[TrainName].TopSectionNumber; i <= Trains.data[TrainName].BottomSectionNumber; i++){
        Sections.AddOccupyTrain(Trains.data[TrainName].Route[i],TrainName)
        
    }
}
Sections.Ready = function(){
    for(i of Sections.data.SectionsArray){
        Sections.data[i].TrainOccupyArray = new Array();
    }
}
Sections.AddOccupyTrain = function(SectionName,TrainName){
    Sections.data[SectionName].TrainOccupyArray.push(TrainName);
}
Sections.DeleteOccupyTrain = function(SectionName,TrainName){
    const indexOfTrain = Sections.data[SectionName].indexOf(TrainName);
    Sections.data[SectionName].splice(indexOfTrain,1);
}
const getReady = function(){
    Sections.Ready();
}
getReady();
console.log(Trains);
console.log(Sections)
setTimeout(() => {
    console.log("AFTER 5 SECONDS");
}, 100000000);