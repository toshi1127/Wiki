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
    delete: boolean
}

export default class main extends React.Component<IndexProps, IndexState>{
    constructor(props: IndexProps) {
        super(props);
        this.state = {
            body: null,
            loaded: false,
            create: false,
            delete: false
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
        this.setState({
            [e.name]:e.isOK,
        })
    }
    create_wiki(e: any) {//掲示板を作成する時に、データベースに新しい掲示板を登録し、掲示板の一覧を取得する。
        //取得後、bodyを上書きして、画面を再表示する。
        console.log(e.value)
        /*
        request
        .get('/create/'+e.value)
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
        })*/
    }
    delete_wiki(e: any) {
        console.log(e.value)
        /*
        request
        .get('/delete/'+e.value)
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
        })*/
    }
    printlist() {
        const lines = this.state.body.map((value: any, index: any, array: any[]) => {
            return <div><a href={`/wiki/${value}`}>{value}</a></div>
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
            const filtering = /^\d{4}\/\d{2}\/\d{2}.*/g
            const pattern = /^\d{4}\/\d{2}\/\d{2}.*$/
            const create_wiki = (e: any) => this.create_wiki(e)
            const delete_wiki = (e: any) => this.delete_wiki(e)
            const html: any = this.printlist()
            return (
                <div>
                    {html}
                    <form onSubmit={create_wiki}>
                        <Form name='create' filer={filtering} pattern={pattern} onChange={doChange} />
                        <input type='submit' value='create' />
                    </form>
                    <form onSubmit={delete_wiki}>
                        <Form name='delete' filer={filtering} pattern={pattern} onChange={doChange} />
                        <input type='submit' value='delete' />
                    </form>
                </div>
            )
        }
    }
}