
class Secret extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            view: "list",
            path: "secret"
        };

        this.handleEditSecret = this.handleEditSecret.bind(this)
    }

    handleEditSecret(path, event) {
        this.setState({
            view: "edit",
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
                <SecretEdit path={this.state.path} />
            )
        }
    }
}
