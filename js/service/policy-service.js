
class PolicyService {

    static list(context, callback) {
        $.ajax({
            url: "/v1/sys/policy",
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

    static read(context, callback, policy) {
        $.ajax({
            url: "/v1/sys/policy/" + policy,
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

    static createOrUpdate(context, callback, failCallback, name, rules) {
        const policyParams = {
            rules: rules
        }

        $.ajax({
            url: "/v1/sys/policy/" + name,
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

    static remove(context, callback, policy) {
        $.ajax({
            url: "/v1/sys/policy/" + policy,
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