
class TokenList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.onCreate = this.onCreate.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        TokenService.list(this, this.onListTokens)
    }

    onListTokens(results) {
        console.log(results.data)
        this.setState(results)
    }

    onCreate() {
        this.props.onCreate.call(null)
    }

    handleDelete(token) {
        console.log("deleting: " + token)
        TokenService.remove(this, this.onDeleted, token)
    }

    onDeleted() {
        TokenService.list(this, this.onListTokens)
    }

    render() {
        let tokens = []

        if (this.state && this.state.data) {
            const innerParent = this
            for (var i in this.state.data.keys) {
                const token = this.state.data.keys[i]
                const deleteFunc = function() {
                    innerParent.handleDelete.call(null, token)
                }
                tokens.push(
                    <TokenRow key={token} name={token} onLookup={this.props.onLookup} onDelete={deleteFunc} />
                )
            }
        } else {
            tokens.push(
                <tr key="loading">
                    <td>Loading...</td>
                    <td></td>
                </tr>
            )
        }

        return (
            <section className="container" id="tokens">
                <h5 className="title">Tokens</h5>
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tokens}
                    </tbody>
                </table>
                <a onClick={this.onCreate}>Create</a>
            </section>
        )
    }
}

class TokenRow extends React.Component {
    constructor(props) {
        super(props)
        this.handleLookup = this.handleLookup.bind(this)
    }

    handleLookup() {
        this.props.onLookup.call(null, this.props.name)
    }

    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>
                    <a onClick={this.handleLookup}>lookup</a>
                    &nbsp;
                    <a onClick={this.props.onRenew}>renew</a>
                    &nbsp;
                    <a onClick={this.props.onDelete}>revoke</a>
                </td>
            </tr>
        )
    }
}