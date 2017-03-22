class Authenticate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mechanism: "token"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAuthenticated = this.handleAuthenticated.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value)
        this.setState({mechanism: event.target.value})
    }

    handleAuthenticated() {
        rootPage.changeToMainPage.call(rootPage, "secret")
    }

    render() {
        return (
            <section className="container" id="authenticate">
                <h5 className="title">Authenticate</h5>
                <label>Authentication mechanism</label>
                <select onChange={this.handleChange} value={this.state.mechanism}>
                    <option value="token">Token</option>
                    <option value="ldap">LDAP</option>
                </select>

                <AuthenticateToken onAuthenticated={this.handleAuthenticated} />
            </section>
        )
    }
}