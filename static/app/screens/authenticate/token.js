import React, {Component} from 'react';
import AuthenticationMechanism from './mechanism'
import AuthService from '../../../app/service/auth-service'
import Navigation from '../../../app/utils/navigation'

export default class AuthenticateToken extends Component {
    constructor(props) {
        super(props)

        this.state = {
            token: "",
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    handleError(e) {
        this.setState({errors: e.errors})
    }

    handleChange(event) {
        this.setState({token: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault()

        this.setState({errors: "", success: ""})
        // this.setState({errors: "", success: ""})
        // $.ajax({
        //     url: '/v1/sys/mounts',
        //     context: this,
        //     headers: {
        //         "X-Vault-Token": this.state.token
        //     },
        //     type: 'GET',
        //     success: function(result) {
        //         console.info(result)
        //         rootPage.setGlobalLoginToken(this.state.token)
        //         this.props.onAuthenticated()
        //     },
        //     error: function(e) {
        //         console.log(e);
        //         this.setState({errors: e.responseJSON.errors});
        //     },
        // });
        AuthService.getInstance().validateToken(
            () => this.context.router.push({pathname: '/secret/list/secret'}),
            this.handleError,
            this.state.token
        )
    }

    render() {
        return (
            <main className="wrapper">
                <Navigation authenticated={false} />
                <section className="container" id="authenticate-token">
                    <form onSubmit={this.handleSubmit}>
                        <AuthenticationMechanism mechanism={'token'} />
                        <label>Token</label>
                        <div className="error">{this.state.errors}</div>
                        <div className="success">{this.state.success}</div>
                        <input value={this.state.token} onChange={this.handleChange} placeholder="Your token. Input will be hidden..." id="tokenField" type="password" />
                        <input className="button-primary" value="Login" type="submit" />
                    </form>
                </section>
            </main>
        )
    }
}

AuthenticateToken.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
