
class Unseal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sealed: props.sealed,
            progress: props.progress,
            t: props.threshold,
            key: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({errors: "", success: ""});

        const requestData = { key: this.state.key }

        $.ajax({
            url: '/v1/sys/unseal',
            context: this,
            data: JSON.stringify(requestData),
            type: 'PUT',
            success: function(result) {
                console.info(result)
                this.setState(result)
                this.setState({
                    success: "Successfully entered unseal token",
                    key: ""
                })

                if (!result.sealed) {
                    rootPage.changeToMainPage.call(rootPage, "authenticate")
                }
            },
            error: function(e) {
                console.log(e);
                console.log(e.responseJSON.errors);
                this.setState({errors: e.responseJSON.errors});
            },
        });
    }

    handleReset(e) {
        e.preventDefault();
        this.setState({errors: "", success: ""});

        const requestData = { reset: true }

        $.ajax({
            url: '/v1/sys/unseal',
            context: this,
            data: JSON.stringify(requestData),
            type: 'PUT',
            success: function(result) {
                console.info(result)
                this.setState(result)
                this.setState({
                    success: "Successfully reset unseal attempt",
                    key: ""
                })
            },
            error: function(e) {
                console.log(e);
                console.log(e.responseJSON.errors);
                this.setState({errors: e.responseJSON.errors});
            },
        });
    }

    handleChange(event) {
        this.setState({key: event.target.value});
    }

    render() {
        let currentProgress = this.state.t
        if (this.state.sealed) {
            currentProgress = this.state.progress
        }

        return (
            <section className="container" id="unseal">
                <h5 className="title">Unseal</h5>

                <blockquote>
                    <p><em>Vault is currently sealed. To unseal please enter your unseal tokens.</em></p>
                </blockquote>

                <form onSubmit={this.handleSubmit}>
                    <label>Token</label>
                    <div className="error">{this.state.errors}</div>
                    <div className="success">{this.state.success}</div>
                    <input value={this.state.key} onChange={this.handleChange} placeholder="Your Unseal Token. Input will be hidden..." id="unsealTokenField" type="password" />
                    <input className="button-primary" value="Unseal" type="submit" />
                    <button className="button button-outline float-right" onClick={this.handleReset}>Reset</button>
                </form>

                <label>Progress</label>
                <Progress progress={currentProgress} total={this.state.t} />
            </section>
        )
    }
}

