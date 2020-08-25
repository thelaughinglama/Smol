const request = require('got');

module.exports = {
     check: async function (url) {
          try {
               var code = await request(url);
               return code.statusCode;
          }
          catch (e) {
               console.log(e);
               console.log("hmmm");
               return e.statusCode;

          }



     }
}


