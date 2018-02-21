import React, {Component, PropTypes} from 'react';
import AuthService from '../../../app/service/auth-service'
import Navigation from '../../../app/utils/navigation'
import BreadCrumb from '../../../app/utils/bread-crumbs'
import SecretService from '../../service/secret-service';

export default class SecretUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            path: this.props.params.path.split('.').join('/')
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
        console.log(result)

        this.setState(result)
    }

    handleSubmit(e) {
        e.preventDefault();
        SecretService.update(this.handleCancel, this.state.path, this.state.data)
    }

    handleAddNewSecretRow() {
        let newData = this.state.data;
        newData["newSecretRow"] = "newSecretValue"
        this.setState({data: newData})
    }

    handleCancel() {
        const folder = this.props.params.path.substring(0, this.props.params.path.lastIndexOf("."));
        this.context.router.push({pathname: '/secret/list/' + folder})
    }

    handleUpdateSecretInput(originalName, name, secret) {
        let newData = {}

        for (var propertyName in this.state.data) {
            if (this.state.data.hasOwnProperty(propertyName)) {
                if (propertyName === originalName) {
                    newData[name] = secret
                } else {
                    newData[propertyName] = this.state.data[propertyName]
                }
            }
        }

        this.setState({data: newData})
    }

    handleRemoveSecretRow(name) {
        delete this.state.data[name]
        this.forceUpdate()
    }

    handleBreadCrumb(path) {
        this.context.router.push({pathname: '/secret/list/' + path.join(".")})
    }

    render() {
        let form = (<div>Loading...</div>)
        let rows = []

        if (this.state.data) {
            for (var propertyName in this.state.data) {
                if (this.state.data.hasOwnProperty(propertyName)) {
                    rows.push(
                        <SecretUpdateRow key={propertyName + this.state.data[propertyName]} name={propertyName} secret={this.state.data[propertyName]} onUpdate={this.handleUpdateSecretInput} onRemove={this.handleRemoveSecretRow} />
                    )
                }
            }

            form = (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <div className="container">
                            {rows}
                            <p><a onClick={this.handleAddNewSecretRow}>Add New</a></p>
                        </div>
                        <button className="button button-outline" onClick={this.handleCancel}>Cancel</button>
                        <input className="button-primary float-right" value="Save" type="submit" />
                    </fieldset>
                </form>
            )
        }

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
        this.state = {
            originalName: this.props.name,
            name: this.props.name,
            secret: this.props.secret,
            changed: false
        };
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeSecret = this.handleChangeSecret.bind(this)
        this.handleOnBlur = this.handleOnBlur.bind(this)
        this.handleOnRemove = this.handleOnRemove.bind(this)
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleChangeSecret(event) {
        this.setState({secret: event.target.value});
    }

    handleOnBlur(event) {
        this.props.onUpdate.call(null, this.state.originalName, this.state.name, this.state.secret)
    }

    handleOnRemove(e) {
        e.preventDefault();
        this.props.onRemove.call(null, this.state.originalName)
    }

    render() {
        return (
            <div className="row">
                <div className="column"><input onBlur={this.handleOnBlur} onChange={this.handleChangeName} placeholder="Secret Name" value={this.state.name} type="text" /></div>
                <div className="column"><input onBlur={this.handleOnBlur} onChange={this.handleChangeSecret} placeholder="Secret Value" value={this.state.secret} type="text" /></div>
                <div className="column"><a onClick={this.handleOnRemove}>remove</a></div>
            </div>
        )
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
