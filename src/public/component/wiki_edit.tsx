import * as React from 'react'
import * as request from 'superagent'
import { Redirect } from 'react-router-dom'
import main from './main';
import styled from 'styled-components';

interface IndexProps {
    match: {
        params: {
            name: string,
            selectValue: string
        }
    }
}
interface IndexState {
    name: any,
    body: string,
    loaded: boolean,
    jump: string,
    user: string,
    selectValue: string
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

        this.state = {
            name: match.params.name,
            body: '',
            loaded: false,
            jump: '',
            user: '',
            selectValue: match.params.selectValue
        }
    }
    componentWillMount() {
        request
            .get(`/api/get/${this.state.name}/${this.state.selectValue}`)
            .end((err, res) => {
                if (err) {
                    return
                }
                this.setState({
                    name: this.state.name,
                    body: res.body.data.body,
                    loaded: true,
                    jump: this.state.jump,
                    user: res.body.data.user,
                })
            })
    }
    save() {
        const wikiname = this.state.name
        const selectValue = this.state.selectValue
        request
            .post(`/api/put/${wikiname}`)
            .type('form')
            .send({
                selectValue: this.state.selectValue,
                user: this.state.user,
                body: this.state.body
            })
            .end((err, data) => {
                if (err) {
                    console.error(err)
                    return
                }
                this.setState({
                    name: wikiname,
                    body: this.state.body,
                    loaded: this.state.loaded,
                    jump: `/wiki/${wikiname}/${selectValue}`
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