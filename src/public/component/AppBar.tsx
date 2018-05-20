import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import { grey900 } from 'material-ui/styles/colors';

const style = {
    color: "grey900"
}
interface IndexProps {
    onClick: any,
    open: boolean
}
interface IndexState {
    open: boolean
}

export default class App_Bar extends React.Component<IndexProps, IndexState>{
    constructor(props: IndexProps) {
        super(props)
        this.state = {
            open: false
        }
    }
    onClick(e: any, v: any) {
        this.setState({ open: !this.state.open })
        if (this.props.onClick) {
            this.props.onClick({
                open: this.props.open,
                value: v
            })
        }
    }
    onClick2(e: any, v: any) {
        this.setState({ open: !this.state.open })
        if (this.props.onClick) {
            this.props.onClick({
                open: this.props.open,
            })
        }
    }
    onTouch() {
        this.setState({ open: !this.state.open })
    }
    handleToggle = () => this.onTouch()
    render() {
        const onClick = (e: any, v: any) => this.onClick(e, v)
        const onClick2 = (e: any, v: any) => this.onClick2(e, v)
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <Drawer docked={false} width={200} open={this.state.open} onRequestChange={onClick2}>
                            <Menu multiple={true} style={{ color: grey900 }} onItemTouchTap={onClick} onChange={onClick}>
                                <MenuItem value="大会タイム一覧">大会タイム一覧</MenuItem>
                                <MenuItem value="練習会タイム一覧">練習会タイム一覧</MenuItem>
                                <MenuItem value="反省会議事録">反省会議事録</MenuItem>
                                <MenuItem value="車両整備状況">車両整備状況</MenuItem>
                                <MenuItem value="その他">その他</MenuItem>
                            </Menu>
                        </Drawer>
                        <AppBar
                            title="Menu"
                            iconClassNameRight="muidocs-icon-navigation-expand-more"
                            onLeftIconButtonTouchTap={this.handleToggle}
                            onTitleTouchTap={this.handleToggle}
                            style={style}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}


