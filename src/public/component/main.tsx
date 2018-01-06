import * as React from 'react'
import * as request from 'superagent'
import { Redirect } from 'react-router-dom'

interface IndexProps {
}

interface IndexState {
    loaded: boolean
}

export default class main extends React.Component<IndexProps, IndexState>{
    constructor(props: IndexProps) {
        super(props);
        this.state = {
            loaded: false
        }
    }
}