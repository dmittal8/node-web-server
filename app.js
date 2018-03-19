const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.port||3000;

hbs.registerPartials(__dirname +'/views/partials');
app.use(express.static(__dirname +'/public'));
app.set('view engine', 'hbs');
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n');
    next();
});

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        titleName:'About'
    });
});

app.get('/bad',(rer,res)=>{
    res.send({
        errorMessage:'Unable to handle request'
    });
})

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});