const AudioURL = "./Sounds/";
const DestinationArray = ["神戸三宮","尼崎","大阪難波","東花園","瓢箪山","石切","東生駒","大和西大寺","奈良","京都国際会館","京都","新田辺","宮津","橿原神宮前","天理","大阪上本町","五位堂","河内国分","大和八木","大和朝倉","榛原","名張","青山町","名古屋","富吉","桑名","四日市","塩浜","白塚","津","津新町","伊勢中川","河内天美","藤井寺","古市","橿原神宮前","壺阪山","吉野口","吉野","富田林","河内長野","松阪","宇治山田","五十鈴川","鳥羽","賢島"];
const TypeArray = ["各駅停車","区間準急","準急","急行","快速急行","特急","特急しまかぜ","特急さくらライナー","特急アーバンライナー","特急伊勢志摩ライナー","特急青の交響曲","特急ひのとり"];
let PlayArray = new Array();
function setApproaching() {
        document.getElementById('Attention'). hidden = false;
        document.getElementById('marquee'). hidden = true;
}
function unsetApproaching() {
        document.getElementById('Attention'). hidden = true;
        document.getElementById('marquee'). hidden = false;
}
function NoticeAnnouncement(Track,Hour,Min,Type,Destination){
    let Audios = new Object();
    if(Track <= 40){
        Audios.Track = AudioURL + "番乗り場に/" + Track + ".wav";
    }else{alert("Track Error");}
    if(Hour <= 60){
        Audios.Hour = AudioURL + "時/" + Hour + ".wav";
    }else{alert("Hours Error");}
    if(Min <= 60){
        Audios.Min = AudioURL + "分発/" + Min + ".wav";
    }else{alert("Minutes Error");}
    if(DestinationArray.indexOf(Destination) !== -1){
        Audios.Destination = AudioURL + "ゆき/" + Destination + ".wav";
    }else{alert("Destination Error");}
    if(TypeArray.indexOf(Type) !== -1){
        Audios.Type = AudioURL + "種別/" + Type + ".wav";
    }else{alert("Type Error");}
    const NoticeAnnouncementArray = [AudioURL + "Special/次に.wav",Audios.Track,AudioURL + "Special/参ります.wav",AudioURL + "Special/電車は.wav",Audios.Hour,Audios.Min,Audios.Destination,Audios.Type,AudioURL + "Special/です.wav"];
    for(i of NoticeAnnouncementArray){
        PlayArray.push(i);
    }
}

function ApproachAnnouncement(Track,Hour,Min,Type,Destination){
    let Audios = new Object();
    if(Track <= 40){
        Audios.Track = AudioURL + "番乗り場に/" + Track + ".wav";
    }else{alert("Track Error");}
    if(Hour <= 60){
        Audios.Hour = AudioURL + "時/" + Hour + ".wav";
    }else{alert("Hours Error");}
    if(Min <= 60){
        Audios.Min = AudioURL + "分発/" + Min + ".wav";
    }else{alert("Minutes Error");}
    if(DestinationArray.indexOf(Destination) !== -1){
        Audios.Destination = AudioURL + "ゆき/" + Destination + ".wav";
    }else{alert("Destination Error");}
    if(TypeArray.indexOf(Type) !== -1){
        Audios.Type = AudioURL + "種別が/" + Type + ".wav";
    }else{alert("Type Error");}
    const NoticeAnnouncementArray = [Audios.Track,Audios.Hour,Audios.Min,Audios.Destination,Audios.Type,AudioURL + "Special/参ります.wav",AudioURL + "Special/危ないですから、白線の内側へお下がりください。.wav"];
    for(i of NoticeAnnouncementArray){
        PlayArray.push(i);
    }
}
function DepartureAnnouncement(Track,Hour,Min,Type,Destination){
    let Audios = new Object();
    if(Track <= 40){
        Audios.Track = AudioURL + "番乗り場から/" + Track + ".wav";
    }else{alert("Track Error");}
    if(Hour <= 60){
        Audios.Hour = AudioURL + "時/" + Hour + ".wav";
    }else{alert("Hours Error");}
    if(Min < 60){
        Audios.Min = AudioURL + "分発/" + Min + ".wav";
    }else{alert("Minutes Error");}
    if(DestinationArray.indexOf(Destination) !== -1){
        Audios.Destination = AudioURL + "ゆき/" + Destination + ".wav";
    }else{alert("Destination Error");}
    if(TypeArray.indexOf(Type) !== -1){
        Audios.Type = AudioURL + "種別が/" + Type + ".wav";
    }else{alert("Type Error");}
    const NoticeAnnouncementArray = [Audios.Track,Audios.Hour,Audios.Min,Audios.Destination,Audios.Type,AudioURL + "Special/発車します.wav"];
    for(i of NoticeAnnouncementArray){
        PlayArray.push(i);
    }
}

function Act(){
    let source = "";
source = PlayArray.shift();
document.getElementById("Notice").src = source;
document.getElementById("Notice").play();
}
setInterval(() => {
    if(document.getElementById("Notice").ended){
        source =  PlayArray.shift();
        document.getElementById("Notice").src = source;
        document.getElementById("Notice").currentTime = 0;
        document.getElementById("Notice").play();
    }}, 1);
setInterval(() => {
    if(TrainList[Count][0] < Vclock.get()){
        Count += 1;
        unsetApproaching();
        updateDisp();
        document.getElementById("Audio_notice").currentTime = 0;
        document.getElementById("Arrrive").currentTime = 0;
        document.getElementById("Approach").currentTime = 0;
        document.getElementById("Pass").currentTime = 0;
        document.getElementById('Attention'). hidden = true;
        document.getElementById('marquee'). hidden = false;
    }
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
    if(TrainList[Count][0] < Vclock.get()+60000 && TrainList[Count][7] == 1){
        //接近放送
        setApproaching();
        TrainList[Count][7] = 2;
        document.getElementById("Audio_Arrive").play();
        const TheTrain2 = TrainList[Count];
        const Clock2 = new Date(TheTrain2[0]);
        ApproachAnnouncement(TrainList[Count][5],Clock2.getUTCHours().toString(),Clock2.getUTCMinutes().toString(),TrainList[Count][1],TrainList[Count][3]);
        Act("Notice");
        console.log("接近")
    }
    if(TrainList[Count][0] < Vclock.get()+45000 && TrainList[Count][7] == 2){
        //接近チャイム
        TrainList[Count][7] = 3;
        //document.getElementById("Audio_Arrive").pause();
        document.getElementById("Audio_Approach").play();
        document.getElementById('Attention').hidden = false;
document.getElementById('marquee').hidden = true;
        console.log("接近2")
    }
    if(TrainList[Count][0] < Vclock.get()+15000 && TrainList[Count][7] == 3){
        //発車チャイム
        TrainList[Count][7] = 4;
        document.getElementById("Audio_Approach").pause();
        document.getElementById("Audio_Pass").play();
        const TheTrain2 = TrainList[Count];
        const Clock2 = new Date(TheTrain2[0]);
        DepartureAnnouncement(TrainList[Count][5],Clock2.getUTCHours().toString(),Clock2.getUTCMinutes().toString(),TrainList[Count][1],TrainList[Count][3]);
        Act("Notice");
        console.log("発車")
    }
}, 100);