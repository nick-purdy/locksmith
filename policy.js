
class Policy extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        PolicyService.list(this, this.onListPolicies)
    }

    onListPolicies(results) {
        console.log(results.data)
        this.setState(results)
    }

    render() {
        let policies = []

        if (this.state && this.state.data) {
            for (var i in this.state.data.policies) {
                const policy = this.state.data.policies[i]
                console.log(policy)
                policies.push(
                    <PolicyRow key={policy} name={policy} />
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
            </section>
        )
    }
}

class PolicyRow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>
                    <a onClick={this.props.onEdit}>edit</a>
                    &nbsp;
                    <a onClick={this.props.onDelete}>delete</a>
                </td>
            </tr>
        )
    }
}