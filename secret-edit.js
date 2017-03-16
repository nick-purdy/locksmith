class SecretEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    componentDidMount() {
        this.viewSecret()
    }

    viewSecret() {
        const path = "/v1/" + this.props.path

        $.ajax({
            url: path,
            context: this,
            headers: {
                "X-Vault-Token": globalLoginToken
            },
            type: 'GET',
            success: function(result) {
                console.info(result)
                this.setState(result)
            },
            error: function(e) {
                console.log(e);
                console.log(e.responseJSON.errors);
                this.setState({errors: e.responseJSON.errors});
            },
        });
    }

    handleAddNewSecretRow() {
        alert("hello")
    }

    render() {
        let form = (<div>Loading...</div>)
        let rows = []

        if (this.state.data) {

            console.log(this.state.data)
            for (var propertyName in this.state.data) {
                if (this.state.data.hasOwnProperty(propertyName)) {
                    rows.push(
                        <SecretEditRow key={propertyName} name={propertyName} secret={this.state.data[propertyName]} />
                    )
                }
            }

            form = (
                <form>
                    <fieldset>
                        <div className="container">
                            {rows}
                            <p><a onClick={this.handleAddNewSecretRow}>Add New</a></p>
                        </div>
                        <input className="button-primary" value="Save" type="submit" />
                    </fieldset>
                </form>
            )
        }

        return (
            <section className="container" id="secrets">
                <h5 className="title">Edit Secret</h5>
                <p><code>{this.props.path}</code></p>
                {form}
            </section>
        )
    }
}

class SecretEditRow extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="column"><input placeholder="Secret Name" value={this.props.name} type="text" /></div>
                <div className="column"><input placeholder="Secret Value" value={this.props.secret} type="text" /></div>
                <div className="column"><a>remove</a></div>
            </div>
        )
    }
}
