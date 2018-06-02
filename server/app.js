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

const WikiModele = new WikiList()
WikiModele.practice = []
WikiModele.history = []
WikiModele.Operation = []
WikiModele.inspection = []
WikiModele.rule = []
WikiModele.save(function (err) {
    if (err) { console.log(err); }
});
//const WikiModele = WikiList

let app = express()
app.get('/', (req, res) => {
    if (!req.session) {
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
app.use('/wiki/:wikiname/:selectValue', express.static(__dirname + '/public'))
app.use('/edit/:wikiname/:selectValue', express.static(__dirname + '/public'))
app.use('/main/:name', express.static(__dirname + '/public'))
// APIの定義
// Wikiデータを返すAPI 
app.get('/api/get/:wikiname/:selectValue', (req, res) => {
    const wikiname = req.params.wikiname
    const selectValue = req.params.selectValue
    const wikilist = mongoose.model('WikiList')

    wikilist.find({}, (err, Schema) => {
        if (err) {
            res.json({ status: false, msg: err })
            return
        }
        else {
            for (var x = 0; x < Schema[0][selectValue].length; x++) {
                if (Schema[0][selectValue][x].name == wikiname) {
                    const docs = {
                        name: wikiname,
                        body: Schema[0][selectValue][x].body,
                        user: Schema[0][selectValue][x].user
                    }
                    res.json({ status: true, data: docs })
                }
            }
        }
    })
})

app.get('/api/comment/:wikiname/:selectValue', (req, res) => {
    const wikiname = req.params.wikiname
    const selectValue = req.params.selectValue
    const wikilist = mongoose.model('WikiList')

    wikilist.find({}, (err, Schema) => {
        if (err) {
            return
        }
        else {
            return new Promise((resolve, reject) => {
                for (var x = 0; x < Schema[0][selectValue].length; x++) {
                    if (Schema[0][selectValue][x].name == wikiname) {
                        const commentList = Schema[0][selectValue][x].commentList
                        res.json({ status: true, commentList })
                    }
                }
            }).then(() => {
                return
            })
        }
    })
})

app.get('/api/getting_list/:selectValue', (req, res) => {
    const selectValue = req.params.selectValue
    const wikilist = mongoose.model('WikiList')

    wikilist.find({}, (err, Schema) => {
        if (err) {
            res.json({ status: false, msg: err })
            return
        }
        else {
            if (Schema[0][selectValue].length !== 0) {
                Schema[0][selectValue].map((value, index, array) => {
                    array[index] = value.name
                })
                res.json({ status: true, data: Schema[0][selectValue] })
            }
            else {
                res.json({ status: true, data: Schema[0][selectValue] })
            }
        }
    })
})

app.post('/create', (req, res) => {
    const wikiname = req.body.wikiname
    const user = req.body.name
    const selectValue = req.body.selectValue
    const wikilist = mongoose.model('WikiList')

    wikilist.find({}, function (err, Schema) {
        return new Promise((resolve, reject) => {
            for (var x = 0; x < Schema[0][selectValue].length; x++) {
                if (Schema[0][selectValue][x].name == wikiname) {
                    res.json({ status: false, msg: err })
                    return
                }
            }
            resolve(wikiname)
        }).then((wikiname) => {
            var element = {
                name: wikiname,
                user: user
            };
            Schema[0][selectValue].push(element)
            Schema[0].save(function (err) {
                res.json({ status: true });
            })
        })
    })
})

app.post('/delete', (req, res) => {
    const wikiname = req.body.wikiname
    const selectValue = req.body.selectValue
    const wikilist = mongoose.model('WikiList')

    wikilist.find({}, (err, Schema) => {
        if (err) {
            res.json({ status: false, msg: err })
            return
        }
        else {
            for (var x = 0; x < Schema[0][selectValue].length; x++) {
                if (Schema[0][selectValue][x].name == wikiname) {
                    Schema[0][selectValue].splice(x, 1);
                    Schema[0].save(function (err) {
                        res.json({ status: true });
                    });
                }
            }
        }
    })
})

app.post('/api/put/:wikiname', (req, res) => {
    const wikiname = req.params.wikiname
    const user = req.body.user
    const selectValue = req.body.selectValue
    const body = req.body.body
    const wikilist = mongoose.model('WikiList')

    wikilist.find({}, (err, Schema) => {
        if (err) {
            res.json({ status: false, msg: err })
            return
        }
        else {
            for (var x = 0; x < Schema[0][selectValue].length; x++) {
                if (Schema[0][selectValue][x].name == wikiname) {
                    Schema[0][selectValue][x].body = body
                    Schema[0][selectValue][x].user = user
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
    const selectValue = req.body.selectValue
    const wikilist = mongoose.model('WikiList')
    
    wikilist.find({}, (err, Schema) => {
        if (err) {
            res.json({ status: false, msg: err })
            return
        }
        else {
            for (var x = 0; x < Schema[0][selectValue].length; x++) {
                if (Schema[0][selectValue][x].name == wikiname) {
                    const element = {
                        user: name,
                        body: comment
                    }
                    Schema[0][selectValue][x].commentList.push(element)
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