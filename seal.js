
class Seal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sealed: false,
            key: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSeal = this.handleSeal.bind(this);
    }

    handleChange(event) {
        this.setState({key: event.target.value});
    }

    handleSeal(event) {
        event.preventDefault();

        const requestData = { value: this.state.key }

        $.ajax({
            url: '/v1/sys/seal',
            context: this,
            headers: {
                "X-Vault-Token": this.state.key
            },
            type: 'PUT',
            success: function(result) {
                console.info(result)
                this.setState(result)
            },
            error: function(e) {
                console.log(e);
                this.setState({errors: e.responseJSON.errors});
            },
        });
    }

    render() {
        return (
            <div>
                <blockquote>
                    <p><em>Vault is unsealed.</em></p>
                </blockquote>

                <form onSubmit={this.handleSeal}>
                    <label>Token (must have <code>root</code> or <code>sudo</code> capability)</label>
                    <div className="error">{this.state.errors}</div>
                    <div className="success">{this.state.success}</div>
                    <input value={this.state.key} onChange={this.handleChange} placeholder="Your Seal Token. Input will be hidden..." id="unsealTokenField" type="password" />
                    <input className="button-primary" value="Seal" type="submit" />
                </form>
            </div>
        )
    }
}

