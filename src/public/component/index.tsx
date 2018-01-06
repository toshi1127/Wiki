import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
    BrowserRouter,
    Route, Switch
} from 'react-router-dom'
import WikiEdit from './wiki_edit'
import WikiShow from './wiki_show'

const WikiApp = () => (
    <BrowserRouter>
        <div>
            <Route path='/wiki/:name' component={WikiShow} />
            <Route path='/edit/:name' component={WikiEdit} />
        </div>
    </BrowserRouter>
)

ReactDOM.render(
    <WikiApp />, document.getElementById('root')
)