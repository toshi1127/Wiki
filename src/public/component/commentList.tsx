import * as React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar';

interface IndexProps {
    name: string
    comments: string[]
}
interface IndexState {
    comments: string[],
    name: string,
}

export default class CommentList extends React.Component<IndexProps, IndexState> {
    constructor(props: IndexProps) {
        super(props)
        this.state = {
            name: props.name,
            comments: props.comments
        }
    }
    convertComment(comments: string[]) {
        const lines = this.state.comments.map((value: any, index, array) => {
            return (
                <ListItem
                    disabled={true}
                    leftAvatar={
                        <Avatar src={'/wiki/' + this.props.name + '/images/huac.png'} />
                    }
                >
                    {value.user}:　{value.body}
                </ListItem>
            )
        })
        return lines
    }
    render() {
        var commentList: any
        const comments = this.state.comments
        if (comments.length != 0) {
            commentList = this.convertComment(comments)
        }
        return (
            <MuiThemeProvider>
                <List>
                    {commentList}
                </List>
            </MuiThemeProvider>
        )
    }
}
