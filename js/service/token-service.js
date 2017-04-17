
class TokenService {

    static list(context, callback) {
        $.ajax({
            url: "/v1/auth/token/accessors",
            context: context,
            type: 'LIST',
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

    static lookup(context, callback, token) {
        // TODO: This doesnt appear to match the documentation
        const lookupParams = {
            token: token
        }
        $.ajax({
            url: "/v1/auth/token/lookup",
            context: context,
            type: 'GET',
            headers: {
                "X-Vault-Token": globalLoginToken
            },
            data: JSON.stringify(lookupParams),
            success: function(result) {
                callback.call(context, result)
            },
            error: function(e) {
                console.log(e);
                console.log(e.responseJSON.errors);
            },
        });
    }

    static create(context, callback, failCallback, name, rules) {
        const policyParams = {
            rules: rules
        }

        $.ajax({
            url: "/v1/auth/token/create " + name,
            context: context,
            type: 'POST',
            headers: {
                "X-Vault-Token": globalLoginToken
            },
            data: JSON.stringify(policyParams),
            success: function(result) {
                callback.call(context, result)
            },
            error: function(e) {
                console.log(e)
                console.log(e.responseJSON.errors)
                failCallback.call(context, e.responseJSON.errors)
            },
        });
    }

    static revoke(context, callback, token) {
        const revokeParams = {
            token: token
        }
        $.ajax({
            url: "/v1/auth/token/revoke",
            context: context,
            type: 'POST',
            headers: {
                "X-Vault-Token": globalLoginToken
            },
            data: JSON.stringify(revokeParams),
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