import * as React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar';


export default class CommentList extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <List>
                    <ListItem
                        disabled={true}
                        leftAvatar={
                            <Avatar src='./images/huac.png' />
                        }
                    >
                        Image Avatar
                </ListItem>
                    <ListItem
                        disabled={true}
                        leftAvatar={
                            <Avatar
                                src='./images/huac.png' />
                        }
                    >
                        Image Avatar
                </ListItem>
                </List>
            </MuiThemeProvider>
        )
    }
}
