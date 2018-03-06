import React, {Component} from 'react'
import PropTypes from 'prop-types'
import RowDropdown from './row-dropdown'
import AuthService from '../../../app/service/auth-service'
import Navigation from '../../../app/utils/navigation'
import BreadCrumb from '../../../app/utils/bread-crumbs'
import SecretService from '../../service/secret-service'

export default class SecretCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pathName: "",
            incrementedId: 2,
            secrets: [
                {id: 1, key: "newSecretName", value: "newSecretValue", type: "field"}
            ]
        }

        this.handleAddNewSecretRow = this.handleAddNewSecretRow.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleUpdateSecretInput = this.handleUpdateSecretInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRemoveSecretRow = this.handleRemoveSecretRow.bind(this)
        this.handleChangePath = this.handleChangePath.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        let path = this.props.params.path
        if (this.state.pathName.length > 1) {
            path += "/" + this.state.pathName
        }

        let data = {}   
        for (let secret of this.state.secrets) {
            data[secret.key] = secret.value
        }

        SecretService.create(this.handleCancel, path, data)
    }

    handleAddNewSecretRow(type) {
        const id = this.state.incrementedId
        this.setState({incrementedId: id + 1})
        this.state.secrets.push({id: id, key: 'key', value: 'value', type: type})
    }

    handleCancel() {
        this.context.router.push({pathname: '/secret/list/' + this.props.params.path})
    }

    handleUpdateSecretInput(id, newKey, newValue) {
        const secrets = this.state.secrets
        for (let secret of secrets) {
            if (secret.id === id) {
                secret.key = newKey
                secret.value = newValue
            }
        }
        this.setState({secrets: secrets})
    }

    handleRemoveSecretRow(id) {
        const i = this.getIndex(id)
        const secrets = this.state.secrets
        secrets.splice(i, 1)
        this.setState({secrets: secrets})
    }

    getIndex(id) {
        for (let i=0; i<this.state.secrets.length; i++) {
            if (this.state.secrets[i].id === id) {
                return i
            }
        }

        return -1
    }

    handleBreadCrumb(path) {
        this.context.router.push({pathname: '/secret/list/' + path})
    }

    handleChangePath(event) {
        this.setState({pathName: event.target.value})
    }

    render() {
        let rows = []

        for (let value of this.state.secrets) {
            rows.push(
                <SecretCreateRow key={value.id} id={value.id} name={value.key} secret={value.value} type={value.type} onUpdate={this.handleUpdateSecretInput} onRemove={this.handleRemoveSecretRow} />
            )
        }

        let breadCrumbPath = this.props.params.path + "/New Secret"

        return (
            <main className="wrapper">
                <Navigation authenticated={true} />
                <section className="container" id="secret-create">
                    <h5 className="title">Edit Secret</h5>
                    <BreadCrumb folders={(breadCrumbPath).split("/")} onClick={this.handleBreadCrumb.bind(this)} />
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <div className="container">
                                <div>
                                    <label>Path Name</label>
                                    <input onChange={this.handleChangePath} placeholder="Secret Path" value={this.state.pathName} type="text" />
                                    <label>Secrets</label>
                                </div>
                                {rows}
                                <RowDropdown onAdd={this.handleAddNewSecretRow} />
                            </div>
                            <button className="button button-outline" onClick={this.handleCancel}>Cancel</button>
                            <input className="button-primary float-right" value="Save" type="submit" />
                        </fieldset>
                    </form>
                </section>
            </main>
        )
    }
}

class SecretCreateRow extends Component {
    constructor(props) {
        super(props)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeSecret = this.handleChangeSecret.bind(this)
        this.handleOnRemove = this.handleOnRemove.bind(this)
    }

    handleChangeName(event) {
        this.props.onUpdate.call(null, this.props.id, event.target.value, this.props.secret)
    }

    handleChangeSecret(event) {
        this.props.onUpdate.call(null, this.props.id, this.props.name, event.target.value)
    }

    handleOnRemove(e) {
        e.preventDefault();
        this.props.onRemove.call(null, this.props.id)
    }

    render() {
        return (
            <div className="row">
                <div className="column"><input onChange={this.handleChangeName} placeholder="Secret Name" value={this.props.name} type="text" /></div>
                <div className="column">{this.getTextElement(this.props.type)}</div>
                <div className="column"><a onClick={this.handleOnRemove}>remove</a></div>
            </div>
        )
    }

    getTextElement(type) {
        if (this.props.type === 'json') {
            return (<input onChange={this.handleChangeSecret} placeholder="Secret Value" value={this.props.secret} type="text" />)
        } else if (this.props.type === 'multiline') {
            return (<textarea rows="4" cols="50" onChange={this.handleChangeSecret}>{this.props.secret}</textarea>)
        } else {
            return (<input onChange={this.handleChangeSecret} placeholder="Secret Value" value={this.props.secret} type="text" />)
        }
    }
}

SecretCreate.propTypes = {
    params: PropTypes.shape({
        path: PropTypes.string,
    }),
}

SecretCreate.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
