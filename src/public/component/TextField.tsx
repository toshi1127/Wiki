import * as React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';

interface IndexState {
    body: string
}

interface IndexProps {

}

const ComponetForm = styled.div`
  display: flex;
  align-items: center;
`

export default class CommentInput extends React.Component<IndexProps, IndexState>{
    constructor(props: IndexProps) {
        super(props)
        this.state = {
            body: null
        }
    }
    onClick(e: any) {
        console.log(this.state.body)
        //ここでinputするAPIを発火させる
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