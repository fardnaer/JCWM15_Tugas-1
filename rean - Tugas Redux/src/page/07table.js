import React from 'react'
import Axios from 'axios'
import {Button, Table, Form} from 'react-bootstrap'

class TableJSON extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dbUsers: [],
            edittt: ''
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:2000/users')
        .then((res) => {
            console.log(res.data)
            this.setState({ dbUsers: res.data })
        })
        .catch((err) => console.log(err))
    }

    showTable = () => {
        return(
            <Table striped bordered hover>
                {this.tableHead()}
                {this.tableBody()}
                {this.tableInput()}
            </Table>
        )
    }

    tableHead = () => {
        return (
            <thead>
                <tr style={{textAlign: "center"}}>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
        )
    }
    tableBody = () => {
        let {dbUsers} = this.state
        return (
            <tbody style={{textAlign: "center"}}>
                {dbUsers.map((item, index) => {
                    if (this.state.edittt === index) {
                        return (
                            <tr key={index}>
                                <td>#</td>
                                <td><Form.Control type="text" placeholder="Enter first name" ref="firstname" /></td>
                                <td><Form.Control type="text" placeholder="Enter last name" ref="lastname" /></td>
                                <td><Form.Control type="email" placeholder="Enter email" ref="email" /></td>
                                <td>
                                    <Button onClick={() => this.handleSave()}>SAVE</Button>
                                    <Button onClick={() => this.handleCancel()}>CANCEL</Button>
                                </td>
                            </tr>
                        )
                    } else {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.email}</td>
                                <td>
                                    <Button onClick={() => this.handleEdit(index)}>EDIT</Button>
                                    <Button onClick={() => this.handleDelete(index)}>DELETE</Button>
                                </td>
                            </tr>
                        )
                    }
                })}
            </tbody>
        )
    }

    tableInput = () => {
        return (
            <tbody>
                <tr >
                    <td>#</td>
                    <td><Form.Control type="text" placeholder="Enter first name" ref="firstname" /></td>
                    <td><Form.Control type="text" placeholder="Enter last name" ref="lastname" /></td>
                    <td><Form.Control type="email" placeholder="Enter email" ref="email" /></td>
                    <td><Button onClick={() => this.handleSubmit()}>SUBMIT</Button></td>
                </tr>
            </tbody>
        )
    }

    handleSubmit = () => {
        let fname = this.refs.firstname.value
        let lname = this.refs.lastname.value
        let email = this.refs.email.value
        Axios.post('http://localhost:2000/users', {
            first_name: fname,
            last_name: lname,
            email: email
        })
        this.refs.firstname.value = ''
        this.refs.lastname.value = ''
        this.refs.email.value = ''

        Axios.get('http://localhost:2000/users')
        .then((res) => {
            console.log(res.data)
            this.setState({ dbUsers: res.data })
        })
        .catch((err) => console.log(err))
    }

    handleDelete = (index) => {
        Axios.delete('http://localhost:2000/users/' + this.state.dbUsers[index].id)
        Axios.get('http://localhost:2000/users')
        .then((res) => {
            console.log(res.data)
            this.setState({ dbUsers: res.data })
        })
        .catch((err) => console.log(err))
    }

    handleEdit = (index) => {
        this.setState({edittt: index})
    }

    handleSave = () => {
    }

    handleCancel = () => {
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <h1 style={{margin: "20px 0 50px 0"}}>Table JSON</h1>
                {this.showTable()}
            </div>
        )
    }
}
export default TableJSON;