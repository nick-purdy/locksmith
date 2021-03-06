export default class Status {
    constructor() {
        this.result = {}
        this.timberId

        this.watchers = []
        this.startWatching()

        this.registerSealStatusWatcher = this.registerSealStatusWatcher.bind(this)
    }

    static getInstance() {
        return status
    }

    startWatching() {
        this.timerId = setInterval(
            () => this.checkSealStatus(),
            10000
        );

        this.checkSealStatus();
    }

    registerSealStatusWatcher(context, callback) {
        this.watchers.push({context: context, callback: callback})

        console.log(this.result)
        if (this.result.n) {
            callback.call(context, this.result)
        }
    }

    deregisterSealStatusWatcher(context) {
        for (let index in this.watchers) {
            if (context === this.watchers[index].context) {
                delete this.watchers[index]
                return
            }
        }
    }

    checkSealStatus() {
        // $.ajax({
        //     url: "/v1/sys/seal-status",
        //     context: this,
        //     type: 'GET',
        //     success: function(result) {
        //     },
        //     error: function(e) {
        //         console.log(e);
        //         console.log(e.responseJSON.errors);
        //     },
        // });
        fetch("/v1/sys/seal-status")
        .then(response => response.json())
        .then(result => {
            this.result = result
            for (let index in this.watchers) {
                this.watchers[index].callback.call(this.watchers[index].context, result)
            }
        });
    }
}

const status = new Status();
status.startWatching()
