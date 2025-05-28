const AudioURL = "./Sounds/";
const DestinationArray = ["神戸三宮","尼崎","大阪難波","東花園","瓢箪山","石切","東生駒","大和西大寺","奈良","京都国際会館","京都","新田辺","宮津","橿原神宮前","天理","大阪上本町","五位堂","河内国分","大和八木","大和朝倉","榛原","名張","青山町","名古屋","富吉","桑名","四日市","塩浜","白塚","津","津新町","伊勢中川","河内天美","藤井寺","古市","橿原神宮前","壺阪山","吉野口","吉野","富田林","河内長野","松阪","宇治山田","五十鈴川","鳥羽","賢島"];
const TypeArray = ["各駅停車","区間準急","準急","急行","快速急行","特急","特急しまかぜ","特急さくらライナー","特急アーバンライナー","特急伊勢志摩ライナー","特急青の交響曲","特急ひのとり"];
let PlayArray = new Array();
function Act(){
    let source = "";
    source = PlayArray.shift();
    document.getElementById("Notice").src = source;
    document.getElementById("Notice").play();
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
    Act("Notice");
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
    Act("Notice");
}
function DepartureAnnouncement(Track,Hour,Min,Type,Destination){
    let Audios = new Object();
    if(Track <= 40){
        Audios.Track = AudioURL + "番乗り場から/" + Track + ".wav";
    }else{alert("Track Error");}
    if(DestinationArray.indexOf(Destination) !== -1){
        Audios.Destination = AudioURL + "ゆき/" + Destination + ".wav";
    }else{alert("Destination Error");}
    if(TypeArray.indexOf(Type) !== -1){
        Audios.Type = AudioURL + "種別が/" + Type + ".wav";
    }else{alert("Type Error");}
    const NoticeAnnouncementArray = [Audios.Track,Audios.Destination,Audios.Type,AudioURL + "Special/発車します.wav"];
    for(i of NoticeAnnouncementArray){
        PlayArray.push(i);
    }
    Act("Notice");
}

setInterval(() => {
    if(document.getElementById("Notice").ended){
        source =  PlayArray.shift();
        document.getElementById("Notice").src = source;
        document.getElementById("Notice").currentTime = 0;
        document.getElementById("Notice").play();
    }}, 1);
    alert("ANnouncement has been readed!");