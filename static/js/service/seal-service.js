
class SealService {
    static seal(context, sealed_callback, incorrect_callback, key) {
        $.ajax({
            url: '/v1/sys/seal',
            context: context,
            headers: {
                "X-Vault-Token": key
            },
            type: 'PUT',
            success: function(result) {
                console.info(result)
                sealed_callback.call(context, result)
            },
            error: function(e) {
                console.log(e);
                incorrect_callback.call(context, e.responseJSON.errors)
            },
        });
    }

    static unseal(context, unsealed_callback, incorrect_callback, key) {
        const requestData = { key: key }

        $.ajax({
            url: '/v1/sys/unseal',
            context: context,
            data: JSON.stringify(requestData),
            type: 'PUT',
            success: function(result) {
                unsealed_callback.call(context, result)
            },
            error: function(e) {
                incorrect_callback.call(context, e.responseJSON.errors)
            },
        });
    }

    static reset(context, reset_callback, incorrect_callback) {
        const requestData = { reset: true }

        $.ajax({
            url: '/v1/sys/unseal',
            context: context,
            data: JSON.stringify(requestData),
            type: 'PUT',
            success: function(result) {
                reset_callback.call(context, result)
            },
            error: function(e) {
                incorrect_callback.call(context, e.responseJSON.errors)
            },
        });
    }
}