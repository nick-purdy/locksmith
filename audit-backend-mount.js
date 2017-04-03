
class AuditBackendMount extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            path: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleChange(event) {
        this.setState({path: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault()

        AuditBackendService.mount(this,
            this.onMountedBackend,
            this.onFailToMountBackend,
            "file",
            "file",
            "File audit backend",
            { path: this.state.path }
        )
    }

    handleCancel() {
        this.props.handleList.call()
    }

    onMountedBackend() {
        this.props.handleList.call()
    }

    onFailToMountBackend(message) {
        this.setState({errors: message})
    }

    render() {
        return (
            <section className="container">
                <h5 className="title">Mount Audit Backend</h5>

                <form onSubmit={this.handleSubmit}>
                    <select>
                        <option value="file">file</option>
                    </select>

                    <div className="error">{this.state.errors}</div>
                    <input value={this.state.path} onChange={this.handleChange} placeholder="/var/log/vault/log" type="text" />

                    <input className="button-primary" value="Save" type="submit" />
                    <button className="button button-outline float-right" onClick={this.handleCancel}>Cancel</button>
                </form>

            </section>
        )
    }
}