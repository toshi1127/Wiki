import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
    BrowserRouter,
    Route, Switch
} from 'react-router-dom'
import WikiEdit from './wiki_edit'
import WikiShow from './wiki_show'
import WikiIndex from './main'

const WikiApp = () => (
    <BrowserRouter>
        <div id='route'>
            <Route path='/wiki/:name' component={WikiShow} />
            <Route path='/edit/:name' component={WikiEdit} />
            <Route path='/main/:name' component={WikiIndex} />
        </div>
    </BrowserRouter>
)

ReactDOM.render(
    <WikiApp />, document.getElementById('root')
)