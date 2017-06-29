class AuthenticateToken extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            token: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({token: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({errors: "", success: ""})
        $.ajax({
            url: '/v1/sys/mounts',
            context: this,
            headers: {
                "X-Vault-Token": this.state.token
            },
            type: 'GET',
            success: function(result) {
                console.info(result)
                rootPage.setGlobalLoginToken(this.state.token)
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
                <label>Token</label>
                <div className="error">{this.state.errors}</div>
                <div className="success">{this.state.success}</div>
                <input value={this.state.token} onChange={this.handleChange} placeholder="Your token. Input will be hidden..." id="tokenField" type="password" />
                <input className="button-primary" value="Login" type="submit" />
            </form>
        )
    }
}
