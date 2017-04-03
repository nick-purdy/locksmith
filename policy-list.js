
class PolicyList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.onCreate = this.onCreate.bind(this)
    }

    componentDidMount() {
        PolicyService.list(this, this.onListPolicies)
    }

    onListPolicies(results) {
        console.log(results.data)
        this.setState(results)
    }

    onCreate() {
        this.props.onUpdate.call(null, "")
    }

    render() {
        let policies = []

        if (this.state && this.state.data) {
            for (var i in this.state.data.policies) {
                const policy = this.state.data.policies[i]
                console.log(policy)
                policies.push(
                    <PolicyRow key={policy} name={policy} onUpdate={this.props.onUpdate} />
                )
            }
        } else {
            policies.push(
                <tr key="loading">
                    <td>Loading...</td>
                    <td></td>
                </tr>
            )
        }

        return (
            <section className="container" id="policies">
                <h5 className="title">Policies</h5>
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        {policies}
                    </tbody>
                </table>
                <a onClick={this.onCreate}>Create</a>
            </section>
        )
    }
}

class PolicyRow extends React.Component {
    constructor(props) {
        super(props)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleUpdate() {
        this.props.onUpdate.call(null, this.props.name)
    }

    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>
                    <a onClick={this.handleUpdate}>edit</a>
                    &nbsp;
                    <a onClick={this.props.onDelete}>delete</a>
                </td>
            </tr>
        )
    }
}