import React, {Component} from 'react'
import { Link } from 'react-router';
import PolicyService from '../../../app/service/policy-service'
import Confirm from '../../../app/utils/confirm'

export default class PolicyList extends Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.onListPolicies = this.onListPolicies.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }

    componentDidMount() {
        PolicyService.list(this.onListPolicies)
    }

    onListPolicies(results) {
        console.log(results.data)
        results.data.policies.sort()
        this.setState(results)
    }

    onDelete() {
        this.setState({data: null})
        PolicyService.list(this.onListPolicies)
    }

    render() {
        let policies = []

        if (this.state && this.state.data) {
            const innerParent = this
            for (var i in this.state.data.policies) {
                const policy = this.state.data.policies[i]
                policies.push(
                    <PolicyRow key={policy} name={policy} onDelete={this.onDelete} />
                )
            }
        } else {
            policies.push(
                <tr key="loading">
                    <td>Loading...</td>
                    <td></td>
                </tr>
            )
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>tools</th>
                    </tr>
                </thead>
                <tbody>
                    {policies}
                </tbody>
            </table>
        )
    }
}

class PolicyRow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            confirmDeleting: false
        }

        this.onDeleted = this.onDeleted.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    confirmDelete() {
        this.setState({confirmDeleting: true})
    }

    handleConfirm() {
        this.setState({confirmDeleting: false})
        PolicyService.delete(this, this.onDeleted, this.props.name)
    }

    handleCancel() {
        this.setState({confirmDeleting: false})
    }

    onDeleted() {
        // PolicyService.list(this, this.onListPolicies)
        // alert("deleted")
        this.props.onDelete.call(null)
    }

    render() {
        let confirmDeleting = ""
        if (this.state.confirmDeleting) {
            const message = "Are you sure you want to delete the policy '" + this.props.name + "'?"
            confirmDeleting = (<Confirm onCancel={this.handleCancel} onConfirm={this.handleConfirm} message={message} />)
        }

        return (
            <tr>
                <td>
                    {confirmDeleting}
                    <Link to={'/policy/update/' + this.props.name}>{this.props.name}</Link>
                </td>
                <td>
                    <a onClick={this.confirmDelete}>delete</a>
                </td>
            </tr>
        )
    }
}