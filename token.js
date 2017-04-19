
class Token extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            view: "list",
            token: ""
        }

        this.handleLookup = this.handleLookup.bind(this)
        this.handleList = this.handleList.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
    }

    handleLookup(token) {
        this.setState({
            view: "lookup",
            token: token
        })
    }

    handleList() {
        this.setState({
            view: "list"
        })
    }

    handleCreate() {
        this.setState({
            view: "create"
        })
    }

    render() {
        if (this.state.view === "list") {
            return (
                <TokenList onLookup={this.handleLookup} onCreate={this.handleCreate} />
            )
        } else if (this.state.view === "lookup") {
            return (
                <TokenLookup token={this.state.token} onList={this.handleList} />
            )
        } else {
            return (
                <TokenCreate onList={this.handleList} />
            )
        }
    }
}
