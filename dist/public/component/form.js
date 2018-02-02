"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MuiThemeProvider_1 = require("material-ui/styles/MuiThemeProvider");
const AutoComplete_1 = require("material-ui/AutoComplete");
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            value: '',
            isOK: false
        };
    }
    doChange(e) {
        const newValue = e;
        const filter = /^\d{8}.*$/;
        const newIsOK = this.filtering(newValue, filter);
        this.setState({
            value: newValue,
            isOK: newIsOK
        });
        if (this.props.onChange) {
            this.props.onChange({
                value: newValue,
                isOK: newIsOK,
                name: this.props.name
            });
        }
    }
    filtering(value, filter) {
        console.log(filter.test(value));
        return filter.test(value);
    }
    render() {
        const msg = this.renderStatusMessage();
        const doChange = (e) => this.doChange(e);
        return (React.createElement("div", null,
            React.createElement(MuiThemeProvider_1.default, null,
                React.createElement(AutoComplete_1.default, { hintText: "日付8桁+名前", searchText: this.state.value, onUpdateInput: doChange, dataSource: this.state.dataSource, name: this.props.name })),
            msg));
    }
    renderStatusMessage() {
        const so = {
            margin: '8px',
            padding: '8px',
            color: 'white',
            backgroundColor: ''
        };
        let msg = null;
        if (this.state.isOK) {
            // OKのとき
            so.backgroundColor = 'green';
            msg = React.createElement("span", { style: so }, "OK");
        }
        else {
            // NGのとき (ただし空白の時は非表示)
            if (this.state.value !== '') {
                so.backgroundColor = 'red';
                msg = React.createElement("span", { style: so }, "NG");
            }
        }
        return msg;
    }
}
exports.default = Form;
//# sourceMappingURL=form.js.map