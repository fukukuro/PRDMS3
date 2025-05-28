function ConductHandler(Channel){
    const CurrentTrain = TrainList[Count + Channel]
    if(CurrentTrain[7] === 0 && CurrentTrain[0]< Vclock.get()+180000){
        CurrentTrain[7] = 1;
        const Notice_Clock = new Date(CurrentTrain[0]);
        NoticeAnnouncement(CurrentTrain[5],Notice_Clock.getUTCHours().toString(),Notice_Clock.getUTCMinutes().toString(),CurrentTrain[1],CurrentTrain[3]);
    }
    if(CurrentTrain[8] === true && CurrentTrain[7] < 2){
        PlayArray.length = 0;
        CurrentTrain[7] = 2;
        document.getElementById("Audio_Arrive").play();
        const TheTrain2 = TrainList[Count];
        const Clock2 = new Date(CurrentTrain[0]);
        ApproachAnnouncement(CurrentTrain[5],Clock2.getUTCHours().toString(),Clock2.getUTCMinutes().toString(),CurrentTrain[1],CurrentTrain[3]);
        setApproaching();
    }
    if(CurrentTrain[9] === true && CurrentTrain[7] < 3){
        PlayArray.length = 0;
        CurrentTrain[7] = 3;
        document.getElementById("Audio_Approach").pause();
        document.getElementById("Audio_Pass").play();
        const Notice_Clock = new Date(CurrentTrain[0]);
        DepartureAnnouncement(CurrentTrain[5],Notice_Clock.getUTCHours().toString(),Notice_Clock.getUTCMinutes().toString(),CurrentTrain[1],CurrentTrain[3]);
        unsetApproaching();
        updateDisp();
    }
}
setInterval(() => {
    if(TrainList[Count][0] < Vclock.get()){
        Count += 1;
        document.getElementById("Arrrive").currentTime = 0;
        document.getElementById("Approach").currentTime = 0;
        document.getElementById("Pass").currentTime = 0;
        unsetApproaching()
    }
    ConductHandler(0);
    ConductHandler(1);
}, 100);
setTimeout(() => {
    while(TrainList[Count][0] < Vclock.get()){
        updateDisp();
    }
}, 1);
