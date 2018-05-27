import * as React from 'react'
import * as request from 'superagent'
import * as nedb from 'nedb'
import { Redirect, Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Form from './form';
import CircularProgress from 'material-ui/CircularProgress';
import ToolBar from './AppBar';
import SideBar from './sidebar';
import styled from 'styled-components';

interface IndexProps {
    match: {
        params: {
            name: string;
        }
    }
}

interface IndexState {
    body: string[],
    loaded: boolean,
    create: boolean,
    delete: boolean,
    create_value: any,
    delete_value: any,
    open: boolean,
    value: string,
    name: string,
    loadedform: boolean,
    selectValue: string
}

const ComponentList = styled.div`
    margin-right: auto;
    margin-left : auto;
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
`
const FormList = styled.div`
    margin-left: 9%;
    width: 100%;
`
const Display = styled.div`
    top: 5%;
`

export default class main extends React.Component<IndexProps, IndexState>{
    constructor(props: IndexProps) {
        super(props);
        const { match } = this.props
        const name = match.params.name
        this.state = {
            body: null,
            loaded: false,
            create: false,
            delete: false,
            create_value: '',
            delete_value: '',
            open: false,
            value: '',
            name: name,
            loadedform: false,
            selectValue: null
        }
    }
    componentWillMount() {
        request
            .get(`/api/getting_list`)
            .end((err, res) => {
                if (err) {
                    return
                }
                if (res.body == null) {
                    this.setState({
                        loaded: true
                    })
                }
                else {
                    this.setState({
                        body: res.body.data,
                        loaded: true
                    })
                }
            })
    }
    handleChange(e: any) {
        if (e.name === 'create') {
            this.setState({
                [e.name]: e.isOK,
                create_value: e.value
            })
        }
        else {
            this.setState({
                [e.name]: e.isOK,
                delete_value: e.value
            })
        }
    }
    create_wiki(e: any) {
        if (e.isOK) {
            request
                .get(`/create/` + e.value + "/" + this.state.name)
                .end((err, res) => {
                    if (err) {
                        return
                    }
                })
        }
    }
    delete_wiki(e: any) {
        if (e.isOK) {
            request
                .get(`/delete/` + e.value)
                .end((err, res) => {
                    if (err) {
                        return
                    }
                })
        }
    }
    onloaded(e: any) {
        this.setState({
            loadedform: e.loaded
        })
    }
    onClick(e: any) {
        this.setState({
            selectValue: e.value,
            body: null
        })
    }
    componentDidUpdate() {
        if (this.state.selectValue != null && this.state.body == null) {
            request
                .get(`/api/getting_list`)
                .end((err, res) => {
                    if (err) {
                        return
                    }
                    else {
                        this.setState({
                            body: res.body.data,
                        })
                    }
                })
        }
    }
    printlist() {
        const lines = this.state.body.map((value: any, index: any, array: any[]) => {
            return (
                <div className="col-lg-4 col-md-4">
                    <div className="fh5co-blog animate-box">
                        <div className="blog-text">
                            <h3>
                                <Link to={`/wiki/${value}`}>{value}</Link>
                            </h3>
                            <Link to={`/wiki/${value}`}>Read More</Link>
                        </div>
                    </div>
                </div>
            )
        })
        return lines
    }
    createForm() {
        const create_wiki = (e: any) => this.create_wiki(e)
        const delete_wiki = (e: any) => this.delete_wiki(e)
        const doChange = (e: any) => this.handleChange(e)
        if (this.state.loadedform) {
            return (
                <FormList>
                    <Form name='create' onChange={doChange} onSubmit={create_wiki} />
                    <br />
                    <Form name='delete' onChange={doChange} onSubmit={delete_wiki} />
                </FormList>
            )
        }
    }
    render() {
        if (!this.state.loaded) {
            return (
                <div style={{
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                    margin: 'auto',
                    width: '128px',
                    height: '64px'
                }}>
                    <MuiThemeProvider>
                        <CircularProgress size={80} thickness={5} />
                    </MuiThemeProvider>
                </div>
            )
        }
        else {
            var html: any
            const onClick = (e: any) => this.onClick(e)
            const onloaded = (e: any) => this.onloaded(e)
            const doChange = (e: any) => this.handleChange(e)
            const filtering = /^\d{8}.*/g
            const pattern = /^\d{8}.*$/
            const create_wiki = (e: any) => this.create_wiki(e)
            const delete_wiki = (e: any) => this.delete_wiki(e)
            const form = this.createForm()
            if (this.state.body) {
                html = this.printlist()
            }
            return (
                <Display>
                    <ToolBar onloaded={onloaded} />
                    <SideBar onClick={onClick} />
                    <link rel="stylesheet" href={"/main/" + this.state.name + "/stylesheets/bootstrap.css"} />
                    <link rel="stylesheet" href={"/main/" + this.state.name + "/stylesheets/style.css"} />
                    <div className="container">
                        <ComponentList>
                            <div className="row">
                                {html}
                                {form}
                            </div>
                        </ComponentList>
                    </div>
                    <script src="javascript/jquery.min.js"></script>
                    <script src="javascript/bootstrap.min.js"></script>
                </Display >
            )
        }
    }
}