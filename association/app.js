const express = require('express');
const app = express();
const userModel = require('./models/user')
const postModel = require('./models/post')
 
app.get("/", function(req, res){
    res.send("Hello")
})

app.get('/create', async function (req, res) {
    const user = await userModel.create({
        username: 'Harsh',
        email: 'harsh@gmail.com',
        age: 24,
        posts: []
    })
    res.send(user);
})

app.get('/post/create', async function (req, res) {
    const post = await postModel.create({
        postData: 'This is a dummy post',
        user: '675c2598909085396d1fdcd0',
    })
    const user = await userModel.findByIdAndUpdate('675c2598909085396d1fdcd0',{
        posts: [post._id]
    })

    res.send(post);
})

app.get('/user/:id', async (req, res) => {
    const user = await userModel.findById(req.params.id)
    res.send(user)
})

app.listen(8080)