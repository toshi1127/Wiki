import * as React from 'react'
import * as request from 'superagent'
import { Redirect } from 'react-router-dom'
import * as WikiParser from '../javascript/wiki_parser'
import CommentInput from './TextField';

interface IndexProps {
    match: {
        params: {
            name: string;
        }
    }
}
interface IndexState {
    commemts: string[],
    name: string,
    body: string,
    loaded: boolean,
    user: string
}

export default class WikiShow extends React.Component<IndexProps, IndexState>  {
    constructor(props: IndexProps) {
        super(props);
        const { match } = this.props
        this.state = {
            commemts: null,
            name: match.params.name,
            body: '',
            loaded: false,
            user: '',

        }
    }
    componentWillMount() {
        request
            .get(`/api/get/${this.state.name}`)
            .end((err, res) => {
                if (err) return
                this.setState({
                    name: this.state.name,
                    body: res.body.data.body,
                    loaded: false,
                    user: res.body.data.user,
                })
            })
    }
    componentDidMount() {
        //コメントを取得する。
        request
            .get(`/api/getting_comment/${this.state.name}`)
            .end((err, res) => {
                if(err){
                    return
                }
                this.setState({
                    loaded: true,
                    commemts: res.body.data
                })
            })
    }
    render() {
        if (!this.state.loaded) {
            return (
                <p>読み込み中</p>
            )
        }
        var html: string
        const name = this.state.name
        const body = this.state.body
        if (body == undefined) {
            html = ''
        }
        else {
            html = this.convertText(body)
        }
        return (
            <div>
                <link rel="stylesheet" href="./stylesheets/default_wiki.css" />
                <div id="main">
                    <h1 id="title">{this.state.name}</h1>　製作者:{this.state.user}
                    <div style={styles.show}>{html}</div>
                    <p style={styles.right}>
                        <a href={`/edit/${name}`}>→このページを編集</a>
                        <br />
                        <a href={`/main/${this.state.user}`}>→ホームへ戻る</a>
                    </p>
                </div>
                <CommentInput />
            </div>
        )
    }
    convertText(body: any) {
        const nodes = WikiParser.parse(body)
        const lines = nodes.map((e: any, i: any) => {
            if (e.tag === 'ul') { // リスト
                const lis = e.items.map(
                    (s: any, j: any) => <li key={`node${i}_${j}`}>{s}</li>
                )
                return <ul key={`node${i}`}>{lis}</ul>
            }
            if (e.tag === 'a') {
                return (
                    <div key={`node${i}`}>
                        <a href={`/wiki/${e.label}`}>{e.label}</a>
                    </div>
                )
            }
            return React.createElement(
                e.tag, { key: `node${i}` }, e.label)
        })
        return lines
    }
}

const styles = {
    show: {
        border: '1px solid gray',
        padding: 12
    },
    edit: {
        padding: 12,
        backgroundColor: 'silver'
    },
    right: {
        textAlign: 'right'
    }
}