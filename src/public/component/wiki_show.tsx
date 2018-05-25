import * as React from 'react'
import * as request from 'superagent'
import { Redirect, Link } from 'react-router-dom'
import * as WikiParser from '../javascript/wiki_parser'
import CommentInput from './TextField';
import CommentList from './commentList';
import styled from 'styled-components';

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

const Wiki = styled.div`
    width: 70%;
    margin-right: auto;
    margin-left : auto;
`
const Title = styled.h1`
    width: auto;
    text-align : center;
`

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
                    body: res.body.data.body,
                    loaded: true,
                    user: res.body.data.user,
                })
            })
        request
            .get(`/api/comment/${this.state.name}`)
            .end((err, res) => {
                if (err) {
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
                <Wiki>
                    <Title>{this.state.name}</Title>　製作者:{this.state.user}
                    <div style={styles.show}>{html}</div>
                    <p style={styles.right}>
                        <Link to={`/edit/${name}`}>→このページを編集</Link>
                        <br />
                        <Link to={`/main/${this.state.user}`}>→ホームへ戻る</Link>
                    </p>
                    <div>
                        <CommentList name={this.state.name} />
                        <CommentInput name={this.state.name} user={this.state.user} />
                    </div>
                </Wiki>
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
    right: {
        textAlign: 'right'
    }
}