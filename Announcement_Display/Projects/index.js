const {app, BrowserWindow} = require("electron");
const path = require("path");     // 追記
const http = require('http');

let mainWindow;

const createMainWindow = () => {
   mainWindow = new BrowserWindow({    // 追記：ブラウザ画面に関するオプション
       width: 500,
       height: 500,
       webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
         enableRemoteModule: true
       },
   });

   mainWindow.loadFile(path.join(__dirname, "index.html"));    // 追記：mainWindowにindex.htmlをロード
};
const server = http.createServer((req, res) => {
   if (req.url === '/enter') {
       res.writeHead(200, {'Content-Type': 'text/plain'});
       mainWindow.webContents.send('asynchronous-message', 'enter');
       res.end('You have entered the site.');
   } else if (req.url === '/stop') {
       res.writeHead(200, {'Content-Type': 'text/plain'});
       res.end('You have stopped the process.');
       mainWindow.webContents.send('asynchronous-message', 'stop');
   } else {
       res.writeHead(404, {'Content-Type': 'text/plain'});
       res.end('Not Found');
   }
});

server.listen(3000, () => {
   console.log('Server is listening on port 3000');
});

app.on("ready", ()=> {
   createMainWindow();
});

app.on("window-all-closed", () => {
   app.quit();
});