
class AuditBackend extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            view: "list"
        }

        this.handleMount = this.handleMount.bind(this)
        this.handleList = this.handleList.bind(this)
    }

    handleMount(path, newSecret) {
        this.setState({
            view: "mount",
        })
    }

    handleList(path) {
        this.setState({
            view: "list",
        })
    }

    render() {
            if (this.state.view === "list") {
                return (
                    <AuditBackendList handleMount={this.handleMount} />
                )
            } else {
                return (
                    <AuditBackendMount handleList={this.handleList} />
                )
            }
    }
}
