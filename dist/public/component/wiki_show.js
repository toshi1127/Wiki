"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const request = require("superagent");
const WikiParser = require("../javascript/wiki_parser");
class WikiShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            body: '',
            loaded: false
        };
    }
    componentWillMount() {
        request
            .get(`/api/get/${this.state.name}`)
            .end((err, res) => {
            if (err)
                return;
            this.setState({
                body: res.body.data.body,
                loaded: true
            });
        });
    }
    render() {
        if (!this.state.loaded) {
            return (React.createElement("p", null, "\u8AAD\u307F\u8FBC\u307F\u4E2D"));
        }
        const name = this.state.name;
        const body = this.state.body;
        const html = this.convertText(body);
        return (React.createElement("div", null,
            React.createElement("p", null,
                React.createElement("a", { href: `/edit/${name}` }, "\u2192\u3053\u306E\u30DA\u30FC\u30B8\u3092\u7DE8\u96C6"))));
    }
    convertText(body) {
        const nodes = WikiParser.parse(body);
        const lines = nodes.map((e, i) => {
            if (e.tag === 'ul') {
                const lis = e.items.map((s, j) => {
                    React.createElement("li", { key: `node${i}_${j}` }, s);
                });
                return (React.createElement("ul", { key: `node${i}` }, lis));
            }
            if (e.tag === 'a') {
                return (React.createElement("div", { key: `node${i}` },
                    React.createElement("a", { href: `/wiki/${e.label}` },
                        "\u2192",
                        e.label)));
            }
            return React.createElement(e.tag, { key: 'node' + i }, e.label);
        });
        return lines;
    }
}
exports.default = WikiShow;
//# sourceMappingURL=wiki_show.js.map