import * as React from 'react'
import * as request from 'superagent'
import { Redirect } from 'react-router-dom'

interface IndexProps {
    name: any
}
interface IndexState {
    name: string,
    body: string,
    loaded: boolean
}

export default class WikiShow extends React.Component<IndexProps, IndexState>  {
    constructor(props: any) {
        super(props);
        this.state = {
            name: this.props.name,
            body: '',
            loaded: false
        }
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
                <p>
                    <a href={`/edit/${name}`}>→このページを編集</a>
                </p>
            </div>
        )
    }
    convertText(body: any) {

    }
}