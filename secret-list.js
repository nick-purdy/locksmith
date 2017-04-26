
class SecretList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentFolder: props.path.split("/")
        };

        this.handleSecretCreate = this.handleSecretCreate.bind(this);
    }

    componentDidMount() {
        this.listSecrets(this.state.currentFolder)
    }

    listSecrets(newPath) {
        const path = "/v1/" + newPath.join("/") + "/"

        $.ajax({
            url: path,
            context: this,
            headers: {
                "X-Vault-Token": globalLoginToken
            },
            type: 'LIST',
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

    deleteSecrets(deletePath) {
        const path = "/v1/" + deletePath

        $.ajax({
            url: path,
            context: this,
            headers: {
                "X-Vault-Token": globalLoginToken
            },
            type: 'DELETE',
            success: function() {
                this.listSecrets(this.state.currentFolder)
            },
            error: function(e) {
                console.log(e);
                console.log(e.responseJSON.errors);
            },
        });
    }

    handleSecretExpansion(path, event) {
        let newPath = this.state.currentFolder
        newPath.push(path.replace("/", ""))
        this.setState({currentFolder: newPath})
        this.listSecrets(newPath)
    }

    handleSecretEdit(path, event) {
        this.props.onEditSecret(path, false)
    }

    handleSecretDelete(path, event) {
        this.deleteSecrets(path)
    }

    handleBreadCrumb(path) {
        this.setState({currentFolder: path})
        this.listSecrets(path)
    }

    handleSecretCreate() {
        this.props.onEditSecret(this.state.currentFolder.join("/"), true)
    }

    render() {
        let secrets = []

        if (this.state && this.state.data) {
            if (this.state.data.keys) {
                for (let index in this.state.data.keys) {
                    const path = this.state.data.keys[index]
                    const fullPath = this.state.currentFolder.join("/") + "/" + path
                    secrets.push(
                                <SecretsRow key={path} path={path} onClick={this.handleSecretExpansion.bind(this, path)} onEditClick={this.handleSecretEdit.bind(this, fullPath)} onDeleteClick={this.handleSecretDelete.bind(this, fullPath)} />
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
                            <td><a>view</a> &nbsp; <a>edit</a> &nbsp; <a>delete</a></td>
                        </tr>
                        )
        }

        return (
            <section className="container" id="secrets">
                <h5 className="title">Secrets</h5>
                <BreadCrumb folder="true" folders={this.state.currentFolder} onClick={this.handleBreadCrumb.bind(this)} />
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
                <div>
                    <a onClick={this.handleSecretCreate}>Create</a>
                </div>
            </section>
        )
    }
}

class SecretsRow extends React.Component {
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
                            <a onClick={this.props.onEditClick}>
                                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                <span>&nbsp;{this.props.path}</span>
                            </a>
                        </td>
                        <td><a onClick={this.confirmDelete}>delete</a></td>
                    </tr>
            )
        }
    }
}