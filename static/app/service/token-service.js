import AuthService from './auth-service'

export default class TokenService {

    static list(callback) {
        // $.ajax({
        //     url: "/v1/auth/token/accessors",
        //     context: context,
        //     type: 'LIST',
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
        fetch('/v1/auth/token/accessors', {
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
            callback.call(null, result)
        })
    }

    static lookup(callback, tokenAccessor) {
        const lookupParams = {
            accessor: tokenAccessor
        }
        // $.ajax({
        //     url: "/v1/auth/token/lookup-accessor",
        //     context: context,
        //     type: 'POST',
        //     headers: {
        //         "X-Vault-Token": globalLoginToken
        //     },
        //     data: JSON.stringify(lookupParams),
        //     success: function(result) {
        //         callback.call(context, result)
        //     },
        //     error: function(e) {
        //         console.log(e);
        //         console.log(e.responseJSON.errors);
        //     },
        // });
        fetch('/v1/auth/token/lookup-accessor', {
            method: 'POST',
            headers: {
                "X-Vault-Token": AuthService.getInstance().getToken()
            },
            body: JSON.stringify(lookupParams)
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

    static create(callback, failCallback, params = {}) {
        const tokenParams = {
            id: "",
            policies: [],
            meta: [],
            no_parent: false,
            no_default_policy: false,
            renewable: true,
            ttl: "",
            explicit_max_ttl: "",
            display_name: "",
            num_uses: 0,
            period: ""
        }

        Object.assign(tokenParams, params)

        for (var propertyName in tokenParams) {
            if (tokenParams.hasOwnProperty(propertyName)) {
                if (tokenParams[propertyName] === "") {
                    console.log("Removing empty [default] value: " + propertyName)
                    delete tokenParams[propertyName]
                }
            }
        }

        // $.ajax({
        //     url: "/v1/auth/token/create " + name,
        //     context: context,
        //     type: 'POST',
        //     headers: {
        //         "X-Vault-Token": globalLoginToken
        //     },
        //     data: JSON.stringify(tokenParams),
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
        fetch('/v1/auth/token/create', {
            method: 'POST',
            headers: {
                "X-Vault-Token": AuthService.getInstance().getToken()
            },
            body: JSON.stringify(tokenParams)
        })
        .then(response => {
            responseOk = response.ok
            return response;
        })
        .then(response => {
            if (!responseOk) {
                return response.json()
            } else {
                return {}
            }
        })
        .then(json => {
            if (responseOk) {
                callback.call(null, json)
            } else {
                failCallback.call(null, json.errors)
            }
        })
    }

    static revoke(callback, accessor) {
        const revokeParams = {
            accessor: accessor
        }
        // $.ajax({
        //     url: "/v1/auth/token/revoke",
        //     context: context,
        //     type: 'POST',
        //     headers: {
        //         "X-Vault-Token": globalLoginToken
        //     },
        //     data: JSON.stringify(revokeParams),
        //     success: function() {
        //         callback.call(context)
        //     },
        //     error: function(e) {
        //         console.log(e);
        //         console.log(e.responseJSON.errors);
        //     },
        // });

        fetch('/v1/auth/token/revoke-accessor', {
            method: 'POST',
            headers: {
                "X-Vault-Token": AuthService.getInstance().getToken()
            },
            body: JSON.stringify(revokeParams)
        })
        .then(response => {
            callback.call(null)
        })
    }
}