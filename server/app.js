import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import passport from 'passport'
import session from 'express-session'
import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'
import WikiList from './models/wikidata'

const auth = require('./routes/auth')
var url = "mongodb://heroku_qq1252mp:1qg8n9f2fsslseanuomigsu7vt@ds129670.mlab.com:29670/heroku_qq1252mp"
var start = true
var Schema = mongoose.Schema

var elementSchema = new Schema({
    _id: String,
    name: String,
    body: String,
    user: String
})

var wikiListSchema = new Schema({
    _id: String,
    work: [elementSchema],
    evaluation: [elementSchema],
    result: [elementSchema]
})
mongoose.model('WikiList', wikiListSchema)

mongoose.connect(url, (err, db) => {
    if (err) {
        console.log('ERROR connecting to: ' + url + '. ' + err)
    } else {
        console.log('Succeeded connected to: ' + url)
    }
})
const MongoStore = connectMongo(session)

let app = express()
app.get('/', (req, res) => {
    if (!req.user) {
        res.redirect('/auth/login')
    }
    else {
        res.redirect(302, '/main')
    }
})
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
    },
}))
app.use(passport.initialize())
app.use(passport.session())
// Routing
app.use('/auth', auth)
// Serve static files
app.use(bodyParser.urlencoded({ extended: true }))
var port = '8080'
app.listen(process.env.PORT || port, () => {
    console.log('起動しました', `http://localhost:${port}`)
    console.log('Server listening at https://' + ':' + process.env.PORT)
    console.log(process.env.IP)
})
app.use('/wiki/:wikiname', express.static(__dirname + '/public'))
app.use('/edit/:wikiname', express.static(__dirname + '/public'))
app.use('/main/:name', express.static(__dirname + '/public'))
// APIの定義
// Wikiデータを返すAPI 
app.get('/api/get/:wikiname', (req, res) => {
    const wikiname = req.params.wikiname
    var WikiList = mongoose.model('WikiList')
    WikiList.find({ name: wikiname }, (err, docs) => {
        if (err) {
            res.json({ status: false, msg: err })
            return
        }
        if (docs.length === 0) {
            docs = [{ name: wikiname, body: '' }]
        }
        console.log(docs[0])
        res.json({ status: true, data: docs[0] })
    })
})
app.get('/api/getting_list', (req, res) => {
    const wikilist = mongoose.model('WikiList')
    if (start) {
        let WikiList = new wikilist()
        WikiList._id = '19961127'
        WikiList.save(function (err) {
            if (err) {
            } else {
            }
        })
        start = false
    }
    wikilist.find({}, (err, docs) => {
        if (err) {
            res.json({ status: false, msg: err })
            return
        }
        else {
            docs.map((value, index, array) => {
                array[index] = value.name
            })
            console.log(docs)
            res.json({ status: true, data: docs })
        }
    })
})
app.get('/create/:wikiname/:name', (req, res) => {
    console.log('wikiを作ります。')
    const wikiname = req.params.wikiname
    const name = req.params["name"]
    var WikiList = mongoose.model('WikiList')
    WikiList.findById({ _id: '19961127' }, function (err, Schema) {
        var element = {
            _id: '19961127',
            name: wikiname,
            user: name
        };
        Schema.work.push(element)
        Schema.save(function (err) {
            res.json({ status: true });
        })
    })
})
app.get('/delete/:wikiname', (req, res) => {
    const wikiname = req.params.wikiname
    var WikiList = mongoose.model('WikiList')
    WikiList.remove({ name: wikiname }, function (err, deleteDoc) {
        console.log(deleteDoc)
    })
})
app.post('/api/put/:wikiname/:name', (req, res) => {
    const wikiname = req.params.wikiname
    const user = req.params["name"]
    var WikiList = mongoose.model('WikiList')
    // 既存のエントリがあるか確認
    WikiList.find({ 'name': wikiname, 'user': user }, (err, docs) => {
        if (err) {
            res.json({ status: false, msg: err })
            return
        }
        const body = req.body.body
        WikiList.update({ name: wikiname, user: user }, { name: wikiname, user: user, body })

        res.json({ status: true })
    })
})
module.exports = app
//# sourceMappingURL=app.js.map