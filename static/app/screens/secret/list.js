import React, {Component} from 'react'
import { Link } from 'react-router'
import SecretService from '../../../app/service/secret-service'
import Confirm from '../../../app/utils/confirm'
import BreadCrumb from '../../../app/utils/bread-crumbs'

export default class SecretList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            path: props.path
        };

        this.listSecrets = this.listSecrets.bind(this)
        this.handleListSecrets = this.handleListSecrets.bind(this)
        this.handleSecretDelete = this.handleSecretDelete.bind(this)
    }

    componentDidMount() {
        this.listSecrets(this.state.path)
    }
    
    listSecrets(path) {
        this.setState({path: path})
        SecretService.list(this.handleListSecrets, path.split('.').join('/'))
    }

    handleListSecrets(secrets) {
        this.setState(secrets)
        path: this.state.path.split('.')
    }

    handleSecretExpansion(path, event) {
        const newPath = this.state.path + '.' + path.replace('/', '')
        this.context.router.push({pathname: '/secret/list/' + newPath})
        this.listSecrets(newPath)
    }

    handleSecretDelete(path, event) {
        const deletePath = path.split('.').join('/')
        SecretService.delete(this.listSecrets, deletePath)
    }

    handleBreadCrumb(path) {
        // this.setState({path: path})
        // this.listSecrets(path)
        this.listSecrets(path.join('.'))
    }

    render() {
        let secrets = []

        if (this.state && this.state.data) {
            if (this.state.data.keys) {
                for (let index in this.state.data.keys) {
                    const path = this.state.data.keys[index]
                    const fullPath = this.state.path + "." + path
                    secrets.push(
                        <SecretsRow key={path} path={path} fullPath={fullPath} onClick={this.handleSecretExpansion.bind(this, path)} onDeleteClick={this.handleSecretDelete.bind(this, fullPath)} />
                    )
                }
            } else {
                secrets.push(
                    <tr key="no-secrets">
                        <td colSpan="2">No secrets have been written.</td>
                    </tr>
                )
            }
        } else {
            secrets.push(
                        <tr key="loading">
                            <td>Loading...</td>
                            <td></td>
                        </tr>
                        )
        }

        return (
            <div>
                <BreadCrumb folder="true" folders={this.state.path.split('.')} onClick={this.handleBreadCrumb.bind(this)} />
                <table>
                    <thead>
                        <tr>
                            <th>Secret Path</th>
                            <th>Tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        {secrets}
                    </tbody>
                </table>
            </div>
        )
    }
}

class SecretsRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            confirmDeleting: false
        }

        this.confirmDelete = this.confirmDelete.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    confirmDelete() {
        this.setState({confirmDeleting: true})
    }

    handleConfirm() {
        this.setState({confirmDeleting: false})
        this.props.onDeleteClick.call(null)
    }

    handleCancel() {
        this.setState({confirmDeleting: false})
    }

    render() {
        let confirmDeleting = ""
        if (this.state.confirmDeleting) {
            const message = "Are you sure you want to delete the secret '" + this.props.path + "'?"
            confirmDeleting = (<Confirm onCancel={this.handleCancel} onConfirm={this.handleConfirm} message={message} />)
        }

        if (this.props.path.endsWith("/")) {
            return (
                    <tr>
                        <td>
                            {confirmDeleting}
                            <a onClick={this.props.onClick}>
                                <i className="fa fa-folder-o" aria-hidden="true"></i>
                                <span>&nbsp;{this.props.path}</span>
                            </a>
                        </td>
                        <td></td>
                    </tr>
            )
        } else {
            return (
                    <tr>
                        <td>
                            {confirmDeleting}
                            <Link to={"/secret/update/" + this.props.fullPath}>
                                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                <span>&nbsp;{this.props.path}</span>
                            </Link>
                        </td>
                        <td><a onClick={this.confirmDelete}>delete</a></td>
                    </tr>
            )
        }
    }
}

SecretList.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
