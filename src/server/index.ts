import {ServerResponse} from "http";
import * as http from 'https';
import * as nStatic from 'node-static'
import * as fs from 'fs';

const fileServer = new nStatic.Server('./dist');

console.dir(fileServer)

const options = {
    key: fs.readFileSync(__dirname + '/../certs/key.pem'),
    cert: fs.readFileSync(__dirname + '/../certs/cert.pem')
};

http.createServer(options,function (req, res: ServerResponse) {

    console.log(req.url)

    res.setHeader("Cache-control", "no-cache")

    if (req.url === '/sw-cached/public/api/stock.json') {
        res.writeHead(200)
        res.write('{ "a": 2 }')
        res.end()
        return
    }

    req.addListener('end', function () {
        fileServer.serve(req, res)
    }).resume()

}).listen(3000);