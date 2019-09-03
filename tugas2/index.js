const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))


app.get('/secret', isAuthenticated, (req, res) => {
    res.json({ "message" : "THIS IS SUPER SECRET, DO NOT SHARE!" })
})

app.get('/readme', (req, res) => {
    res.json({ "message" : "This is open to the world!" })
})

app.listen(port, 
    () => console.log(`Simple Express app listening on port ${port}!`))

const jwt = require('jsonwebtoken');
const fs = require('fs')
    
app.get('/jwt', (req, res) => {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    let token = jwt.sign({ "body": "stuff" }, "MySuperSecretPassPhrase", { algorithm: 'HS256'});
    res.send(token);
})

//convert decimal to binary
app.get('/decimaltobinary', (req, res) => {

    
    const data = req.query.value;
    // console.log(data2);

    // decimal to binary
    convertBase.dec2bin = convertBase(10, 2);
    // console.log(convertBase.dec2bin(data));
     
    res.json({ 
        "message": "Convert Decimal to binary",
        "body": req.query,
        "output": convertBase.dec2bin(data)
    })

    

    function convertBase(baseFrom, baseTo) {
        return function (num) {
            return parseInt(num, baseFrom).toString(baseTo);

        };
    }

    return convertBase;


})

//start convert binary to decimal
app.get('/binarytodecimal', (req, res) => {

    
    const data = req.query.value;
    // console.log(data2);

    // binary to decimal
    convertBase.bin2dec = convertBase(2, 10);
    // console.log(convertBase.bin2dec(data));
     
    res.json({ 
        "message": "Convert Decimal to binary",
        "body": req.query,
        "output": convertBase.bin2dec(data)
    })

    

    function convertBase(baseFrom, baseTo) {
        return function (num) {
            return parseInt(num, baseFrom).toString(baseTo);

        };
    }

    return convertBase;


})
//end convert binary to decimal


function isAuthenticated(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        
        let token = req.headers.authorization.split(" ")[1];
        let privateKey = fs.readFileSync('./private.pem', 'utf8');
        
        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
            
        
            if (err) {  
        
                res.status(500).json({ error: "Not Authorized" });
                throw new Error("Not Authorized");
            }
        
            return next();
        });
    } else {

        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
    }
}