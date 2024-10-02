const http = require("http");
const fs = require("fs");
const url = require("url");
const PORT = 3000;
const fileName = 'fileData.json';




//Two functions that will be reading and writing items into my Json file
const readItems =() => {
    const readData = fs.readFileSync(fileName);
    return JSON.parse(readData);
};

const writeItems = (dataItems) => {
    fs.writeFileSync(fileName, JSON.stringify(dataItems, null, 2));
 };

const server = http.createServer((req, res) =>{
    const urlParsed = url.parse(req.url, true);
    const method = req.method;

// to GET information 
        if (urlParsed.pathname.startsWith('/products/') && method === 'GET') {
            const itemId = parseInt(urlParsed.pathname.split('/')[2]);
            const data = readItems();
            // Find the item by ID
            const item = data.find(item => parseInt(item.id) === itemId);
    
        
            if (data) {
                // Item found, send a 200 response with the item
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(item));
            } else {
                // Item not found, send a 404 response
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Product not found');
            }
        

    } else if (urlParsed.pathname === "/products" && method === "POST"){
        // POST : Adding new Items to the list 
        let body = "";

        req.on("data", chunk =>{
            body += chunk.toString();
        })

        req.on("end", () =>{
            const itemNew = JSON.parse(body);
            const data = readItems();
            itemNew.id = data.length ? data[data.length - 1].id + 1:1
            data.push(itemNew);
            writeItems(data);
            res.writeHead(200, {'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
            console.log("New Item Has been Added!");
            
       });
     } else if  (urlParsed.pathname.startsWith('/products/') && method === 'PUT') {
        // PUT /items/:id: Update an existing item
        const itemId = parseInt(urlParsed.pathname.split('/')[2]);
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const updatedData = JSON.parse(body);
            const data = readItems();
            const index = data.findIndex(item => parseInt(item.id) === itemId);

            if (index === -1) {
                res.writeHead(404);
                res.end('Item not found');
                return;
            }

            data[index] = { ...data[index], ...updatedData };
            writeItems(data);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data[index]));
        });
        // This part will be to delete a certain product from the list using the id
     }else if (urlParsed.pathname.startsWith("/products/") && method === "DELETE"){
        const itemId = parseInt(urlParsed.pathname.split('/')[2]);
        const data = readItems();
        const index = data.findIndex(item => parseInt(item.id) === itemId);

        if (index === -1) {
            res.writeHead(404);
            res.end('Item not found');
            return;
        }

        data.splice(index, 1);
        writeItems(data);
        res.writeHead(204);
        res.end("Item has been deleted");
        console.log("Item has been Deleted!");

        
    }else {
        // 404 Not Found
        res.writeHead(404);
        res.end('Content Not Found');
    }
});

// This code will run my server
server.listen(PORT, () =>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})