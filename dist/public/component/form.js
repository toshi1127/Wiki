"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isOK: false
        };
    }
    checkValue(s) {
        return this.props.pattern.test(s);
    }
    doChange(e) {
        const newValue = e.target.value;
        const newIsOK = this.checkValue(newValue);
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
    render() {
        const msg = this.renderStatusMessage();
        const doChange = (e) => this.doChange(e);
        return (React.createElement("div", null,
            React.createElement("input", { type: 'text', name: this.props.name, value: this.state.value, onChange: doChange }),
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