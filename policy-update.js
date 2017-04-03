
class PolicyUpdate extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            json: "",
            name: ""
        }

        this.handleJsonChange = this.handleJsonChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (this.props.policy) {
            PolicyService.read(this, this.onReadPolicy, this.props.policy)
        }
    }

    onReadPolicy(results) {
        console.log(results.data)
        this.setState(results)
    }

    handleNameChange(event) {
        this.setState({name: event.target.value})
    }

    handleJsonChange(event) {
        this.setState({json: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault()

        PolicyService.update(this,
            this.onUpdatePolicy,
            this.onFailToUpdatePolicy
        )
    }

    onMountedBackend() {
        this.props.handleList.call()
    }

    onFailToMountBackend(message) {
        this.setState({errors: message})
    }


    render() {
        let title = (
            <h5 className="title">Update Policy</h5>
        )
        if (!this.props.policy) {
            title = (
                <div>
                    <h5 className="title">Create Policy</h5>
                    <input value={this.state.name} onChange={this.handleNameChange} placeholder="Policy name" type="text" />
                </div>
            )
        }

        return (
            <section className="container">
                {title}

                <form onSubmit={this.handleSubmit}>

                    <div className="error">{this.state.errors}</div>
                    <textarea value={this.state.json} onChange={this.handleJsonChange} placeholder="json..."></textarea>

                    <input className="button-primary" value="Save" type="submit" />
                    <button className="button button-outline float-right" onClick={this.props.onList}>Cancel</button>
                </form>

            </section>
        )
    }
}
