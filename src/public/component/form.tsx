import * as React from 'react'
import * as request from 'superagent'

interface IndexProps {

}
interface IndexState {
    value: string
}

export class Form extends React.Component<IndexProps, IndexState> {
    constructor(props: IndexProps) {
        super(props)
        this.state = {
            value: ''
        }
    }
    doChange(e:any) {
        
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