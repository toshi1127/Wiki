import * as React from 'react'
import * as request from 'superagent'
import { Redirect } from 'react-router-dom'

interface IndexProps {
    match: {
        params: {
            name: string;
        }
    }
}
interface IndexState {
    name: any,
    body: string,
    loaded: boolean,
    jump: string
}

export default class WikiEdit extends React.Component<IndexProps, IndexState>  {
    constructor(props: IndexProps) {
        super(props);
        const { match } = this.props
        //URLのパラメーターを受け取っている。
        const name = match.params.name
        this.state = {
            name: name,
            body: '',
            loaded: false,
            jump: ''
        }
    }
    componentWillMount() {
        request
            .get(`/api/get/${this.state.name}`)
            .end((err, res) => {
                if (err) {
                    return
                }
                this.setState({
                    name: this.state.name,
                    //res.bodyで連想配列全体。data=docsの中のbodyにアクセスしている。
                    body: res.body.data.body,
                    //読み込みが終わったのでtrueにしている。
                    loaded: true,
                    jump: this.state.jump,
                })
            })
    }
    save() {
        const wikiname: string = this.state.name
        request
            .post('/api/put/' + wikiname)
            .type('form')
            .send({
                name: wikiname,
                body: this.state.body
            })
            .end((err, data) => {
                if (err) {
                    console.error(err)
                    return
                }
                this.setState({
                    name: this.state.name,
                    //res.bodyで連想配列全体。data=docsの中のbodyにアクセスしている。
                    body: this.state.body,
                    //読み込みが終わったのでtrueにしている。
                    loaded: this.state.loaded,
                    jump: '/wiki/' + wikiname
                })
            })
    }
    bodyChanged(e: any) {
        this.setState({
            name: this.state.name,
            body: e.target.value,
            loaded: this.state.loaded,
            jump: this.state.jump
        })
    }
    render() {
        if (!this.state.loaded) {
            return (<p>読み込み中</p>)
        }
        if (this.state.jump !== '') {
            //メイン画面にリダイレクト
            //保存したんだから、編集画面から閲覧する画面に推移させる。
            return <Redirect to={this.state.jump} />
        }
        const name: string = this.state.name
        return (
            <div style={styles.edit}>
                <h1><a href={`/wiki/${name}`}>{name}</a></h1>
                <textarea rows={12} cols={60}
                    onChange={e => this.bodyChanged(e)}
                    value={this.state.body}
                />
                <br />
                <button onClick={e => this.save()}>保存</button>
            </div>
        )
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