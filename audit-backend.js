
class AuditBackend extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        AuditBackendService.list(this, this.onListAuditBackend)
    }

    onListAuditBackend(results) {
        console.log(results.data)
        this.setState(results)
    }

    render() {
        let backends = []

        if (this.state && this.state.data) {
            if (this.state.data.length > 0) {
                for (var propertyName in this.state.data) {
                    if (this.state.data.hasOwnProperty(propertyName)) {
                        const backend = this.state.data[propertyName]
                        backends.push(
                            <AuditBackendRow
                                            key={backend.type}
                                            type={backend.type}
                                            path={propertyName}
                                            description={backend.description}
                                            options={backend.options}
                                            />
                        )
                    }
                }
            } else {
                backends.push(
                    <tr key="no-found">
                        <td colSpan="4">No audit backends are configured.</td>
                    </tr>
                )
            }
        } else {
            backends.push(
                <tr key="loading">
                    <td>Loading...</td>
                    <td></td>
                </tr>
            )
        }

        return (
            <section className="container" id="audit-backend">
                <h5 className="title">Audit Backend</h5>
                <table>
                    <thead>
                        <tr>
                            <th>path</th>
                            <th>type</th>
                            <th>description</th>
                            <th>options</th>
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

class AuditBackendRow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <tr>
                <td>{this.props.path}</td>
                <td>{this.props.type}</td>
                <td>{this.props.description}</td>
                <td>{this.props.options}</td>
            </tr>
        )
    }
}
