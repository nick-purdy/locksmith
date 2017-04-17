
class Token extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            view: "list",
            token: ""
        }

        this.handleLookup = this.handleLookup.bind(this)
        this.handleList = this.handleList.bind(this)
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

    render() {
        if (this.state.view === "list") {
            return (
                <TokenList onLookup={this.handleLookup} />
            )
        } else {
            return (
                <TokenLookup token={this.state.token} onList={this.handleList} />
            )
        }
    }
}
