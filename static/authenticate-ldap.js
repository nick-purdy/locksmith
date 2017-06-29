class AuthenticateLdap extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
        }

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        const ldapParams = {
            password: this.state.password
        }

        this.setState({errors: "", success: ""})
        $.ajax({
            url: '/v1/auth/ldap/login/' + this.state.username,
            context: this,
            data: JSON.stringify(ldapParams),
            type: 'POST',
            success: function(result) {
                console.info(result)
                rootPage.setGlobalLoginToken(result["auth"]["client_token"])
                this.props.onAuthenticated()
            },
            error: function(e) {
                console.log(e);
                this.setState({errors: e.responseJSON.errors});
            },
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Username</label>
                <div className="error">{this.state.errors}</div>
                <div className="success">{this.state.success}</div>
                <input value={this.state.token} onChange={this.handleChangeUsername} placeholder="Username" id="tokenField" type="text" />
                <label>Password</label>
                <input value={this.state.token} onChange={this.handleChangePassword} placeholder="Password" id="tokenField" type="password" />
                <input className="button-primary" value="Login" type="submit" />
            </form>
        )
    }
}
