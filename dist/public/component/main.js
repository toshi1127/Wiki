"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const request = require("superagent");
const MuiThemeProvider_1 = require("material-ui/styles/MuiThemeProvider");
const form_1 = require("./form");
const CircularProgress_1 = require("material-ui/CircularProgress");
const AppBar_1 = require("./AppBar");
class main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: null,
            loaded: false,
            create: false,
            delete: false,
            create_value: '',
            delete_value: '',
            open: false,
            value: ''
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
        console.log(e.name);
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
        if (e.isOK) {
            request
                .get(`/create/` + e.value)
                .end((err, res) => {
                if (err) {
                    return;
                }
            });
        }
    }
    delete_wiki(e) {
        if (e.isOK) {
            request
                .get(`/delete/` + e.value)
                .end((err, res) => {
                if (err) {
                    return;
                }
            });
        }
    }
    handleToggle(e) {
        if (e.value) {
            this.setState({
                open: e.open,
                value: e.value
            });
        }
        else {
            this.setState({
                open: e.open,
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
            return (React.createElement("div", { style: {
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                    margin: 'auto',
                    width: '128px',
                    height: '64px'
                } },
                React.createElement(MuiThemeProvider_1.default, null,
                    React.createElement(CircularProgress_1.default, { size: 80, thickness: 5 }))));
        }
        else {
            console.log("描写します");
            const onClick = (e) => this.handleToggle(e);
            const doChange = (e) => this.handleChange(e);
            const filtering = /^\d{8}.*/g;
            const pattern = /^\d{8}.*$/;
            const create_wiki = (e) => this.create_wiki(e);
            const delete_wiki = (e) => this.delete_wiki(e);
            const html = this.printlist();
            return (React.createElement("div", null,
                React.createElement(AppBar_1.default, { onClick: onClick, open: this.state.open }),
                React.createElement("link", { rel: "stylesheet", href: "./stylesheets/bootstrap.css" }),
                React.createElement("link", { rel: "stylesheet", href: "./stylesheets/style.css" }),
                React.createElement("header", { id: "fh5co-header", className: "fh5co-cover fh5co-cover-sm", role: "banner" },
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "display-tc animate-box", "data-animate-effect": "fadeIn" },
                            React.createElement("h1", null, "HUAC Blog")))),
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "row" }, html)),
                React.createElement("div", { id: "formlist" },
                    React.createElement(form_1.default, { name: 'create', onChange: doChange, onSubmit: create_wiki }),
                    React.createElement("br", null),
                    React.createElement(form_1.default, { name: 'delete', onChange: doChange, onSubmit: delete_wiki })),
                React.createElement("script", { src: "javascript/jquery.min.js" }),
                React.createElement("script", { src: "javascript/bootstrap.min.js" })));
        }
    }
}
exports.default = main;
//# sourceMappingURL=main.js.map