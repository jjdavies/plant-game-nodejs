const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) =>{
    
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.json':
            contentType = 'application/json';
            break;
    }
    
    fs.readFile(filePath, (err, content)=>{
        console.log(req.method, content);
        if(err){
            if(err.code == 'ENOENT'){
                //Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) =>{
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf8');
                })
            } else {
                //some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            if(req.method == "GET"){
                console.log('get');
                res.writeHead(200, {'Content-Type':contentType});
                res.end(content, 'utf8');
            } else if(req.method == "POST"){
                
                res.writeHead(200, {'Content-Type':contentType});
                res.end(content, 'utf8');
                  
                
            }
        
        }
    })
    if(req.method == "POST"){
        let data = []
        req.on('data', chunk => {
            data.push(chunk)
            console.log(data);
        })
        req.on('end', () => {
            console.log("complete", JSON.parse(data));
            fs.writeFile("./data/plantData.json", JSON.stringify(JSON.parse(data)), (err)=>{
                console.log(err);
            })
        })
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server running on ${PORT}`))