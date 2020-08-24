const request=require('got');

 

module.exports={
  check:async function(url){
     
     var code=await request(url) ;
console.log(code.statusCode);
  
return code.statusCode;

}
}
    

