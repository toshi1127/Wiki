import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/FlatButton';

interface IndexProps {
    name: string,
    onChange: any,
    onSubmit: any
}
interface IndexState {
    dataSource: string[]
    value: string,
    isOK: boolean
}

export default class Form extends React.Component<IndexProps, IndexState> {
    constructor(props: IndexProps) {
        super(props)
        this.state = {
            dataSource: [],
            value: '',
            isOK: false
        }
    }

    doChange(e: any, v: any) {
        const newValue = v
        const filter = /^\d{8}.*$/
        const newIsOK = this.filtering(newValue, filter)
        this.setState({
            value: newValue,
            isOK: newIsOK
        })
    }
    filtering(value: string, filter: any) {
        return filter.test(value)
    }
    doSubmit(e: any) {
        if (this.state.isOK) {
            if (this.props.name == 'create') {
                if (this.props.onSubmit) {
                    this.props.onSubmit({
                        value: this.state.value,
                        isOK: this.state.isOK,
                        name: this.props.name
                    })
                    this.setState({
                        value: ''
                    })
                }
            }
            else {
                if (this.props.onSubmit) {
                    this.props.onSubmit({
                        value: this.state.value,
                        isOK: this.state.isOK,
                        name: this.props.name
                    })
                    this.setState({
                        value: ''
                    })
                }
            }
        }
    }
    render() {
        const onSubmit = (e: any) => this.doSubmit(e)
        const msg = this.renderStatusMessage()
        const doChange = (e: any, v: any) => this.doChange(e, v)
        return (
            <div>
                <MuiThemeProvider>
                    <TextField
                        name={this.props.name}
                        hintText="日付8桁+名前"
                        floatingLabelText="日付8桁+名前"
                        onChange={doChange}
                        value={this.state.value}
                    />
                    <RaisedButton
                        label={this.props.name}
                        onClick={onSubmit}
                    />
                </MuiThemeProvider>
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