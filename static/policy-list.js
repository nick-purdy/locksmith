
class PolicyList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.onCreate = this.onCreate.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        PolicyService.list(this, this.onListPolicies)
    }

    onListPolicies(results) {
        console.log(results.data)
        results.data.policies.sort()
        this.setState(results)
    }

    onCreate() {
        this.props.onUpdate.call(null, "")
    }

    handleDelete(policy) {
        console.log("deleting: " + policy)
        PolicyService.remove(this, this.onDeleted, policy)
    }

    onDeleted() {
        PolicyService.list(this, this.onListPolicies)
    }

    render() {
        let policies = []

        if (this.state && this.state.data) {
            const innerParent = this
            for (var i in this.state.data.policies) {
                const policy = this.state.data.policies[i]
                const deleteFunc = function() {
                    innerParent.handleDelete.call(null, policy)
                }
                policies.push(
                    <PolicyRow key={policy} name={policy} onUpdate={this.props.onUpdate} onDelete={deleteFunc} />
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
                <td><a onClick={this.handleUpdate}>{this.props.name}</a></td>
                <td>
                    <a onClick={this.props.onDelete}>delete</a>
                </td>
            </tr>
        )
    }
}