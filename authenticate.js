class Authenticate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            token: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({token: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        globalLoginToken = this.state.token
    }

    render() {
        return (
            <section className="container" id="authenticate">
                <h5 className="title">Authenticate</h5>

                <form onSubmit={this.handleSubmit}>
                    <label>Token</label>
                    <input value={this.state.token} onChange={this.handleChange} placeholder="Your token. Input will be hidden..." id="tokenField" type="password" />
                    <input className="button-primary" value="Login" type="submit" />
                </form>
            </section>
        )
    }
}