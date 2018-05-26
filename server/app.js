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
    WikiList.find({ _id: '19961127' }, (err, Schema) => {
        if (err) {
            res.json({ status: false, msg: err })
            return
        }
        else {
            for (var x = 0; x < Schema[0].work.length; x++) {
                if (Schema[0].work[x].name == wikiname) {
                    const docs = {
                        name: wikiname,
                        body: Schema[0].work[x].body,
                        user: Schema[0].work[x].user
                    }
                    res.json({ status: true, data: docs })
                }
            }
        }
    })
})

app.get('/api/comment/:wikiname', (req, res) => {
    const wikiname = req.params.wikiname
    WikiList.find({ _id: '19961127' }, (err, Schema) => {
        if (err) {
            return
        }
        else {
            return new Promise((resolve, reject) => {
                for (var x = 0; x < Schema[0].work.length; x++) {
                    if (Schema[0].work[x].name == wikiname) {
                        const commentList = Schema[0].work[x].commentList
                        res.json({ status: true, commentList })
                    }
                }
            }).then(() => {
                return
            })
        }
    })
})

app.get('/api/getting_list', (req, res) => {
    const wikilist = mongoose.model('WikiList')
    if (start) {
        let WikiList = new wikilist()
        WikiList._id = '19961127'
        WikiList.save(function (err) {
            if (err) {
                res.json({ status: false, msg: err })
            } else {
                res.json({ status: true, data: null })
            }
        })
        start = false
    }
    else {
        wikilist.find({ _id: '19961127' }, (err, Schema) => {
            if (err) {
                res.json({ status: false, msg: err })
                return
            }
            else {
                if (Schema[0].work.length !== 0) {
                    Schema[0].work.map((value, index, array) => {
                        array[index] = value.name
                    })
                    res.json({ status: true, data: Schema[0].work })
                }
                else {
                    res.json({ status: true, data: Schema[0].work })
                }
            }
        })
    }
})

app.get('/create/:wikiname/:name', (req, res) => {
    const wikiname = req.params.wikiname
    const name = req.params["name"]
    var WikiList = mongoose.model('WikiList')
    WikiList.findById({ _id: '19961127' }, function (err, Schema) {
        return new Promise((resolve, reject) => {
            for (var x = 0; x < Schema.work.length; x++) {
                if (Schema.work[x].name == wikiname) {
                    res.json({ status: true });
                }
            }
            resolve(wikiname)
        }).then((wikiname) => {
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
})

app.get('/delete/:wikiname', (req, res) => {
    const wikiname = req.params.wikiname
    var WikiList = mongoose.model('WikiList')
    WikiList.find({ _id: '19961127' }, (err, Schema) => {
        if (err) {
            res.json({ status: false, msg: err })
            return
        }
        else {
            for (var x = 0; x < Schema[0].work.length; x++) {
                if (Schema[0].work[x].name == wikiname) {
                    Schema[0].work.splice(x, 1);
                    Schema[0].save(function (err) {
                        res.json({ status: true });
                    });
                }
            }
        }
    })
})

app.post('/api/put/:wikiname/:name', (req, res) => {
    const wikiname = req.params.wikiname
    const user = req.params["name"]
    var WikiList = mongoose.model('WikiList')
    // 既存のエントリがあるか確認
    WikiList.find({ _id: '19961127' }, (err, Schema) => {
        if (err) {
            res.json({ status: false, msg: err })
            return
        }
        else {
            for (var x = 0; x < Schema[0].work.length; x++) {
                if (Schema[0].work[x].name == wikiname) {
                    Schema[0].work[x].body = req.body.body
                    Schema[0].work[x].user = user
                    Schema[0].save(function (err) {
                        res.json({ status: true });
                    });
                }
            }
        }
    })
})

app.post('/api/putComment/:wikiname', (req, res) => {
    const wikiname = req.params.wikiname
    const name = req.body.user
    const comment = req.body.comment
    WikiList.find({ _id: '19961127' }, (err, Schema) => {
        if (err) {
            res.json({ status: false, msg: err })
            return
        }
        else {
            for (var x = 0; x < Schema[0].work.length; x++) {
                if (Schema[0].work[x].name == wikiname) {
                    const element = {
                        user: name,
                        body: comment
                    }
                    Schema[0].work[x].commentList.push(element)
                    Schema[0].save(function (err) {
                        res.json({ status: true });
                    });
                }
            }
        }
    })
})
module.exports = app
//# sourceMappingURL=app.js.map