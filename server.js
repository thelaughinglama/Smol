const app=require('express')();
const express=require('express');
const mongoose=require('mongoose');
const ejs=require('ejs');
const shorturl=require('./models/schema');

app.set('view engine','ejs');

mongoose.connect('mongodb://localhost/smol',{
   useNewUrlParser:'true',useUnifiedTopology:'true' 
});
app.use(express.urlencoded({extended:false}));
app.get('/',(req,res)=>{
//res.send("lol");
res.render('./index')
    console.log("here");
});

app.set('view engine','ejs');
app.post('/smol',async (req,res)=>{

await shorturl.create({full:req.body.urlshrinkerr})
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

