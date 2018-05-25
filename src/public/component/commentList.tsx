import * as React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar';

interface IndexProps {
    name: string
}

export default class CommentList extends React.Component<IndexProps> {
    constructor(props: IndexProps) {
        super(props)
        this.state = {
            name: props.name
        }
    }
    render() {
        return (
            <MuiThemeProvider>
                <List>
                    <ListItem
                        disabled={true}
                        leftAvatar={
                            <Avatar src={'/wiki/'+this.props.name+'/images/huac.png'} />
                        }
                    >
                        Image Avatar
                </ListItem>
                    <ListItem
                        disabled={true}
                        leftAvatar={
                            <Avatar
                                src={'/wiki/'+this.props.name+'/images/huac.png'} />
                        }
                    >
                        Image Avatar
                </ListItem>
                </List>
            </MuiThemeProvider>
        )
    }
}
