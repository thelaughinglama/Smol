const app = require('express')();
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const shorturl = require('./models/schema');
const checkstatuscode = require('./helper/checkstatuscode');
const message = { success: "Success", error: "Error" };
const session = require('express-session');


const db = require('./config/database')

mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect(db.mongoURI, {
    useNewUrlParser: 'false', useUnifiedTopology: 'true'
})
    .then(() => console.log(' Connected...'))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(session({ secret: 'mySecret', resave: false, saveUninitialized: false }));
app.use(express.urlencoded({ extended: false }));


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {

    msg = req.session.msg;
    req.session.msg = null;
    const data = await shorturl.find({});

    data.forEach(e => {
        if (e.full.length > 60) {
            e.newfull = e.full.substring(0, 60) + "....";
        }
    })
    data.forEach(e => {

    })
    res.render('index', { data: data, msg: msg });
});


app.post('/smol', async (req, res) => {
    const url = req.body.urlshrinker
    var statuscode = await checkstatuscode.check(url);
    if(statuscode!=102){
    if (statuscode != undefined) {
        statuscode = (statuscode - statuscode % 100) / 100;
    }

    console.log(statuscode)

    if (statuscode == 2 || statuscode == 3 || statuscode == 5|| statuscode==1) {
        msg = 'success';

        await shorturl.create({ full: req.body.urlshrinker })
        req.session.msg = "success";
        res.redirect('/#margindiv')
    }}
    else {
        req.session.msg = "error";
        res.redirect('/#margindiv');

    }
});
app.get('/:shorturl', async (req, res) => {
    const shorturls = await shorturl.findOne({ short: req.params.shorturl });

    if (shorturls == null) {
        return res.render("404")
    }
    shorturls.count++;
    shorturls.save();
    console.log(shorturls.count)
    res.redirect(shorturls.full);

})

  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  app.use(function (req, res, next) {
    res.status(404).render("404")
  })
app.listen(process.env.PORT || 5000, () => {
    console.log("server started");
});

