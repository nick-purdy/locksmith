
class Secret extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            view: "list",
            path: "secret"
        };

        this.handleEditSecret = this.handleEditSecret.bind(this)
    }

    handleEditSecret(path) {
        this.setState({
            view: "edit",
            path: "secret/hello/world"
        })
    }

    render() {
        if (this.state.view === "list") {
            return (
                <SecretList path={this.state.path} onEditSecret={this.handleEditSecret} />
            )
        } else {
            return (
                <SecretEdit path={this.state.path} onEditSecret={this.handleEditSecret} />
            )
        }
    }
}
