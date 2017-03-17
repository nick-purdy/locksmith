class Authenticate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            token: "",
            success: ""
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
        this.state.success = "Successfully logged in"
        this.forceUpdate()
    }

    render() {

        let content = (
            <form onSubmit={this.handleSubmit}>
                <label>Token</label>
                <input value={this.state.token} onChange={this.handleChange} placeholder="Your token. Input will be hidden..." id="tokenField" type="password" />
                <input className="button-primary" value="Login" type="submit" />
            </form>
        )

        if (this.state.success) {
            content = (
                <div className="success">
                    {this.state.success}
                </div>
            )
        }

        return (
            <section className="container" id="authenticate">
                <h5 className="title">Authenticate</h5>
                {content}
            </section>
        )
    }
}