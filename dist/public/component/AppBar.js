"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MuiThemeProvider_1 = require("material-ui/styles/MuiThemeProvider");
const AppBar_1 = require("material-ui/AppBar");
const MenuItem_1 = require("material-ui/MenuItem");
const Drawer_1 = require("material-ui/Drawer");
const Menu_1 = require("material-ui/Menu");
const colors_1 = require("material-ui/styles/colors");
const style = {
    color: "grey900"
};
class App_Bar extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggle = () => this.onTouch();
        this.state = {
            open: false
        };
    }
    onClick(e, v) {
        this.setState({ open: !this.state.open });
        if (this.props.onClick) {
            this.props.onClick({
                open: this.props.open,
                value: v
            });
        }
    }
    onClick2(e, v) {
        this.setState({ open: !this.state.open });
        if (this.props.onClick) {
            this.props.onClick({
                open: this.props.open,
            });
        }
    }
    onTouch() {
        this.setState({ open: !this.state.open });
    }
    render() {
        const onClick = (e, v) => this.onClick(e, v);
        const onClick2 = (e, v) => this.onClick2(e, v);
        return (React.createElement("div", null,
            React.createElement(MuiThemeProvider_1.default, null,
                React.createElement("div", null,
                    React.createElement(Drawer_1.default, { docked: false, width: 200, open: this.state.open, onRequestChange: onClick2 },
                        React.createElement(Menu_1.default, { multiple: true, style: { color: colors_1.grey900 }, onItemTouchTap: onClick, onChange: onClick },
                            React.createElement(MenuItem_1.default, { value: "大会タイム一覧" }, "\u5927\u4F1A\u30BF\u30A4\u30E0\u4E00\u89A7"),
                            React.createElement(MenuItem_1.default, { value: "練習会タイム一覧" }, "\u7DF4\u7FD2\u4F1A\u30BF\u30A4\u30E0\u4E00\u89A7"),
                            React.createElement(MenuItem_1.default, { value: "反省会議事録" }, "\u53CD\u7701\u4F1A\u8B70\u4E8B\u9332"),
                            React.createElement(MenuItem_1.default, { value: "車両整備状況" }, "\u8ECA\u4E21\u6574\u5099\u72B6\u6CC1"),
                            React.createElement(MenuItem_1.default, { value: "その他" }, "\u305D\u306E\u4ED6"))),
                    React.createElement(AppBar_1.default, { title: "Menu", iconClassNameRight: "muidocs-icon-navigation-expand-more", onLeftIconButtonTouchTap: this.handleToggle, onTitleTouchTap: this.handleToggle, style: style })))));
    }
}
exports.default = App_Bar;
//# sourceMappingURL=AppBar.js.map