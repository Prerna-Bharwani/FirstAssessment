require('dotenv').config()

const express= require('express')
const app = express()
const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt')

app.listen(3000, ()=> console.log("Server Started"))

app.use(express.json())

const posts = []

app.get('/posts', authenticateToken, (req,res) => {
    res.json(posts.filter(post => post.email===req.user.email))
})

app.post('/posts', async (req, res)=>{
    try{
        const hashedPassword= await bcrypt.hash(req.body.password, 10)
        const user = { 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            isActive: true, // Set based on your application logic
            roles: ['user']
        }
        posts.push(user)
        res.status(201).send()
    } catch{
        res.status(500).send()
    }

})

app.post('/posts/login', async(req,res) =>{
    try{
        const user= posts.find(user => user.email= req.body.email)
        if(user == null){
            return res.status(400).send('Cannot find user')
        }
    
        const isPasswordValid= await bcrypt.compare(req.body.password, user.password)
        
        if(isPasswordValid){
            const accessToken= jwt.sign(
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    isActive: user.isActive,
                    roles: user.roles
                }, 
                process.env.ACCESS_TOKEN_SECRET)

            res.json({accessToken: accessToken})
        } else{
            res.status(401).send("Unauthrorized error")
        } 
    } catch{
        res.status(500).send()
    }
    
})

function authenticateToken(req, res, next){
    const authHeader= req.headers['authorization']
    const token= authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user= user
        next()
    })
}

