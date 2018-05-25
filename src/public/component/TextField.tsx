import * as React from 'react'
import * as request from 'superagent'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';

interface IndexState {
    body: string,
    name: string,
    user: string
}

interface IndexProps {
    name: string,
    user: string
}

const ComponetForm = styled.div`
  display: flex;
  align-items: center;
`

export default class CommentInput extends React.Component<IndexProps, IndexState>{
    constructor(props: IndexProps) {
        super(props)
        this.state = {
            body: null,
            name: this.props.name,
            user: this.props.user
        }
    }
    onClick(e: any) {
        request
            .post('/api/putComment/' + this.state.name)
            .type('form')
            .send({
                name: this.state.name,
                user: this.state.user,
                comment: this.state.body
            })
            .end((err, data) => {
                if (err) {
                    this.setState({
                        body: null
                    })
                    return
                }
                this.setState({
                    body: null
                })
            })
    }
    onChange(e: any, v: any) {
        this.setState({
            body: v
        })
    }
    render() {
        const onChange = (e: any, v: any) => this.onChange(e, v)
        const onSubmit = (e: any) => this.onClick(e)
        return (
            <ComponetForm>
                <MuiThemeProvider>
                    <TextField
                        hintText="Message Field"
                        floatingLabelText="Send Message"
                        multiLine={true}
                        rows={1}
                        onChange={onChange} />
                    <RaisedButton label="送信" onClick={onSubmit} />
                </MuiThemeProvider>
            </ComponetForm>
        )
    }
}