
class Secret extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            view: "list",
            path: "secret"
        };

        this.handleEditSecret = this.handleEditSecret.bind(this)
        this.handleListSecrets = this.handleListSecrets.bind(this)
    }

    handleEditSecret(path, newSecret) {
        this.setState({
            view: "edit",
            path: path,
            newSecret: newSecret
        })
    }

    handleListSecrets(path) {
        this.setState({
            view: "list",
            path: path
        })
    }

    render() {
        if (this.state.view === "list") {
            return (
                <SecretList path={this.state.path} onEditSecret={this.handleEditSecret} />
            )
        } else {
            return (
                <SecretEdit path={this.state.path} onListSecret={this.handleListSecrets} newSecret={this.state.newSecret} />
            )
        }
    }
}
