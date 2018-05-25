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
    render() {
        return (
            <ComponetForm>
                <MuiThemeProvider>
                    <TextField
                        hintText="Message Field"
                        floatingLabelText="Send Message"
                        multiLine={true}
                        rows={1} />
                    <RaisedButton label="送信"/>
                </MuiThemeProvider>
            </ComponetForm>
        )
    }
}