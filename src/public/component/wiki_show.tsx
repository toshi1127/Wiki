import * as React from 'react'
import * as request from 'superagent'
import { Redirect } from 'react-router-dom'
import * as WikiParser from '../javascript/wiki_parser'

interface IndexProps {
    match: {
        params: {
            name: string;
        }
    }
}
interface IndexState {
    name: string,
    body: string,
    loaded: boolean
}

export default class WikiShow extends React.Component<IndexProps, IndexState>  {
    constructor(props: IndexProps) {
        super(props);
        const { match } = this.props
        this.state = {
            name: match.params.name,
            body: '',
            loaded: false
        }
    }
    componentWillMount() {
        request
            .get(`/api/get/${this.state.name}`)
            .end((err, res) => {
                if (err) return
                this.setState({
                    name:this.state.name,
                    body: res.body.data.body,
                    loaded: true
                })
            })
    }
    render() {
        if (!this.state.loaded) {
            return (
                <p>読み込み中</p>
            )
        }
        const name = this.state.name
        const body = this.state.body
        const html = this.convertText(body)
        return (
            <div>
                <h1>{this.state.name}</h1>
                <div style={styles.show}>{html}</div>
                <p>
                    <a href={`/edit/${name}`}>→このページを編集</a>
                </p>
            </div>
        )
    }
    convertText(body: any) {
        const nodes = WikiParser.parse(body)
        const lines = nodes.map((e: any, i: any) => {
            if (e.tag === 'ul') {
                const lis = e.items.map(
                    (s: any, j: any) => {
                        <li key={`node${i}_${j}`}>{s}</li>
                    })
                return (<ul key={`node${i}`}>{lis}</ul>)
            }
            if (e.tag === 'a') {
                return (
                    <div key={`node${i}`}>
                        <a href={`/wiki/${e.label}`}>→{e.label}</a>
                    </div>
                )
            }
            return React.createElement(
                e.tag, { key: 'node' + i }, e.label)
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