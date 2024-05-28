const exp=require('express');
const app=exp()
require('dotenv').config()
const path=require('path')
const mongoClient=require('mongodb').MongoClient;
app.use(exp.json())
const userapp=require('./APIs/user-api')
// const adminApp=require('./APIs/admin-api')
const authorApp=require('./APIs/author-api')
app.use('/user-api', userapp);
// app.use('/admin-api', adminApp);
app.use('/author-api', authorApp);
app.use(exp.static(path.join(__dirname,'../my-app/build')))
mongoClient.connect(process.env.DB_URL)
.then(client=>{

    const blog=client.db('blog')
    const usercollection=blog.collection('usercollection')
    const authorcollection=blog.collection('authorcollection')
    const articlecollection=blog.collection('articlecollection')
    app.set('usercollection',usercollection)
    app.set('authorcollection',authorcollection)
    app.set('articlecollection',articlecollection)
    console.log('connection successful')
})
.catch(err=>console.log('Err in database',err));

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../my-app/build/index.html'))
})

app.use((err,req,res,next)=>{
    res.send({Message:"error",Payload:err.message})
})




const port=process.env.PORT||5000;
app.listen(port,()=>console.log('Server running on ',port))
