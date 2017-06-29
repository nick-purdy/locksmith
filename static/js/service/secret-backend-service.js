
class SecretBackendService {

    static list(context, callback) {
        $.ajax({
            url: "/v1/sys/mounts",
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

    static mount(context, callback, path, type, description, default_lease_ttl, max_lease_ttl, force_no_cache) {
        const mountParams = {
            type: type,
            description: description,
            config: {
                default_lease_ttl: default_lease_ttl,
                max_lease_ttl: max_lease_ttl,
                force_no_cache: force_no_cache
            }
        }

        $.ajax({
            url: "/v1/sys/mounts/" + path,
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
            url: "/v1/sys/mounts/" + path + "/tune",
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
            }
        });
    }

    static tune(context, callback, path, default_lease_ttl, max_lease_ttl) {
        const tuneParams = {
            default_lease_ttl: default_lease_ttl,
            max_lease_ttl: max_lease_ttl
        }

        $.ajax({
            url: "/v1/sys/mounts/" + path + "/tune",
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

    static unmount(context, callback, path) {
        $.ajax({
            url: "/v1/sys/mounts/" + path,
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