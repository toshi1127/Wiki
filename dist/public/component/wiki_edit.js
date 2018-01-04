"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const request = require("superagent");
class WikiEdit extends React.Component {
    constructor(props) {
        super(props);
        const { match } = this.props;
        //URLのパラメーターを受け取っている。
        const name = match.params.name;
        this.state = {
            name: name,
            body: '',
            loaded: false,
            jump: ''
        };
    }
    componentWillMount() {
        request
            .get(`api/get/${this.state.name}`)
            .end((err, res) => {
            if (err) {
                return;
            }
            this.setState({
                name: this.state.name,
                //res.bodyで連想配列全体。data=docsの中のbodyにアクセスしている。
                body: res.body.data.body,
                //読み込みが終わったのでtrueにしている。
                loaded: true,
                jump: this.state.jump,
            });
        });
    }
    save() {
        const wikiname = this.state.name;
        request
            .post('/api/put/' + wikiname)
            .type('form')
            .send({
            name: wikiname,
            body: this.state.body
        })
            .end((err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            this.setState({
                name: this.state.name,
                //res.bodyで連想配列全体。data=docsの中のbodyにアクセスしている。
                body: this.state.body,
                //読み込みが終わったのでtrueにしている。
                loaded: this.state.loaded,
                jump: '/wiki/' + wikiname
            });
        });
    }
    bodyChanged(e) {
        this.setState({
            name: this.state.name,
            body: e.target.value,
            loaded: this.state.loaded,
            jump: this.state.jump
        });
    }
    render() {
        if (!this.state.loaded) {
            return (React.createElement("p", null, "\u8AAD\u307F\u8FBC\u307F\u4E2D"));
        }
        if (this.state.jump !== '') {
            //メイン画面にリダイレクト
            //保存したんだから、編集画面から閲覧する画面に推移させる。
        }
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