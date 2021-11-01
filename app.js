require('dotenv').config();
const { json } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express()

app.use(express.json())

const posts = 
[
    {
        username: 'hassan',
        title: 'post 1'
    },
    {
        username: 'hassan',
        title: 'post 2'
    },
    {
        username: 'ahmad',
        title: 'post 3'
    }
]

app.get('/posts',authenticateToken, (req,res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login', (req,res) => {
    const username = req.body.username
    const user = {name : username}

    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN)
        res.json({username: username, accessToken: accessToken})
})
function authenticateToken (req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        console.log(err);
            if(err) return res.sendStatus(403)
            req.user = user
            next()
    })
}
app.listen(3000)