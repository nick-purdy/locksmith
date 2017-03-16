
class SecretList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentFolder: props.path.split("/")
        };
    }

    componentDidMount() {
        this.listSecrets()
    }

    listSecrets() {
        const path = "/v1/" + this.state.currentFolder.join("/") + "/"

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

    handleSecretExpansion(path, event) {
        let newPath = this.state.currentFolder
        newPath.push(path.replace("/", ""))
        this.setState({currentFolder: newPath})
        this.listSecrets()
    }


    handleSecretEdit(path, event) {
        this.props.onEditSecret(path)
    }


    handleBreadCrumb(path) {
        this.setState({currentFolder: path})
        this.listSecrets()
    }

    render() {
        let secrets = []

        if (this.state && this.state.data && this.state.data.keys) {
            for (let index in this.state.data.keys) {
                const path = this.state.data.keys[index]
                const fullPath = this.state.currentFolder.join("/") + "/" + path
                secrets.push(
                            <SecretsRow key={path} path={path} onClick={this.handleSecretExpansion.bind(this, path)} onEditClick={this.handleSecretEdit.bind(this, fullPath)} />
                            )
            }
        } else {
            secrets.push(
                        <tr>
                            <td>Loading...</td>
                            <td><a>view</a> &nbsp; <a>edit</a> &nbsp; <a>delete</a></td>
                        </tr>
                        )
        }

        return (
            <section className="container" id="secrets">
                <h5 className="title">Secrets</h5>
                <SecretsBreadCrumb currentFolder={this.state.currentFolder} onClick={this.handleBreadCrumb.bind(this)} />
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
            </section>
        )
    }
}

class SecretsBreadCrumb extends React.Component {
    render() {

        let folders = []

        let fullPath = []
        for (let index in this.props.currentFolder) {
            const folder = this.props.currentFolder[index]
            fullPath.push(folder)
            const breadCrumbPath = fullPath.slice(0)

            const innerParent = this;
            const testFunction = function() {
                innerParent.props.onClick.call(null, breadCrumbPath)
            }
            folders.push(
                        <span>&nbsp;<a onClick={testFunction}>{folder}</a>&nbsp;&#47;</span>
                        )
        }

        return (
            <p>
                <code> {folders} </code>
            </p>
        )
    }
}

class SecretsRow extends React.Component {
    render() {
        if (this.props.path.endsWith("/")) {
            return (
                    <tr>
                        <td><a onClick={this.props.onClick}>FOLDER: {this.props.path}</a></td>
                        <td><a>edit</a> &nbsp; <a>delete</a></td>
                    </tr>
            )
        } else {
            return (
                    <tr>
                        <td><a onClick={this.props.onEditClick}>FILE: {this.props.path}</a></td>
                        <td><a>edit</a> &nbsp; <a>delete</a></td>
                    </tr>
            )
        }
    }
}