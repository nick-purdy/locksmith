class SecretList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div></div>
        )
    }
}

class SecretsBreadCrumb extends React.Component {
    render() {

        let folders = []

        let fullPath = []
        for (let index in this.props.currentFolder) {
            const folder = this.props.currentFolder[index]
            fullPath.push(folder)
            const breadCrumbPath = fullPath.slice(0)

            const innerParent = this;
            const testFunction = function() {
                innerParent.props.onClick.call(null, breadCrumbPath)
            }
            folders.push(
                        <span>&nbsp;<a onClick={testFunction}>{folder}</a>&nbsp;&#47;</span>
                        )
        }

        return (
            <p>
                <code> {folders} </code>
            </p>
        )
    }
}

class SecretsRow extends React.Component {
    render() {
        if (this.props.path.endsWith("/")) {
            return (
                    <tr>
                        <td><a onClick={this.props.onClick}>FOLDER: {this.props.path}</a></td>
                        <td><a>edit</a> &nbsp; <a>delete</a></td>
                    </tr>
            )
        } else {
            return (
                    <tr>
                        <td><a onClick={this.props.onEditClick}>FILE: {this.props.path}</a></td>
                        <td><a>edit</a> &nbsp; <a>delete</a></td>
                    </tr>
            )
        }
    }
}