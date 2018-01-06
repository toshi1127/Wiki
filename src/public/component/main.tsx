import * as React from 'react'
import * as request from 'superagent'
import { Redirect } from 'react-router-dom'

interface IndexProps {
}

interface IndexState {
    body: string[]
    loaded: boolean
}

export default class main extends React.Component<IndexProps, IndexState>{
    constructor(props: IndexProps) {
        super(props);
        this.state = {
            body:null,
            loaded: false
        }
    }
    componentWillMount() {
        request
            .get('/api/get/list')
            .end((err, res) => {
                if (err) {
                    return
                }
                this.setState({
                    body:res.body.data,
                    loaded: true
                })
            })
    }
    create(e:string){//掲示板を作成する時に、データベースに新しい掲示板を登録し、掲示板の一覧を取得する。
        //取得後、bodyを上書きして、画面を再表示する。
    }
    delete(e:string){
        //createの削除版
    }
    render(){
        return (
            <div></div>
        )
    }
}