import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
    BrowserRouter,
    Route, Switch
} from 'react-router-dom'
const WikiApp = () => (
    <BrowserRouter>
    <div>
        Wellcome to React
    </div>
    </BrowserRouter>
)

ReactDOM.render(
    <WikiApp />,document.getElementById('root')
)