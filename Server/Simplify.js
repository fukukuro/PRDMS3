const buf=30;
function displayState(Direction,FA,FB,Formation){
    //console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    let Kugiri = "?";
    if(Direction === "A"){
        Kugiri = ">";
    }
    else if(Direction === "B"){
        Kugiri = "<";
    }
    else{
        Kugiri = "?";
    }
    console.log(("_".repeat(FA-1))+Kugiri+Formation+Kugiri+("_".repeat(buf-FB)));
}
const http = require("http");
const url = require("url");
const port = 3000;
const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url.startsWith("/getSignalInfo")) {
        const queryObject = url.parse(req.url, true).query;
        const Direction = queryObject.Direction;
        const NumberA = queryObject.NumberA;
        const NumberB = queryObject.NumberB;
        const Formation = queryObject.Formation;
        displayState(Direction,NumberA,NumberB,Formation);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("OK");
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});