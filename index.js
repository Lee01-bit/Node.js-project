const http = require("http");
const fs = require("fs");
const url = require("url");
const { json } = require("stream/consumers");
let lastId = 0
const PORT = 3000;
const fileName = 'fileData.json';


//Two functions that will be reading and writing items into my Json file
const readItems =() => {
    const readData = fs.readFileSync(fileName);
    return JSON.parse(readData);
};

const writeItems = (dataItems) => {
    fs.writeFileSync(fileName, JSON.stringify(dataItems,null, 2));
 };

const server = http.createServer((req, res) =>{
    const urlParsed = url.parse(req.url, true);
    const method = req.method;

// to GET information 
    if (urlParsed.pathname === "/products" && method === "GET"){
        const data = readItems();
        res.statusCode = 200
        res.setHeader =('Content-Type', 'application/json' )
        res.end(JSON.stringify(data))
    } else if (urlParsed.pathname === "/products" && method === "POST"){
        // POST : Adding new Items to the list 
        let body = " ";

        req.on("data", chunk =>{
            body += chunk.toString();
        })

        req.on("end", () =>{
            const itemNew = JSON.parse(body);
            const data = readItems()
            itemNew.id = (++lastId);;
            data.push(itemNew);
            writeItems(data)
            res.setHeader =('Content-Type', 'application/json' )
            res.end(JSON.stringify(data))
            console.log(itemNew)
        });
    } 





    else {
        // 404 Not Found
        res.writeHead(404);
        res.end('This is the Welcome page');
    }
});

// This code will run my server
server.listen(PORT, () =>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})