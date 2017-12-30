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
    save(){
        
    }
    bodyChanged (e:any) {
        this.setState({body: e.target.value})
    }
    render(){
        return (
            <div>
                <h1><a href={`/wiki/${name}`}>{name}</a></h1>
                <textarea rows={12} cols={60}
                onChange={e=>this.bodyChanged(e)}
                value={this.state.body}
                />
                <br/>
                <button onClick={e=>this.save()}>保存</button>
            </div>
        )
    }
}