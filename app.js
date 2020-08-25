const app=require('express')();
const express=require('express');
const mongoose=require('mongoose');
const ejs=require('ejs');
const shorturl=require('./models/schema');
const checkstatuscode=require('./helper/checkstatuscode');
const message={success:"Success",error:"Error"};
const session = require('express-session');


const db=require('./config/database')
// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect(db.mongoURI, {
    useNewUrlParser:'false',useUnifiedTopology:'true' 
})
  .then(() => console.log(' Connected...'))
  .catch(err => console.log(err));

app.set('view engine','ejs');
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));
// mongoose.connect('mongodb://localhost/smol',{
//    useNewUrlParser:'false',useUnifiedTopology:'true' 
// });
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));
app.get('/',async(req,res)=>{
//res.send("app started ");
msg=req.session.msg;
req.session.msg=null;
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
res.render('index',{data:data,msg:msg});
   // res.redirect('/');
});
app.get('/servererror',(req,res)=>{
    res.sendStatus(504);
})

app.set('view engine','ejs');
app.post('/smol',async (req,res)=>{
    const url=req.body.urlshrinker
var statuscode= await checkstatuscode.check(url);
if(statuscode!=undefined){
    statuscode=(statuscode-statuscode%100)/100;
}

console.log(statuscode)

if(statuscode==2||statuscode==3||statuscode==5){
    msg='success';

await shorturl.create({full:req.body.urlshrinker})
req.session.msg="success";
res.redirect('/#margindiv')
}
else{
    req.session.msg="error";
    res.redirect('/#margindiv');

}});
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

