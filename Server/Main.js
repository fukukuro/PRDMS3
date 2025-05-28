//残りの作業:api仕上げ

const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");
const port = 3000;
//信号論理
let trains = new Object();
let sections = new Object();
let formations = new Object();
let apis = new Object();
trains.data = new Object();
sections.data = new Object();
formations.data = new Object();
apis.trains = new Object();
apis.settings = new Object();
sections.create = function(Name){
    if(!Name in sections.data){
        sections.data[Name] = new Object();
        sections.data[Name].occupy = new Array();
        sections.data[Name].sBlock = false;
        return true;
    }
    else{
        return false;
    }
}
sections.occupy = function(sName,fName){
    if(fName in formations.data && sName in sections.data){
            sections.data[sName].occupy.push(fName);
            formations.setOccupy(fName,sName);
            return true;
    }
    else{
        return false;
    }
}
sections.unOccupy = function(sName,fName){
    if(fName in formations.data && sName in sections.data && fName in sections[sName].occupy){
        sections.data[sName].occupy.splice(sections.data[sName].occupy.indexOf(fName),1);
        formations.unSetOccupy(fName,sName);
        return true;
    }
    else{
        return false;
    }
}
formations.create = function(Name){
    if(!Name in formations.data){
        formations.data[Name] = new Object();
        formations.data[Name].current = "";
        formations.data[Name].Aside = 0;
        formations.data[Name].Bside = 0;
        formations.data[Name].occupy  = new Array();
        return true;
    }
    else{
        return false;
    }
}
formations.setOccupy = function(sName,fName){
    if(sName in sections.data && fName in formations.data && (!sName in  formations.data[fName].occupy)){
        formations.data[fName].occupy.push(sName);
        return true;
    }
    else{
        return false;
    }
}
formations.unSetOccupy = function(sName,fName){
    if(sName in sections.data && fName in formations.data && sName in formations.data[fName].occupy){
        formations.data[fName].occupy.splice(formations.data[fName].occupy.indexOf(fName),1);
        return true;
    }
    else{
        return false;
    }
}
formations.attachTrain = function(fName,tName){
    if(fName in formations.data && tName in trains.data){
        formations.data[fName].current = tName;
        return true;
    }
    else{
        return false;
    }
}
formations.detachTrain = function(fName){
    if(fName in formations.data){
        formations.data[fName].current = "";
        return true;
    }
    else{
        return false;
    }
}
formations.handleNumber = function(fName,number_a,number_b){
    let A_temp = formations.data[fName].Aside;
    let B_temp = formations.data[fName].Bside;
    A_temp += number_a;
    B_temp += number_b;
    let AddArray = [];
    for(let i; i <= A_temp; i >= B_temp){
        AddArray.push(i);
    }
    for(i of formations.data[fName].occupy){
        if(i in AddArray){
            sections.unOccupy(fName,i);
        }
    }
    formations.data[fName].occupy = AddArray;
    return true;
}
trains.create = function(tName){
    if(!tName in trains.data){
        trains.data[tName] = new Object();
        trains.data[tName].currentFormation = "";
        trains.data[tName].stab = new Array();
    }
    else{
        return false;
    }
}
trains.attachFormation = function(tName,fName){
    if(tName in trains.data && fName in formations.data){
        trains.data[tName].currentFormation = fName;
        formations.attachTrain(fName,tName)
        return true;
    }
    else{
        return false;
    }
}
trains.attachStab = function(tName,stab){
    let ErrorCounter = 0;
    for(stabData of stab){
        if(stabData.section in sections.data){}else{
            ErrorCounter+=1;
        }
    }
    if(ErrorCounter>0){
        trains.data[tName].stab = stab;
        return false;
    }
    else{
        return true;
    }
}
apis.trains.reportState = function(fName,A__side,B__side){
    const result = formations.handleNumber(fName,A__side,B__side);
    return {result:result};
}
apis.trains.getSignalInfo = function(sName){
    const result2 = sections.data[sName].occupy.length;
    if(result2 > 0){
        return {result:true,signalInfo:0}
    }
    else{
        return {result:true,signalInfo:1};
    }
}
apis.trains.forceState = function(fName,A__side,B__side){
    const A_Calc = A__side - formations.data[fName].Aside;
    const B_Calc = B__side - formations.data[fName].Bside;
    formations.handleNumber(fName,A_Calc,B_Calc);
}
apis.settings.exportExistance = function(){
    for(i in formations.data){
        console.log("!!!");
    }
}


const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url.startsWith("/getSignalInfo")) {
        const queryObject = url.parse(req.url, true).query;
        const result = apis.trains.reportState(queryObject["sName"]);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(result);
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

