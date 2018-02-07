import AuthService from './auth-service'

export default class SealService {
    static seal(sealed_callback, incorrect_callback, key) {
        // $.ajax({
        //     url: '/v1/sys/seal',
        //     context: context,
        //     headers: {
        //         "X-Vault-Token": key
        //     },
        //     type: 'PUT',
        //     success: function(result) {
        //         console.info(result)
        //         sealed_callback.call(context, result)
        //     },
        //     error: function(e) {
        //         console.log(e);
        //         incorrect_callback.call(context, e.responseJSON.errors)
        //     },
        // });
        
        fetch("/v1/sys/seal", {
            method: 'PUT',
            headers: {
                "X-Vault-Token": key
            },
        })
        .then(response => {
            if(response.ok) {
                sealed_callback.call(null)
            }
            incorrect_callback.call(null, {errors: 'Failed to seal vault'})
        })
    }

    static unseal(unsealed_callback, incorrect_callback, key) {
        const requestData = { key: key }

        // $.ajax({
        //     url: '/v1/sys/unseal',
        //     context: context,
        //     data: JSON.stringify(requestData),
        //     type: 'PUT',
        //     success: function(result) {
        //         unsealed_callback.call(context, result)
        //     },
        //     error: function(e) {
        //         incorrect_callback.call(context, e.responseJSON.errors)
        //     },
        // });

        fetch("/v1/sys/unseal", {
            method: 'PUT',
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if(response.ok) {
                return response
            }
            alert(response.json())
            throw new Error('Validation error: ')
        })
        .then(response => response.json())
        .then(result => {
            unsealed_callback.call(null, result)
        });
    }

    static reset(reset_callback, incorrect_callback) {
        const requestData = { reset: true }

        // $.ajax({
        //     url: '/v1/sys/unseal',
        //     context: context,
        //     data: JSON.stringify(requestData),
        //     type: 'PUT',
        //     success: function(result) {
        //         reset_callback.call(context, result)
        //     },
        //     error: function(e) {
        //         incorrect_callback.call(context, e.responseJSON.errors)
        //     },
        // });
        
        fetch("/v1/sys/unseal", {
            method: 'PUT',
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if(response.ok) {
                reset_callback.call(null)
            }
            incorrect_callback.call(null, {errors: 'Failed to seal vault'})
        })
    }
}