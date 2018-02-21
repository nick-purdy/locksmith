import React, {Component} from 'react'
import { Link } from 'react-router';
import AuditBackendService from '../../../app/service/audit-backend-service'
import Confirm from '../../../app/utils/confirm'

export default class AuditBackendList extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.onListAuditBackend = this.onListAuditBackend.bind(this)
        this.handleUnmount = this.handleUnmount.bind(this)
        this.onAuditBackendUnmount = this.onAuditBackendUnmount.bind(this)
    }

    componentDidMount() {
        AuditBackendService.list(this.onListAuditBackend)
    }

    onListAuditBackend(results) {
        console.log(results.data)
        this.setState(results)
    }

    handleUnmount(path) {
        AuditBackendService.unmount(this.onAuditBackendUnmount, path)
    }

    onAuditBackendUnmount() {
        AuditBackendService.list(this.onListAuditBackend)
    }

    render() {
        let backends = []

        if (this.state && this.state.data) {
            for (var propertyName in this.state.data) {
                if (this.state.data.hasOwnProperty(propertyName)) {
                    const backend = this.state.data[propertyName]
                    backends.push(
                        <AuditBackendRow
                                        key={propertyName}
                                        type={backend.type}
                                        path={propertyName}
                                        description={backend.description}
                                        options={backend.options}
                                        onUnmount={this.handleUnmount}
                                        />
                    )
                }
            }
        } else {
            backends.push(
                <tr key="loading">
                    <td colSpan="5">Loading...</td>
                </tr>
            )
        }

        if (backends.length < 1) {
            backends.push(
                <tr key="no-found">
                    <td colSpan="5">No audit backends are configured.</td>
                </tr>
            )
        }

        return (
                <table>
                    <thead>
                        <tr>
                            <th>path</th>
                            <th>type</th>
                            <th>description</th>
                            <th>options</th>
                            <th>tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        {backends}
                    </tbody>
                </table>
        )
    }
}

class AuditBackendRow extends Component {
    constructor(props) {
        super(props)

        this.handleUnmount = this.handleUnmount.bind(this)
    }

    handleUnmount() {
        this.props.onUnmount.call(null, this.props.path)
    }

    render() {
        return (
            <tr>
                <td>{this.props.path}</td>
                <td>{this.props.type}</td>
                <td>{this.props.description}</td>
                <AuditBackRowOptions type={this.props.type} options={this.props.options} />
                <td><a onClick={this.handleUnmount}>unmount</a></td>
            </tr>
        )
    }
}

class AuditBackRowOptions extends Component {
    render() {
        if (this.props.type === "file") {
            return (
                <td>{this.props.options.path}</td>
            )
        } else {
            return (
                <td>Unknown options</td>
            )
        }
    }
}