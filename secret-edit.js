class SecretEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};

        this.handleAddNewSecretRow = this.handleAddNewSecretRow.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleUpdateSecretInput = this.handleUpdateSecretInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRemoveSecretRow = this.handleRemoveSecretRow.bind(this);
    }

    componentDidMount() {
        this.viewSecret()
    }

    viewSecret() {
        const path = "/v1/" + this.props.path

        $.ajax({
            url: path,
            context: this,
            headers: {
                "X-Vault-Token": globalLoginToken
            },
            type: 'GET',
            success: function(result) {
                console.info(result)
                this.setState(result)
            },
            error: function(e) {
                console.log(e);
                console.log(e.responseJSON.errors);
                this.setState({errors: e.responseJSON.errors});
            },
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const path = "/v1/" + this.props.path
        const requestData = this.state.data

        $.ajax({
            url: path,
            context: this,
            type: 'POST',
            headers: {
                "X-Vault-Token": globalLoginToken
            },
            data: JSON.stringify(requestData),
            success: function() {
                console.info("Successfully saved")
                this.handleCancel()
            },
            error: function(e) {
                console.log(e);
                console.log(e.responseJSON.errors);
                this.setState({errors: e.responseJSON.errors});
            },
        });
    }

    handleAddNewSecretRow() {
        let newData = this.state.data;
        newData["newSecretRow"] = "newSecretValue"
        this.setState({data: newData})
    }

    handleCancel() {
        let parentPath = this.props.path.substring(0, this.props.path.lastIndexOf("/"));
        this.props.onListSecret(parentPath)
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
        this.props.onListSecret(path.join("/"))
    }

    render() {
        let form = (<div>Loading...</div>)
        let rows = []

        if (this.state.data) {
            for (var propertyName in this.state.data) {
                if (this.state.data.hasOwnProperty(propertyName)) {
                    rows.push(
                        <SecretEditRow key={propertyName + this.state.data[propertyName]} name={propertyName} secret={this.state.data[propertyName]} onUpdate={this.handleUpdateSecretInput} onRemove={this.handleRemoveSecretRow} />
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
                        <input className="button-primary" value="Save" type="submit" />
                        <button className="button button-outline float-right" onClick={this.handleCancel}>Cancel</button>
                    </fieldset>
                </form>
            )
        }

        return (
            <section className="container" id="secrets">
                <h5 className="title">Edit Secret</h5>
                <BreadCrumb folders={this.props.path.split("/")} onClick={this.handleBreadCrumb.bind(this)} />
                {form}
            </section>
        )
    }
}

class SecretEditRow extends React.Component {
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
