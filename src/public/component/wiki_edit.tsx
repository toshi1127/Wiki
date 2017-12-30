import * as React from 'react'
import * as request from 'superagent'
import { Redirect } from 'react-router-dom'

interface IndexProps {
    name:string
}
interface IndexState {
    name:any,
    body:string,
    loaded:boolean,
    jump:string
}

export default class WikiEdit extends React.Component<IndexProps, IndexState>  {
    constructor(props: any) {
        super(props);
        //URLのパラメーターを受け取っている。
        const name = this.props.name
        this.state = {
            name, 
            body: '',
            loaded: false,
            jump: ''
        }
    }
    render(){
        return (
            <div>
                
            </div>
        )
    }
}