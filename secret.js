
class Secret extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            currentFolder: ["secret"]
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
        alert("Editing: " + path + ", " + this.state.currentFolder)

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
                secrets.push(
                            <SecretsRow key={path} path={path} onClick={this.handleSecretExpansion.bind(this, path)} onEditClick={this.handleSecretEdit.bind(this, path)} />
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
