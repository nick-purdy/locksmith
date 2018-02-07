
export default class AuthService {

    constructor() {
        this.token = ''
    }

    getToken() {
        return this.token
    }

    static getInstance() {
        return authService
    }

    validateLdap(success_callback, failure_callback, username, password) {
        const ldapParams = {
            password: password
        }

        fetch('/v1/auth/ldap/login/' + username, {
            method: 'POST',
            body: JSON.stringify(ldapParams)
        })
        .then(response => {
            if(response.ok) {
                return response
            }
            failure_callback.call()
        })
        .then(response => response.json())
        .then(result => {
            this.token = result["auth"]["client_token"]
            success_callback.call()
        });
    }

    validateToken(success_callback, failure_callback, token) {
/*
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
*/
        fetch('/v1/sys/mounts', {
            method: 'GET',
            headers: {
                "X-Vault-Token": token
            }
        })
        .then(response => {
            if(response.ok) {
                return response
            }
            failure_callback.call(null, {errors: 'Incorrect login'})
        })
        .then(response => response.json())
        .then(result => {
            this.token = token
            success_callback.call()
        });
    }
}

const authService = new AuthService();