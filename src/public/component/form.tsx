import * as React from 'react'
import * as request from 'superagent'

interface IndexProps {
    filer:any,
    pattern:any
}
interface IndexState {
    value: string,
    isOK:boolean
}

export  default class Form extends React.Component<IndexProps, IndexState> {
    constructor(props: IndexProps) {
        super(props)
        this.state = {
            value: '',
            isOK:this.checkValue(this.state.value)
        }
    }
    checkValue(s:string){
        return this.props.pattern.test(s)
    }
    doChange(e:any) {
        const newValue = e.target.value
        const newIsOK = this.checkValue(newValue)
        this.setState({
            value: newValue,
            isOK:newIsOK
        })
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