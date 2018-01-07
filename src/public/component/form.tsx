import * as React from 'react'
import * as request from 'superagent'

interface IndexProps {
    filer: any,
    pattern: any,
    name: string,
    onChange: any
}
interface IndexState {
    value: string,
    isOK: boolean
}

export default class Form extends React.Component<IndexProps, IndexState> {
    constructor(props: IndexProps) {
        super(props)
        this.state = {
            value: '',
            isOK: false
        }
    }
    checkValue(s: string) {
        return this.props.pattern.test(s)
    }
    doChange(e: any) {
        console.log(e.target.value)
        const newValue = e.target.value
        const newIsOK = this.checkValue(newValue)
        this.setState({
            value: newValue,
            isOK: newIsOK
        })
        if (this.props.onChange) {
            this.props.onChange({
                value: newValue,
                isOK: newIsOK,
                name: this.props.name
            })
        }
    }
    render() {
        const msg = this.renderStatusMessage()
        const doChange = (e: any) => this.doChange(e)
        return (
            <div>
                <input type='text' name={this.props.name} value={this.state.value} onChange={doChange} />
                {msg}
            </div>
        )
    }
    renderStatusMessage() {
        const so = {
            margin: '8px',
            padding: '8px',
            color: 'white',
            backgroundColor: ''
        }
        let msg = null
        if (this.state.isOK) {
            // OKのとき
            so.backgroundColor = 'green'
            msg = <span style={so}>OK</span>
        } else {
            // NGのとき (ただし空白の時は非表示)
            if (this.state.value !== '') {
                so.backgroundColor = 'red'
                msg = <span style={so}>NG</span>
            }
        }
        return msg
    }
}