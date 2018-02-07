import AuthService from './auth-service'

export default class AuditBackendService {

    static list(callback) {
        // $.ajax({
        //     url: "/v1/sys/audit",
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

        fetch('/v1/sys/audit', {
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

    static mount(callback, failCallback, path, type, description, options) {
        const mountParams = {
            type: type,
            description: description,
            options: options
        }

        // $.ajax({
        //     url: "/v1/sys/audit/" + path,
        //     context: context,
        //     type: 'POST',
        //     headers: {
        //         "X-Vault-Token": globalLoginToken
        //     },
        //     data: JSON.stringify(mountParams),
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
        fetch('/v1/sys/audit/' + path, {
            method: 'POST',
            headers: {
                "X-Vault-Token": AuthService.getInstance().getToken()
            },
            body: JSON.stringify(mountParams)
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

    static unmount(callback, path) {
        // $.ajax({
        //     url: "/v1/sys/audit/" + path,
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

        fetch('/v1/sys/audit/' + path, {
            method: 'DELETE',
            headers: {
                "X-Vault-Token": AuthService.getInstance().getToken()
            }
        })
        .then(response => {
            callback.call(null)
        })
    }
}