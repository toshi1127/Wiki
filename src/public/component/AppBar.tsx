import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

interface IndexProps {
    onloaded: any
}
interface IndexState {
    loaded: boolean
}

const Liststyle = {
    fontSize: '17px'
};

export default class ToolBar extends React.Component<IndexProps, IndexState> {

    constructor(props: IndexProps) {
        super(props);
        this.state = {
            loaded: true
        };
    }

    onClick(e: any) {
        this.setState({
            loaded: !this.state.loaded
        })
        if (this.props.onloaded) {
            this.props.onloaded({
                loaded: this.state.loaded
            })
        }
    }

    render() {
        const onClick = (e: any) => this.onClick(e)
        return (
            <MuiThemeProvider>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <DropDownMenu value={1} style={Liststyle} >
                        <MenuItem value={1} primaryText="法政大学部内システム"/>
                        </DropDownMenu>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarTitle text="Options" />
                        <ToolbarSeparator />
                        <RaisedButton label="編集" primary={true} onClick={onClick} />
                        <IconMenu
                            iconButtonElement={
                                <IconButton touch={true}>
                                    <NavigationExpandMoreIcon />
                                </IconButton>
                            }
                        >
                        </IconMenu>
                    </ToolbarGroup>
                </Toolbar>
            </MuiThemeProvider>
        );
    }
}

