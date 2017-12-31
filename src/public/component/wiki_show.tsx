import * as React from 'react'
import * as request from 'superagent'
import { Redirect } from 'react-router-dom'

interface IndexProps {
    name:any
}
interface IndexState {
    name:string,
    body:string,
    loaded:boolean
}

export default class WikiShow extends React.Component<IndexProps, IndexState>  {
    constructor(props:any) {
        super(props);
        this.state = {
            name: this.props.name,
            body: '',
            loaded: false
        }
    }
    render(){
        return (
            <div>
            </div>
        )
    }
}