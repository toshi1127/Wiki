import * as React from 'react'
import * as request from 'superagent'
import { Redirect } from 'react-router-dom'

interface IndexProps {
}

interface IndexState {
    body: string[],
    loaded: boolean
}

export default class main extends React.Component<IndexProps, IndexState>{
    constructor(props: IndexProps) {
        super(props);
        this.state = {
            body: null,
            loaded: false
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
    create(e: Element) {//掲示板を作成する時に、データベースに新しい掲示板を登録し、掲示板の一覧を取得する。
        //取得後、bodyを上書きして、画面を再表示する。
    }
    delete(e: Element) {
        //createの削除版
    }
    printlist() {
        const lines = this.state.body.map((value: any, index: any, array: any[]) => {
            return <div><a href={`/wiki/${value}`}>{value}</a></div>
        })
        return lines
    }
    doChange(e:any) {

    }
    render() {
        if (!this.state.loaded) {
            return (
                <p>読み込み中</p>
            )
        }
        else {
            const create = (e:any) => this.create(e)
            const doChange = (e:any)=> this.doChange(e)
            const html: any = this.printlist()
            return (
                <div>
                    {html}
                    <form onSubmit={create}>
                        <input type='text' onChange={doChange} />
                        <input type='submit' value='create' />
                    </form>
                </div>
            )
        }
    }
}