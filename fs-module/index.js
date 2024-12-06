const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')))

app.get("/", (req,res)=>{
    fs.readdir(`./files`,(err, files)=>{
        res.render('index',{files: files})
    })
})

app.get("/:name", (req,res)=>{
    res.send(`Hi ${req.params.name}`)
})

app.post("/create", (req,res) => {
    console.log(req.body,"gsnffhmgm")
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details, (err)=>{
        res.redirect('/')
    })
})

app.post("/edit", (req,res) => {
    fs.rename(`./files/${req.body.prev_name}`,`./files/${req.body.new_name}`,function(err){
        res.redirect('/')
    })
})

app.get("/files/:filename", (req,res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err,fileData){
        res.render('show',{fileName:req.params.filename, fileData})
    })
})

app.get("/edit/:filename", (req,res) => {
    res.render('edit',{fileName:req.params.filename})
})


app.listen(8081, ()=>{
    console.log('Server is listening on port 8080')
})