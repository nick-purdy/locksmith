
class Seal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sealed: false,
            key: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({key: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        SealService.seal(
            this,
            function(result) {
                this.setState(result)
                rootPage.changeToMainPage.call(rootPage, "unseal")
            },
            function(errors) { this.setState({errors: errors}); },
            this.state.key
        )
    }

    render() {
        return (
            <section className="container" id="seal">
                <h5 className="title">Seal</h5>
                <blockquote>
                    <p><em>Vault is unsealed.</em></p>
                </blockquote>

                <form onSubmit={this.handleSubmit}>
                    <label>Token (must have <code>root</code> or <code>sudo</code> capability)</label>
                    <div className="error">{this.state.errors}</div>
                    <div className="success">{this.state.success}</div>
                    <input value={this.state.key} onChange={this.handleChange} placeholder="Your Seal Token. Input will be hidden..." id="unsealTokenField" type="password" />
                    <input className="button-primary" value="Seal" type="submit" />
                </form>
            </section>
        )
    }
}

