
class AuditBackendService {

    static list(context, callback) {
        $.ajax({
            url: "/v1/sys/audit",
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

    static mount(context, callback, path, type, description, options) {
        const mountParams = {
            type: type,
            description: description,
            options: options
        }

        $.ajax({
            url: "/v1/sys/audit/" + path,
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

    static unmount(context, callback, path) {
        $.ajax({
            url: "/v1/sys/audit/" + path,
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