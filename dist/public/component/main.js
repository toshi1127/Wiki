"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const request = require("superagent");
const MuiThemeProvider_1 = require("material-ui/styles/MuiThemeProvider");
const form_1 = require("./form");
class main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: null,
            loaded: false,
            create: false,
            delete: false,
            create_value: '',
            delete_value: ''
        };
    }
    componentWillMount() {
        console.log("呼び出します");
        request
            .get(`/api/getting_list`)
            .end((err, res) => {
            if (err) {
                return;
            }
            this.setState({
                body: res.body.data,
                loaded: true
            });
        });
    }
    handleChange(e) {
        if (e.name === 'create') {
            this.setState({
                [e.name]: e.isOK,
                create_value: e.value
            });
        }
        else {
            this.setState({
                [e.name]: e.isOK,
                delete_value: e.value
            });
        }
    }
    create_wiki(e) {
        //取得後、bodyを上書きして、画面を再表示する。
        if (this.state.create) {
            request
                .get(`/create/` + this.state.create_value)
                .end((err, res) => {
                if (err) {
                    return;
                }
            });
        }
    }
    delete_wiki(e) {
        if (this.state.delete) {
            request
                .get(`/delete/` + this.state.delete_value)
                .end((err, res) => {
                if (err) {
                    return;
                }
            });
        }
    }
    printlist() {
        const lines = this.state.body.map((value, index, array) => {
            return (React.createElement("div", { className: "col-lg-4 col-md-4" },
                React.createElement("div", { className: "fh5co-blog animate-box" },
                    React.createElement("div", { className: "blog-text" },
                        React.createElement("h3", null,
                            React.createElement("a", { href: `/wiki/${value}` }, value)),
                        React.createElement("p", null, " "),
                        React.createElement("a", { href: `/wiki/${value}`, className: "btn btn-primary" }, "Read More")))));
        });
        return lines;
    }
    render() {
        if (!this.state.loaded) {
            return (React.createElement(MuiThemeProvider_1.default, null,
                React.createElement("div", null,
                    React.createElement("p", null, "\u8AAD\u307F\u8FBC\u307F\u4E2D"))));
        }
        else {
            console.log("描写します");
            const doChange = (e) => this.handleChange(e);
            const filtering = /^\d{8}.*/g;
            const pattern = /^\d{8}.*$/;
            const create_wiki = (e) => this.create_wiki(e);
            const delete_wiki = (e) => this.delete_wiki(e);
            const html = this.printlist();
            return (React.createElement(MuiThemeProvider_1.default, null,
                React.createElement("div", null,
                    React.createElement("link", { rel: "stylesheet", href: "./stylesheets/bootstrap.css" }),
                    React.createElement("link", { rel: "stylesheet", href: "./stylesheets/style.css" }),
                    React.createElement("header", { id: "fh5co-header", className: "fh5co-cover fh5co-cover-sm", role: "banner" },
                        React.createElement("div", { className: "container" },
                            React.createElement("div", { className: "display-tc animate-box", "data-animate-effect": "fadeIn" },
                                React.createElement("h1", null, "HUAC Blog")))),
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row" }, html)),
                    React.createElement("div", { id: "formlist" },
                        React.createElement("form", { onSubmit: create_wiki },
                            React.createElement(form_1.default, { name: 'create', onChange: doChange }),
                            React.createElement("input", { type: 'submit', value: 'create' })),
                        React.createElement("br", null),
                        React.createElement("form", { onSubmit: delete_wiki },
                            React.createElement(form_1.default, { name: 'delete', onChange: doChange }),
                            React.createElement("input", { type: 'submit', value: 'delete' }))),
                    React.createElement("script", { src: "javascript/jquery.min.js" }),
                    React.createElement("script", { src: "javascript/bootstrap.min.js" }))));
        }
    }
}
exports.default = main;
//# sourceMappingURL=main.js.map