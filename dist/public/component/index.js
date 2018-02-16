"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const react_router_dom_1 = require("react-router-dom");
const wiki_edit_1 = require("./wiki_edit");
const wiki_show_1 = require("./wiki_show");
const main_1 = require("./main");
const WikiApp = () => (React.createElement(react_router_dom_1.BrowserRouter, null,
    React.createElement("div", null,
        React.createElement(react_router_dom_1.Route, { path: '/wiki/:name', component: wiki_show_1.default }),
        React.createElement(react_router_dom_1.Route, { path: '/edit/:name', component: wiki_edit_1.default }),
        React.createElement(react_router_dom_1.Route, { path: '/main/:name', component: main_1.default }))));
ReactDOM.render(React.createElement(WikiApp, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map