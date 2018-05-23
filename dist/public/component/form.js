"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MuiThemeProvider_1 = require("material-ui/styles/MuiThemeProvider");
const TextField_1 = require("material-ui/TextField");
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            value: '',
            isOK: false
        };
    }
    doChange(e, v) {
        const newValue = v;
        const filter = /^\d{8}.*$/;
        const newIsOK = this.filtering(newValue, filter);
        this.setState({
            value: newValue,
            isOK: newIsOK
        });
    }
    filtering(value, filter) {
        return filter.test(value);
    }
    doSubmit() {
        if (this.state.isOK) {
            if (this.props.name == 'create') {
                if (this.props.onSubmit) {
                    this.props.onSubmit({
                        value: this.state.value,
                        isOK: this.state.isOK,
                        name: this.props.name
                    });
                }
            }
            else {
                if (this.props.onSubmit) {
                    this.props.onSubmit({
                        value: this.state.value,
                        isOK: this.state.isOK,
                        name: this.props.name
                    });
                }
            }
        }
    }
    render() {
        const onSubmit = () => this.doSubmit();
        const msg = this.renderStatusMessage();
        const doChange = (e, v) => this.doChange(e, v);
        return (React.createElement("div", null,
            React.createElement("form", { onSubmit: onSubmit },
                React.createElement(MuiThemeProvider_1.default, null,
                    React.createElement(TextField_1.default, { name: this.props.name, hintText: "日付8桁+名前", floatingLabelText: "日付8桁+名前", onChange: doChange, value: this.state.value })),
                msg,
                React.createElement("br", null),
                React.createElement("input", { type: 'submit', value: this.props.name }))));
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