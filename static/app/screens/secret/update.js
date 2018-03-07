import React, {Component, PropTypes} from 'react'
import RowDropdown from './row-dropdown'
import AuthService from '../../../app/service/auth-service'
import Navigation from '../../../app/utils/navigation'
import BreadCrumb from '../../../app/utils/bread-crumbs'
import SecretService from '../../service/secret-service'

export default class SecretUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            path: this.props.params.path.split('.').join('/'),
            incrementedId: 0,
            secrets: []
        }

        this.handleGetSecret = this.handleGetSecret.bind(this)
        this.handleAddNewSecretRow = this.handleAddNewSecretRow.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleUpdateSecretInput = this.handleUpdateSecretInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRemoveSecretRow = this.handleRemoveSecretRow.bind(this)
    }

    componentDidMount() {
        SecretService.get(this.handleGetSecret, this.state.path)
    }

    handleGetSecret(result) {
        let secrets = []
        let id = 0
        for (var propertyName in result.data) {
            if (result.data.hasOwnProperty(propertyName)) {
                let type = 'field'
                if (result.data[propertyName].includes('\n')) {
                    type = 'multiline'
                }
                secrets.push(
                    {id: id, key: propertyName, value: result.data[propertyName], type: type}
                )
            }
            id++
        }

        this.setState({secrets: secrets, incrementedId: id})
    }

    handleSubmit(e) {
        e.preventDefault()

        let data = {}
        for (let secret of this.state.secrets) {
            data[secret.key] = secret.value
        }

        SecretService.update(this.handleCancel, this.state.path, data)
    }

    handleAddNewSecretRow(type) {
        const id = this.state.incrementedId
        this.setState({incrementedId: id + 1})
        this.state.secrets.push({id: id, key: 'key', value: 'value', type: type})
    }

    handleCancel() {
        const folder = this.props.params.path.substring(0, this.props.params.path.lastIndexOf("."));
        this.context.router.push({pathname: '/secret/list/' + folder})
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
        this.context.router.push({pathname: '/secret/list/' + path.join(".")})
    }

    render() {
        let form = (<div>Loading...</div>)

        let rows = []

        for (let value of this.state.secrets) {
            rows.push(
                <SecretUpdateRow key={value.id} id={value.id} name={value.key} secret={value.value} type={value.type} onUpdate={this.handleUpdateSecretInput} onRemove={this.handleRemoveSecretRow} />
            )
        }

        form = (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <div className="container">
                        {rows}
                        <RowDropdown onAdd={this.handleAddNewSecretRow} />
                    </div>
                    <button className="button button-outline" onClick={this.handleCancel}>Cancel</button>
                    <input className="button-primary float-right" value="Save" type="submit" />
                </fieldset>
            </form>
        )

        return (
            <main className="wrapper">
                <Navigation authenticated={true} />
                <section className="container" id="secret-update">
                    <h5 className="title">Edit Secret</h5>
                    <BreadCrumb folders={(this.props.params.path).split(".")} onClick={this.handleBreadCrumb.bind(this)} />
                    {form}
                </section>
            </main>
        )
    }
}

class SecretUpdateRow extends Component {
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

SecretUpdate.propTypes = {
    params: PropTypes.shape({
        path: PropTypes.string,
    }),
}

SecretUpdate.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
