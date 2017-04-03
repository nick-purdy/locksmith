
class SecretBackend extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        SecretBackendService.list(this, this.onListSecretBackend)
    }

    onListSecretBackend(results) {
        console.log(results.data)
        this.setState(results)
    }

    render() {
        let backends = []

        if (this.state && this.state.data) {
            for (let index in this.state.data) {
                const backend = this.state.data[index]
                backends.push(
                    <SecretBackendRow
                                    key={backend.type}
                                    name={backend.type}
                                    path="unknown"
                                    description={backend.description}
                                    default_lease_ttl={backend.config.default_lease_ttl}
                                    max_lease_ttl={backend.config.max_lease_ttl}
                                    />
                )
            }
        } else {
            backends.push(
                <tr>
                    <td>Loading...</td>
                    <td></td>
                </tr>
            )
        }

        return (
            <section className="container" id="secret-backend">
                <h5 className="title">Secret Backend</h5>
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>path</th>
                            <th>description</th>
                            <th>default lease ttl</th>
                            <th>max lease ttl</th>
                        </tr>
                    </thead>
                    <tbody>
                        {backends}
                    </tbody>
                </table>
            </section>
        )
    }
}

class SecretBackendRow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.name}
                </td>
                <td>{this.props.path}</td>
                <td>{this.props.description}</td>
                <td>{this.props.default_lease_ttl}</td>
                <td>{this.props.max_lease_ttl}</td>
            </tr>
        )
    }
}