import * as React from 'react'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styled from 'styled-components';
import { media } from '../utile/Helper'

interface IndexProps {

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
    color: 'white'
};

const style = {
    backgroundColor: '#00bcd4'
};

export default class SideBar extends React.Component<IndexProps, IndexState> {
    constructor(props: IndexProps) {
        super(props)
    }
    render() {
        return (
            <MuiThemeProvider>
                <SideBarComponent>
                    <Paper zDepth={2} style={style} >
                        <Menu>
                            <MenuItem primaryText="練習記録" style={Liststyle} />
                            <MenuItem primaryText="反省会議事録" style={Liststyle} />
                            <MenuItem primaryText="過去の戦歴" style={Liststyle} />
                            <MenuItem primaryText="運行記録簿" style={Liststyle} />
                            <MenuItem primaryText="車両点検表" style={Liststyle} />
                            <MenuItem primaryText="部内規則" style={Liststyle} />
                        </Menu>
                    </Paper>
                </SideBarComponent>
            </MuiThemeProvider>
        )
    }
}