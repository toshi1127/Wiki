import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';

interface IndexProps {
    name: string,
    onChange: any
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

    doChange(e: any) {
        const newValue = e
        const filter = /^\d{8}.*$/
        const newIsOK = this.filtering(newValue, filter)
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
    filtering(value: string, filter: any) {
        console.log(filter.test(value))
        return filter.test(value)
    }
    render() {
        const msg = this.renderStatusMessage()
        const doChange = (e: any) => this.doChange(e)
        return (
            <div>
                <MuiThemeProvider>
                    <AutoComplete
                        hintText="日付8桁+名前"
                        searchText={this.state.value}
                        onUpdateInput={doChange}
                        dataSource={this.state.dataSource}
                        name={this.props.name}
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