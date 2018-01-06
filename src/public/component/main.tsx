import * as React from 'react'
import * as request from 'superagent'
import { Redirect } from 'react-router-dom'

interface IndexProps {
}

interface IndexState {
    body: string[]
    loaded: boolean
}

export default class main extends React.Component<IndexProps, IndexState>{
    constructor(props: IndexProps) {
        super(props);
        this.state = {
            body:null,
            loaded: false
        }
    }
    componentWillMount() {
        request
            .get('/api/get/list')
            .end((err, res) => {
                if (err) {
                    return
                }
                this.setState({
                    body:res.body.data,
                    loaded: true
                })
            })
    }
}