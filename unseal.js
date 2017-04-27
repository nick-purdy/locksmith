
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

    successfulUnsealToken(result) {
        this.setState(result)
        this.setState({
            success: "Successfully entered unseal token",
            key: ""
        })

        if (!result.sealed) {
            rootPage.changeToMainPage.call(rootPage, "authenticate")
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({errors: "", success: ""});

        SealService.unseal(
            this,
            this.successfulUnsealToken,
            function(errors) { this.setState({errors: errors}); },
            this.state.key
        )
    }

    handleReset(e) {
        e.preventDefault();
        this.setState({errors: "", success: ""});

        SealService.reset(
            this,
            function(result) {
                this.setState(result)
                this.setState({
                    success: "Successfully reset unseal attempt",
                    key: ""
                })

            },
            function(errors) { this.setState({errors: errors}); },
            this.state.key
        )
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
                    <button className="button button-outline float-right" onClick={this.handleReset}>Reset</button>
                    <input className="button-primary" value="Unseal" type="submit" />
                </form>

                <label>Progress</label>
                <Progress progress={currentProgress} total={this.state.t} />
            </section>
        )
    }
}

