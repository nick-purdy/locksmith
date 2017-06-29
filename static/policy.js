
class Policy extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            view: "list",
            policy: ""
        }

        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleList = this.handleList.bind(this)
    }

    handleUpdate(policy) {
        this.setState({
            view: "update",
            policy: policy
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
                <PolicyList onUpdate={this.handleUpdate} />
            )
        } else {
            return (
                <PolicyUpdate policy={this.state.policy} onList={this.handleList} />
            )
        }
    }
}
