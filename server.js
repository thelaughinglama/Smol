const app=require('express')();
const express=require('express');
const mongoose=require('mongoose');
const ejs=require('ejs');
const shorturl=require('./models/schema');
const checkstatuscode=require('./helper/checkstatuscode');
const message={success:"Success",error:"Error"};
app.set('view engine','ejs');

mongoose.connect('mongodb://localhost/smol',{
   useNewUrlParser:'false',useUnifiedTopology:'true' 
});
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));
app.get('/',async(req,res)=>{
//res.send("app started ");
const data= await shorturl.find({});
//console.log(data);

data.forEach(e=>{
    if(e.full.length>60){
        
            e.newfull=e.full.substring(0,60)+"....";
        
    }
})
data.forEach(e=>{
   // console.log(e.newfull)
})
res.render('index',{data:data});
   // res.redirect('/');
});

app.set('view engine','ejs');
app.post('/smol',async (req,res)=>{
    const url=req.body.urlshrinker
const statuscode= await checkstatuscode.check(url);
console.log(statuscode)
if(statuscode==200){
await shorturl.create({full:req.body.urlshrinker})
res.redirect('/')
}
else{
    res.redirect('/') 
}

})
app.get('/:shorturl',async (req,res)=>{
const shorturls=await shorturl.findOne({short:req.params.shorturl});
//console.log(req.params.shorturl)
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

