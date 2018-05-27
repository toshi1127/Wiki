import * as React from 'react'
import * as request from 'superagent'
import { Redirect } from 'react-router-dom'
import main from './main';
import styled from 'styled-components';

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
    jump: string,
    user: string
}

const Wiki = styled.div`
    width: 75%;
    margin-right: auto;
    margin-left : auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Title = styled.h1`
    width: auto;
    text-align : center;
`

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
            jump: '',
            user: ''
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
                    user: res.body.data.user,
                })
            })
    }
    save() {
        const wikiname: string = this.state.name
        request
            .post('/api/put/' + wikiname + '/' + this.state.user)
            .type('form')
            .send({
                name: wikiname,
                user: this.state.user,
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
            <Wiki>
                <div id="title" style={styles.edit}>
                    <Title>{name}</Title>
                    <textarea rows={15} cols={110}
                        onChange={e => this.bodyChanged(e)}
                        value={this.state.body}
                    />
                    <br />
                    <button onClick={e => this.save()}>保存</button>
                </div>
            </Wiki>
        )
    }
}
const styles = {
    edit: {
        padding: 12,
        backgroundColor: 'silver'
    }
}