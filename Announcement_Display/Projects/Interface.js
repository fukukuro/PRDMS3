const ClockField = document.getElementById("ClockArea");
function updateDisp(){
    const TheTrain = TrainList[Count];
    const Clock = new Date(TheTrain[0]);
    document.getElementsByClassName("Time First")[0].innerText = (Clock.getUTCHours()).toString().padStart( 2, '0') + ":" + Clock.getUTCMinutes().toString().padStart( 2, '0');
    document.getElementsByClassName("Type_J First")[0].innerText = TheTrain[1]
    document.getElementsByClassName("Type_E First")[0].innerText = TheTrain[2]
    document.getElementsByClassName("Direction_J First")[0].innerText = TheTrain[3]
    document.getElementsByClassName("Direction_E First")[0].innerText = TheTrain[4]
    document.getElementsByClassName("Track First")[0].innerText = TheTrain[5]
    const TheTrain2 = TrainList[Count + 1];
    const Clock2 = new Date(TheTrain2[0])
    document.getElementsByClassName("Time Second")[0].innerText = (Clock2.getUTCHours()).toString().padStart( 2, '0') + ":" + Clock2.getUTCMinutes();
    document.getElementsByClassName("Type_J Second")[0].innerText = TheTrain2[1]
    document.getElementsByClassName("Type_E Second")[0].innerText = TheTrain2[2]
    document.getElementsByClassName("Direction_J Second")[0].innerText = TheTrain2[3]
    document.getElementsByClassName("Direction_E Second")[0].innerText = TheTrain2[4]
    document.getElementsByClassName("Track Second")[0].innerText = TheTrain2[5]
}
updateDisp()
setInterval(() => {
    const temp = new Date(Vclock.get());
    ClockField.innerText = (temp.getUTCHours()).toString().padStart( 2, '0') + ":" + temp.getUTCMinutes().toString().padStart( 2, '0') + ":" + temp.getUTCSeconds().toString().padStart( 2, '0');
}, 100);