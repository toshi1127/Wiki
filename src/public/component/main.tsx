import * as React from 'react'
import * as request from 'superagent'
import * as nedb from 'nedb'
import { Redirect } from 'react-router-dom'
import Form from './form';

interface IndexProps {
}

interface IndexState {
    body: string[],
    loaded: boolean,
    create: boolean,
    delete: boolean,
    create_value: any,
    delete_value: any
}

export default class main extends React.Component<IndexProps, IndexState>{
    constructor(props: IndexProps) {
        super(props);
        this.state = {
            body: null,
            loaded: false,
            create: false,
            delete: false,
            create_value: '',
            delete_value: ''
        }
    }
    componentWillMount() {
        request
            .get(`/api/getting_list`)
            .end((err, res) => {
                if (err) {
                    return
                }
                this.setState({
                    body: res.body.data,
                    loaded: true
                })
            })
    }
    handleChange(e: any) {
        if (e.name === 'create') {
            this.setState({
                [e.name]: e.isOK,
                create_value: e.value
            })
        }
        else {
            this.setState({
                [e.name]: e.isOK,
                delete_value: e.value
            })
        }
    }
    create_wiki(e: any) {//掲示板を作成する時に、データベースに新しい掲示板を登録し、掲示板の一覧を取得する。
        //取得後、bodyを上書きして、画面を再表示する。
        if (this.state.create) {
            request
                .get(`/create/` + this.state.create_value)
                .end((err, res) => {
                    if (err) {
                        return
                    }
                })
        }
    }
    delete_wiki(e: any) {
        if (this.state.delete) {
            request
                .get(`/delete/` + this.state.delete_value)
                .end((err, res) => {
                    if (err) {
                        return
                    }
                })
        }
    }
    printlist() {//ここを<div className="col-lg-4 col-md-4">で返すようにする。
        const lines = this.state.body.map((value: any, index: any, array: any[]) => {
            return (
                <div className="col-lg-4 col-md-4">
                    <div className="fh5co-blog animate-box">
                        <div className="blog-text">
                            <h3>
                                <a href={`/wiki/${value}`}>{value}</a>
                            </h3>
                            <p> </p>
                            <a href={`/wiki/${value}`} className="btn btn-primary">Read More</a>
                        </div>
                    </div>
                </div>
            )
        })
        return lines
    }
    render() {
        if (!this.state.loaded) {
            return (
                <p>読み込み中</p>
            )
        }
        else {
            const doChange = (e: any) => this.handleChange(e)
            const filtering = /^\d{8}.*/g
            const pattern = /^\d{8}.*$/
            const create_wiki = (e: any) => this.create_wiki(e)
            const delete_wiki = (e: any) => this.delete_wiki(e)
            const html: any = this.printlist()
            return (
                <div>
                    <link rel="stylesheet" href="./stylesheets/bootstrap.css" />
                    <link rel="stylesheet" href="./stylesheets/style.css" />
                    <header id="fh5co-header" className="fh5co-cover fh5co-cover-sm" role="banner">
                        <div className="container">
                            <div className="display-tc animate-box" data-animate-effect="fadeIn">
                                <h1>HUAC Blog</h1>
                            </div>
                        </div>
                    </header>
                    <div className="container">
                        <div className="row">
                            {html}
                        </div>
                    </div>
                    <div id="formlist">
                        < form onSubmit={create_wiki} >
                            <Form name='create' filer={filtering} pattern={pattern} onChange={doChange} />
                            <input type='submit' value='create' />
                        </form >
                        <br>
                        </br>
                        <form onSubmit={delete_wiki}>
                            <Form name='delete' filer={filtering} pattern={pattern} onChange={doChange} />
                            <input type='submit' value='delete' />
                        </form>
                    </div>
                    <script src="javascript/jquery.min.js"></script>
                    <script src="javascript/bootstrap.min.js"></script>
                </div >
            )
        }
    }
}