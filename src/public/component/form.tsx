import * as React from 'react'
import * as request from 'superagent'

interface IndexProps {

}
interface IndexState {
    value: string
}

export  default class Form extends React.Component<IndexProps, IndexState> {
    constructor(props: IndexProps) {
        super(props)
        this.state = {
            value: ''
        }
    }
    doChange(e:any) {
        const newValue = e.target.value
        this.setState({value: newValue})
    }
    render() {
        const doChange = (e:any)=> this.doChange(e)
        return (
            <div>
                <input type='text' onChange={doChange} />
            </div>
        )
    }
}