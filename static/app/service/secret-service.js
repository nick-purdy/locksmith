import AuthService from './auth-service'

export default class SecretService {

    static create(callback, path, values) {
        // $.ajax({
        //     url: path,
        //     context: this,
        //     type: 'POST',
        //     headers: {
        //         "X-Vault-Token": globalLoginToken
        //     },
        //     data: JSON.stringify(requestData),
        //     success: function() {
        //         console.info("Successfully saved")
        //         this.handleCancel()
        //     },
        //     error: function(e) {
        //         console.log(e);
        //         console.log(e.responseJSON.errors);
        //         this.setState({errors: e.responseJSON.errors});
        //     },
        // });
        
        fetch('/v1/' + path, {
            method: 'PUT',
            headers: {
                "X-Vault-Token": AuthService.getInstance().getToken()
            },
            body: JSON.stringify(values)
        })
        .then(response => {
            if(response.ok) {
                callback.call(null)
                return response
            }
            alert(response.json())
            throw new Error('Validation error: ')
        })
    }

    static get(callback, path) {
        // $.ajax({
        //     url: '/v1/' + path,
        //     context: this,
        //     headers: {
        //         "X-Vault-Token": globalLoginToken
        //     },
        //     type: 'GET',
        //     success: function(result) {
        //         console.info(result)
        //         this.setState(result)
        //     },
        //     error: function(e) {
        //         console.log(e);
        //         console.log(e.responseJSON.errors);
        //         this.setState({errors: e.responseJSON.errors});
        //     },
        // });
        fetch('/v1/' + path, {
            headers: {
                "X-Vault-Token": AuthService.getInstance().getToken()
            }
        })
        .then(response => {
            if(response.ok) {
                return response
            }
            // failure_callback.call(null, {errors: 'Incorrect login'})
            console.log("error:", response)
        })
        .then(response => response.json())
        .then(result => {
            callback.call(null, result)
        })
    }

    static list(callback, path) {
        // const path = "/v1/" + newPath.join("/") + "/"
        // $.ajax({
        //     url: path,
        //     context: this,
        //     headers: {
        //         "X-Vault-Token": globalLoginToken
        //     },
        //     type: 'LIST',
        //     success: function(result) {
        //         console.info(result)
        //         this.sortSecrets(result)
        //         this.setState(result)
        //     },
        //     error: function(e) {
        //         console.log(e);
        //         console.log(e.responseJSON.errors);
        //         this.setState({errors: e.responseJSON.errors});
        //     },
        // });
        fetch('/v1/' + path, {
            method: 'LIST',
            headers: {
                "X-Vault-Token": AuthService.getInstance().getToken()
            }
        })
        .then(response => {
            if(response.ok) {
                return response
            }
            // failure_callback.call(null, {errors: 'Incorrect login'})
            console.log("error:", response)
        })
        .then(response => response.json())
        .then(result => {
            this.sort(result)
            callback.call(null, result)
        })
    }

    static update(callback, path, values) {
        // $.ajax({
        //     url: path,
        //     context: this,
        //     type: 'POST',
        //     headers: {
        //         "X-Vault-Token": globalLoginToken
        //     },
        //     data: JSON.stringify(requestData),
        //     success: function() {
        //         console.info("Successfully saved")
        //         this.handleCancel()
        //     },
        //     error: function(e) {
        //         console.log(e);
        //         console.log(e.responseJSON.errors);
        //         this.setState({errors: e.responseJSON.errors});
        //     },
        // });
        
        fetch('/v1/' + path, {
            method: 'PUT',
            headers: {
                "X-Vault-Token": AuthService.getInstance().getToken()
            },
            body: JSON.stringify(values)
        })
        .then(response => {
            if(response.ok) {
                callback.call(null)
                return response
            }
            alert(response.json())
            throw new Error('Validation error: ')
        })
    }

    static delete(callback, path) {
        // $.ajax({
        //     url: path,
        //     context: this,
        //     headers: {
        //         "X-Vault-Token": globalLoginToken
        //     },
        //     type: 'DELETE',
        //     success: function() {
        //         this.listSecrets(this.state.currentFolder)
        //     },
        //     error: function(e) {
        //         console.log(e);
        //         console.log(e.responseJSON.errors);
        //     },
        // });
        fetch("/v1/" + path, {
            method: 'DELETE',
            headers: {
                "X-Vault-Token": AuthService.getInstance().getToken()
            }
        })
        .then(response => {
            if(response.ok) {
                callback.call(null)
                return
            }
            // failure_callback.call(null, {errors: 'Incorrect login'})
            console.log("error:", response)
        })
    }

    static sort(secrets) {
        secrets.data.keys.sort(
            function compare(a, b) {
                if (a.endsWith("/") && !b.endsWith("/")) {
                    return -1
                } else if (b.endsWith("/") && !a.endsWith("/")) {
                    return 1
                } else {
                    return (a > b) ? 1 : -1
                }
            }
        )
    }
}