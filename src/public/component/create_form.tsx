import * as React from 'react'
import * as request from 'superagent'

interface IndexProps {

}
interface IndexState {
    value: string
}

export class CreateForm extends React.Component<IndexProps, IndexState> {
    constructor(props: IndexProps) {
        super(props)
        this.state = {
            value: ''
        }
    }
    render() {
        return (
            <div>
            </div>
        )
    }
}