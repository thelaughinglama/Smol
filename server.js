const app=require('express')();
const mongoose=require('mongoose');
const ejs=require('ejs');


app.set('view engine','ejs');

app.get('/',(req,res)=>{
//res.send("lol");
res.render('./index')
    console.log("here");
});

app.set('view engine','ejs');

app.listen(process.env.PORT||5000,()=>{

    console.log("server started");
});

