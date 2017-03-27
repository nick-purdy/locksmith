
class AuthBackend extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        AuthBackendService.list(this, this.onListAuthBackend)
    }

    onListAuthBackend(results) {
        console.log(results.data)
        this.setState(results)
    }

    render() {
        let backends = []

        if (this.state && this.state.data && this.state.data) {
            for (var propertyName in this.state.data) {
                if (this.state.data.hasOwnProperty(propertyName)) {
                    const backend = this.state.data[propertyName]
                    backends.push(
                        <AuthBackendRow
                                        key={backend.type}
                                        type={backend.type}
                                        path={propertyName}
                                        description={backend.description}
                                        default_lease_ttl={backend.config.default_lease_ttl}
                                        max_lease_ttl={backend.config.max_lease_ttl}
                                        />
                    )
                }
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
            <section className="container" id="auth-backend">
                <h5 className="title">Authentication Backend</h5>
                <table>
                    <thead>
                        <tr>
                            <th>path</th>
                            <th>type</th>
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

class AuthBackendRow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <tr>
                <td>{this.props.path}</td>
                <td>{this.props.type}</td>
                <td>{this.props.description}</td>
                <td>{this.props.default_lease_ttl}</td>
                <td>{this.props.max_lease_ttl}</td>
            </tr>
        )
    }
}