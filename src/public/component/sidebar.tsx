import * as React from 'react'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styled from 'styled-components';
import { media } from '../utile/Helper'

interface IndexProps {
    onClick: any
}
interface IndexState {

}

const SideBarComponent = styled('section') `
    ${media.desktop`width: 25%;`}
    ${media.tablet`width: 20%;`}
    ${media.phone`width: 20%;`}
    float: left;
`;

const Liststyle = {
    color: 'white',
    width: '95%'
};

const style = {
    backgroundColor: '#00bcd4'
};

export default class SideBar extends React.Component<IndexProps, IndexState> {
    constructor(props: IndexProps) {
        super(props)
    }
    onClick(e: any, v: any) {
        if (this.props.onClick) {
            this.props.onClick({
                value: v
            })
        }
    }
    render() {
        const onClick = (e: any, v: any) => this.onClick(e, v)
        return (
            <MuiThemeProvider>
                <SideBarComponent>
                    <Paper zDepth={2} style={style} >
                        <Menu onChange={onClick}>
                            <MenuItem value="練習記録" primaryText="練習記録" style={Liststyle} />
                            <MenuItem value="反省会議事録" primaryText="反省会議事録" style={Liststyle} />
                            <MenuItem value="過去の戦歴" primaryText="過去の戦歴" style={Liststyle} />
                            <MenuItem value="運行記録簿" primaryText="運行記録簿" style={Liststyle} />
                            <MenuItem value="車両点検表" primaryText="車両点検表" style={Liststyle} />
                            <MenuItem value="部内規則" primaryText="部内規則" style={Liststyle} />
                        </Menu>
                    </Paper>
                </SideBarComponent>
            </MuiThemeProvider>
        )
    }
}