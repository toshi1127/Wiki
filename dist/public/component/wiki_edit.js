"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class WikiEdit extends React.Component {
    constructor(props) {
        super(props);
        //URLのパラメーターを受け取っている。
        const name = this.props.name;
        this.state = {
            name,
            body: '',
            loaded: false,
            jump: ''
        };
    }
    save() {
    }
    bodyChanged(e) {
        this.setState({ body: e.target.value });
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("h1", null,
                React.createElement("a", { href: `/wiki/${name}` }, name)),
            React.createElement("textarea", { rows: 12, cols: 60, onChange: e => this.bodyChanged(e), value: this.state.body }),
            React.createElement("br", null),
            React.createElement("button", { onClick: e => this.save() }, "\u4FDD\u5B58")));
    }
}
exports.default = WikiEdit;
//# sourceMappingURL=wiki_edit.js.map