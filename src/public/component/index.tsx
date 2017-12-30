import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
    BrowserRouter,
    Route, Switch
} from 'react-router-dom'
import　WikiShow from './wiki_edit'
import　WikiEdit from './wiki_show'

const WikiApp = () => (
    //メインのファイルの中にルーティングを設定する。
    //BrowserRouterの中に、各ルーティングの設定をする。
    <BrowserRouter>
    <div>
        <Route path='/wiki/:name' component={WikiShow}/>
        <Route path='/wiki/:name' component={WikiEdit}>
    </div>
    </BrowserRouter>
)

ReactDOM.render(
    <WikiApp />,document.getElementById('root')
)