//仮想時刻
let Vclock = new Object();
Vclock.settings = new Object();
Vclock.settings.BeginTime = Date.parse("2025-02-26T14:33:30");
Vclock.settings.Raito = 3;
Vclock.get = function(){
    const Now = Date.now();
    return (Now - Vclock.settings.BeginTime - 32400)*Vclock.settings.Raito;
}