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
    if (urlParsed.pathname === "/products"  && method === "GET"){
        const data = readItems();
        // res.statusCode = 200
        res.writeHead(200, {'Content-Type': 'application/json' })
        res.end(JSON.stringify(data))
       

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
     } else if  (urlParsed.pathname.startsWith("/products/") && method === "PUT") {
         // Extracting the ID from the URL path
        const itemId = urlParsed.pathname.split('/')[2];
         console.log(itemId);
        
     let body = "";
    
         req.on("data", chunk => {
             body += chunk.toString();
        });
    
         req.on("end", () => {
            try {
                const updatedItem = JSON.parse(body);
             const data = readItems();
                
                // Find the index of the item with the matching ID
                 const index = data.findIndex(item => parseInt(item.id) === itemId); // Assuming ID is a string
    
                if (index === -1) {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Item Not Found" }));
                     return;
               }
            
                 // Update the item in the array
               data[index] = { ...data[index], ...updatedItem };
    
    
                res.writeHead(200, { "Content-Type": "application/json" });
                 res.end(JSON.stringify(data[index])); // Return the updated item
            } catch (err) {
                 res.writeHead(400, { "Content-Type": "application/json" });
                 res.end(JSON.stringify({ error: "Invalid JSON" }));
             }
       });
     }
    














 else {
        // 404 Not Found
        res.writeHead(404);
        res.end('Content Not Found');
    }
});

// This code will run my server
server.listen(PORT, () =>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})