import * as React from 'react'
import { MuiThemeProvider } from 'material-ui/styles/MuiThemeProvider';
import { TextField } from 'material-ui/TextField';
import { FlatButton } from 'material-ui/FlatButton';

interface IndexState {
    body: string
}

export default class CommentInput extends React.Component<IndexProps, IndexState>{
    constructor(props: IndexProps){
        super(props)
        this.state = {
            body:null
        }
    }
    render(){
        return (
            <MuiThemeProvider>
                <TextField/>
                <FlatButton/>
            </MuiThemeProvider>
        )
    }
}