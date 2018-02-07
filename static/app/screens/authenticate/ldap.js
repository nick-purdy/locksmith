import React, {Component} from 'react';
import AuthenticationMechanism from './mechanism'
import AuthService from '../../../app/service/auth-service'
import Navigation from '../../../app/utils/navigation'

export default class AuthenticateLdap extends Component {
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

        // const ldapParams = {
        //     password: this.state.password
        // }

        // this.setState({errors: "", success: ""})
        // $.ajax({
        //     url: '/v1/auth/ldap/login/' + this.state.username,
        //     context: this,
        //     data: JSON.stringify(ldapParams),
        //     type: 'POST',
        //     success: function(result) {
        //         console.info(result)
        //         rootPage.setGlobalLoginToken(result["auth"]["client_token"])
        //         this.props.onAuthenticated()
        //     },
        //     error: function(e) {
        //         console.log(e);
        //         this.setState({errors: e.responseJSON.errors});
        //     },
        // });
        AuthService.getInstance().validateLdap(
            () => this.context.router.push({pathname: '/secret/'}),
            () => alert(this.setState({errors: e.responseJSON.errors})),
            this.state.username,
            this.state.password
        )
    }

/*
    render() {
        let mechanism = (<AuthenticateToken onAuthenticated={this.handleAuthenticated} />)
        if (this.state.mechanism === "ldap") {
            mechanism = (<AuthenticateLdap onAuthenticated={this.handleAuthenticated} />)
        }

        return (
            <section className="container" id="authenticate">
                <h5 className="title">Authenticate</h5>
                <label>Authentication mechanism</label>
                <select onChange={this.handleChange} value={this.state.mechanism}>
                    <option value="token">Token</option>
                    <option value="ldap">LDAP</option>
                </select>

                {mechanism}
            </section>
        )
    }
*/
    render() {
        return (
            <main className="wrapper">
                <Navigation authenticated={false} />
                <section className="container" id="authenticate-ldap">
                    <form onSubmit={this.handleSubmit}>
                        <AuthenticationMechanism mechanism={'ldap'} />
                        <label>Username</label>
                        <div className="error">{this.state.errors}</div>
                        <div className="success">{this.state.success}</div>
                        <input value={this.state.token} onChange={this.handleChangeUsername} placeholder="Username" id="tokenField" type="text" />
                        <label>Password</label>
                        <input value={this.state.token} onChange={this.handleChangePassword} placeholder="Password" id="tokenField" type="password" />
                        <input className="button-primary" value="Login" type="submit" />
                    </form>
                </section>
            </main>
        )
    }
}

AuthenticateLdap.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
