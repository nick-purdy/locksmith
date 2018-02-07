import AuthService from './auth-service'

export default class PolicyService {

    static list(callback) {
        // $.ajax({
        //     url: "/v1/sys/policy",
        //     context: context,
        //     type: 'GET',
        //     headers: {
        //         "X-Vault-Token": globalLoginToken
        //     },
        //     success: function(result) {
        //         callback.call(context, result)
        //     },
        //     error: function(e) {
        //         console.log(e);
        //         console.log(e.responseJSON.errors);
        //     },
        // });
        fetch('/v1/sys/policy', {
            method: 'GET',
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

    static read(callback, policy) {
        // $.ajax({
        //     url: "/v1/sys/policy/" + policy,
        //     context: context,
        //     type: 'GET',
        //     headers: {
        //         "X-Vault-Token": globalLoginToken
        //     },
        //     success: function(result) {
        //         callback.call(context, result)
        //     },
        //     error: function(e) {
        //         console.log(e);
        //         console.log(e.responseJSON.errors);
        //     },
        // });
        fetch('/v1/sys/policy/' + policy, {
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

    static createOrUpdate(callback, failCallback, name, rules) {
        const policyParams = {
            rules: rules
        }

        // $.ajax({
        //     url: "/v1/sys/policy/" + name,
        //     context: context,
        //     type: 'POST',
        //     headers: {
        //         "X-Vault-Token": globalLoginToken
        //     },
        //     data: JSON.stringify(policyParams),
        //     success: function(result) {
        //         callback.call(context, result)
        //     },
        //     error: function(e) {
        //         console.log(e)
        //         console.log(e.responseJSON.errors)
        //         failCallback.call(context, e.responseJSON.errors)
        //     },
        // });

        let responseOk = null;
        fetch('/v1/sys/policy/' + name, {
            method: 'POST',
            headers: {
                "X-Vault-Token": AuthService.getInstance().getToken()
            },
            body: JSON.stringify(policyParams)
        })
        .then(response => {
            responseOk = response.ok
            return response;
        })
        .then(response => response.json())
        .then(json => {
            if (responseOk) {
                callback.call(null, json)
            } else {
                failCallback.call(null, json.errors)
            }
        })
    }

    static delete(context, callback, policy) {
        // $.ajax({
        //     url: "/v1/sys/policy/" + policy,
        //     context: context,
        //     type: 'DELETE',
        //     headers: {
        //         "X-Vault-Token": globalLoginToken
        //     },
        //     success: function() {
        //         callback.call(context)
        //     },
        //     error: function(e) {
        //         console.log(e);
        //         console.log(e.responseJSON.errors);
        //     },
        // });
        fetch("/v1/sys/policy/" + policy, {
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
}