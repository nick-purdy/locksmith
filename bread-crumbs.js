
class BreadCrumb extends React.Component {

    render() {

        let folders = []

        let fullPath = []
        for (let index in this.props.folders) {
            const folder = this.props.folders[index]
            fullPath.push(folder)
            const breadCrumbPath = fullPath.slice(0)

            const innerParent = this;
            const clickFunction = function() {
                innerParent.props.onClick.call(null, breadCrumbPath)
            }

            if (index == (this.props.folders.length - 1)) {
                if (!this.props.folder) {
                    folders.push(
                                <span key={fullPath}>&nbsp;{folder}</span>
                    )
                } else {
                    folders.push(
                                <span key={fullPath}>&nbsp;{folder}&nbsp;&#47;</span>
                    )
                }
            } else {
                folders.push(
                            <span key={fullPath}>&nbsp;<a onClick={clickFunction}>{folder}</a>&nbsp;&#47;</span>
                            )
            }
        }

        return (
            <p>
                <code> {folders} </code>
            </p>
        )
    }
}
