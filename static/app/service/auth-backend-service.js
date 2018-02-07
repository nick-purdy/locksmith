import AuthService from './auth-service'

export default class AuthBackendService {

    static list(callback) {
        // $.ajax({
        //     url: "/v1/sys/auth",
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

        fetch('/v1/sys/auth', {
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

    static enable(context, callback, type, description) {
        const mountParams = {
            type: type,
            description: description
        }

        $.ajax({
            url: "/v1/sys/auth/" + type,
            context: context,
            type: 'POST',
            headers: {
                "X-Vault-Token": globalLoginToken
            },
            data: JSON.stringify(mountParams),
            success: function(result) {
                callback.call(context, result)
            },
            error: function(e) {
                console.log(e);
                console.log(e.responseJSON.errors);
            },
        });
    }

    static read(context, callback, path) {
       $.ajax({
           url: "/v1/sys/auth/" + path + "/tune",
           context: context,
           type: 'GET',
           headers: {
               "X-Vault-Token": globalLoginToken
           },
           success: function(result) {
               callback.call(context, result)
           },
           error: function(e) {
               console.log(e);
               console.log(e.responseJSON.errors);
           },
       });
   }

    static tune(context, callback, path, default_lease_ttl, max_lease_ttl) {
       const tuneParams = {
           default_lease_ttl: default_lease_ttl,
           max_lease_ttl: max_lease_ttl
       }

       $.ajax({
           url: "/v1/sys/auth/" + path + "/tune",
           context: context,
           data: JSON.stringify(tuneParams),
           type: 'POST',
           headers: {
               "X-Vault-Token": globalLoginToken
           },
           success: function(result) {
               callback.call(context, result)
           },
           error: function(e) {
               console.log(e);
               console.log(e.responseJSON.errors);
           },
       });
    }

    static disable(context, callback, path) {
        $.ajax({
            url: "/v1/sys/auth/" + path,
            context: context,
            type: 'DELETE',
            headers: {
                "X-Vault-Token": globalLoginToken
            },
            success: function() {
                callback.call(context)
            },
            error: function(e) {
                console.log(e);
                console.log(e.responseJSON.errors);
            },
        });
    }
}