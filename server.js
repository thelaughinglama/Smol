const app=require('express')();
const express=require('express');
const mongoose=require('mongoose');
const ejs=require('ejs');
const shorturl=require('./models/schema');

app.set('view engine','ejs');

mongoose.connect('mongodb://localhost/smol',{
   useNewUrlParser:'false',useUnifiedTopology:'true' 
});
app.use(express.urlencoded({extended:false}));
app.get('/',async(req,res)=>{
//res.send("app started ");
const data= await shorturl.find({});
console.log(data);
res.render('index',{data:data});
   // res.redirect('/');
});

app.set('view engine','ejs');
app.post('/smol',async (req,res)=>{

await shorturl.create({full:req.body.urlshrinker})
res.redirect('/')

})
app.get('/:shorturl',async (req,res)=>{
const shorturls=await shorturl.findOne({short:req.params.shorturl});
console.log(req.params.shorturl)
if(shorturls==null){
    return res.sendStatus(404);
}
shorturls.count++;
shorturls.save();
console.log(shorturls.count)
res.redirect(shorturls.full);

})
app.listen(process.env.PORT||5000,()=>{

    console.log("server started");
});

