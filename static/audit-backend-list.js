
class AuditBackendList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleUnmount = this.handleUnmount.bind(this)
    }

    componentDidMount() {
        AuditBackendService.list(this, this.onListAuditBackend)
    }

    onListAuditBackend(results) {
        console.log(results.data)
        this.setState(results)
    }

    handleUnmount() {
        alert("unmount")
    }

    render() {
        let backends = []

        if (this.state && this.state.data) {
            for (var propertyName in this.state.data) {
                if (this.state.data.hasOwnProperty(propertyName)) {
                    const backend = this.state.data[propertyName]
                    backends.push(
                        <AuditBackendRow
                                        key={propertyName}
                                        type={backend.type}
                                        path={propertyName}
                                        description={backend.description}
                                        options={backend.options}
                                        onUnmount={this.handleUnmount}
                                        />
                    )
                }
            }
        } else {
            backends.push(
                <tr key="loading">
                    <td colSpan="5">Loading...</td>
                </tr>
            )
        }

        if (backends.length < 1) {
            backends.push(
                <tr key="no-found">
                    <td colSpan="5">No audit backends are configured.</td>
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
                            <th>tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        {backends}
                    </tbody>
                </table>

                <a onClick={this.props.handleMount}>Mount</a>
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
                <AuditBackRowOptions type={this.props.type} options={this.props.options} />
                <td><a onClick={this.props.onUnmount}>unmount</a></td>
            </tr>
        )
    }
}

class AuditBackRowOptions extends React.Component {
    render() {
        if (this.props.type === "file") {
            return (
                <td>{this.props.options.path}</td>
            )
        } else {
            return (
                <td>Unknown options</td>
            )
        }
    }
}