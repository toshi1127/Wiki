import * as express from 'express'
import * as path from 'path'
import * as favicon from 'serve-favicon'
import * as bodyParser from 'body-parser'
import * as edit from './public/component/wiki_edit'
import * as show from './public/component/wiki_show'
import * as Nedb from 'nedb'

const db = new Nedb({
  filename: path.join(__dirname, 'wiki.db'),
  autoload: true
})

let app = express()


app.use(bodyParser.urlencoded({ extended: true }))

var port = '3000';
app.listen(port, () => {
  console.log('起動しました', `http://localhost:${port}`)
})

app.use('/wiki/:wikiname', express.static(__dirname + '/public'))
app.use('/edit/:wikiname', express.static(__dirname + '/public'))
app.use('/main', express.static(__dirname + '/public'))
app.get('/', (req, res) => {
  res.redirect(302, '/main')
})
// APIの定義
// Wikiデータを返すAPI 
app.get('/api/get/:wikiname', (req, res) => {
  const wikiname = req.params.wikiname
  //この時点でundifindなので、componentWillMountの時点でstate.nameに値が入っていない。
  db.find({ name: wikiname }, (err: any, docs: any) => {
    if (err) {
      res.json({ status: false, msg: err })
      return
    }
    if (docs.length === 0) {
      docs = [{ name: wikiname, body: '' }]
    }
    res.json({ status: true, data: docs[0] })
  })
})

app.get('/api/getting_list', (req, res)=> {
  db.find({},(err:Error,docs:any)=>{
    if(err){
      res.json({status:false,msg:err})
      return 
    }
    else{
      //ここで名前の配列を作ってクライアントに返す。
      docs.map((value:any,index:any,array:string[])=>{
        array[index] = value.name
      })
      res.json({status:true,data:docs})
    }
  })
})

app.post('/api/put/:wikiname', (req, res) => {
  const wikiname = req.params.wikiname
  // 既存のエントリがあるか確認
  db.find({ 'name': wikiname }, (err: any, docs: any) => {
    if (err) {
      res.json({ status: false, msg: err })
      return
    }
    const body = req.body.body
    if (docs.length === 0) { // エントリがなければ挿入
      db.insert({ name: wikiname, body })
    } else { // 既存のエントリを更新
      db.update({ name: wikiname }, { name: wikiname, body })
    }
    res.json({ status: true })
  })
})

export = app
