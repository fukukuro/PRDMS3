setInterval(() => {
    if(TrainList[Count][0] < Vclock.get()){
        Count += 1;
        updateDisp();
        document.getElementById("Audio_notice").currentTime = 0;
        document.getElementById("Arrrive").currentTime = 0;
        document.getElementById("Approach").currentTime = 0;
        document.getElementById("Pass").currentTime = 0;
        
        unsetApproaching()
    }
//チャネル1動作
    if(TrainList[Count][0] < Vclock.get()+180000 && TrainList[Count][7] == 0){
        //予告
        TrainList[Count][7] = 1;
        document.getElementById("Audio_notice").play();
        console.log("予告")
        const TheTrain2 = TrainList[Count];
        const Clock2 = new Date(TheTrain2[0]);
        NoticeAnnouncement(TrainList[Count][5],Clock2.getUTCHours().toString(),Clock2.getUTCMinutes().toString(),TrainList[Count][1],TrainList[Count][3]);
        Act("Notice");
    }
    if(TrainList[Count][0] < Vclock.get()+130000 && TrainList[Count][7] == 1){
        //予告
        TrainList[Count][7] = 1;
        console.log("予告停止")
    }
    if(TrainList[Count][8] == true && TrainList[Count][7] == 2){//TrainList[Count][0] < Vclock.get()+60000 && TrainList[Count][7] == 1
        //接近放送
        setApproaching();
        TrainList[Count][7] = 3;
        document.getElementById("Audio_Arrive").play();
        const TheTrain2 = TrainList[Count];
        const Clock2 = new Date(TheTrain2[0]);
        ApproachAnnouncement(TrainList[Count][5],Clock2.getUTCHours().toString(),Clock2.getUTCMinutes().toString(),TrainList[Count][1],TrainList[Count][3]);
        Act("Notice");
        console.log("接近")
        setApproaching();
    }
    if(TrainList[Count][8] == true && TrainList[Count][7] == 3){
        //接近チャイム
        setApproaching();
        
        //document.getElementById("Audio_Arrive").pause();
        document.getElementById("Audio_Approach").play();
        console.log("接近2")
        TrainList[Count][7] == 4
    }
    if(TrainList[Count][9] == true && TrainList[Count][7] == 4){
        TrainList[Count][7] = 5;
        document.getElementById("Audio_Approach").pause();
        unsetApproaching();
        console.log("接近停止");
    }
    if(TrainList[Count][0] < Vclock.get()+15000 && TrainList[Count][7] == 5){
        //発車チャイム
        TrainList[Count][7] = 6;
        document.getElementById("Audio_Approach").pause();
        document.getElementById("Audio_Pass").play();
        const TheTrain2 = TrainList[Count];
        const Clock2 = new Date(TheTrain2[0]);
        DepartureAnnouncement(TrainList[Count][5],Clock2.getUTCHours().toString(),Clock2.getUTCMinutes().toString(),TrainList[Count][1],TrainList[Count][3]);
        Act("Notice");
        unsetApproaching();
        console.log("発車")
    }
    //チャネル2動作
    if(TrainList[Count + 1][0] < Vclock.get()+180000 && TrainList[Count + 1][7] == 0){
        //予告
        TrainList[Count + 1][7] = 1;
        document.getElementById("Audio_notice").play();
        console.log("予告")
        const TheTrain2 = TrainList[Count + 1];
        const Clock2 = new Date(TheTrain2[0]);
        NoticeAnnouncement(TrainList[Count + 1][5],Clock2.getUTCHours().toString(),Clock2.getUTCMinutes().toString(),TrainList[Count + 1][1],TrainList[Count + 1][3]);
        Act("Notice");
    }
    if(TrainList[Count + 1][0] < Vclock.get()+130000 && TrainList[Count + 1][7] == 1){
        //予告
        TrainList[Count + 1][7] = 1;
        console.log("予告停止")
    }
    if(TrainList[Count + 1][0] < Vclock.get()+60000 && TrainList[Count + 1][7] == 1){
        //接近放送
        TrainList[Count + 1][7] = 2;
        document.getElementById("Audio_Arrive").play();
        const TheTrain2 = TrainList[Count + 1];
        const Clock2 = new Date(TheTrain2[0]);
        ApproachAnnouncement(TrainList[Count + 1][5],Clock2.getUTCHours().toString(),Clock2.getUTCMinutes().toString(),TrainList[Count + 1][1],TrainList[Count + 1][3]);
        Act("Notice");
        console.log("接近")
    }
    if(TrainList[Count + 1][0] < Vclock.get()+45000 && TrainList[Count + 1][7] == 2){
        //接近チャイム
        TrainList[Count + 1][7] = 3;
        //document.getElementById("Audio_Arrive").pause();
        document.getElementById("Audio_Approach").play();
        console.log("接近2")
    }
    if(TrainList[Count + 1][0] < Vclock.get()+15000 && TrainList[Count + 1][7] == 3){
        //発車チャイム
        TrainList[Count + 1][7] = 4;
        document.getElementById("Audio_Approach").pause();
        document.getElementById("Audio_Pass").play();
        const TheTrain2 = TrainList[Count + 1];
        const Clock2 = new Date(TheTrain2[0]);
        DepartureAnnouncement(TrainList[Count + 1][5],Clock2.getUTCHours().toString(),Clock2.getUTCMinutes().toString(),TrainList[Count + 1][1],TrainList[Count + 1][3]);
        Act("Notice");
        console.log("発車")
    }
}, 5000);
