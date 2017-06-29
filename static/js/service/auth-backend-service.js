
class AuthBackendService {

    static list(context, callback) {
        $.ajax({
            url: "/v1/sys/auth",
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