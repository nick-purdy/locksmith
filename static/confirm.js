class Confirm extends React.Component {
    constructor(props) {
        super(props)

        this.handleCancel = this.handleCancel.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
    }

    handleCancel() {
        if (this.props.onCancel) {
            this.props.onCancel.call(null)
        }
    }

    handleConfirm() {
        if (this.props.onConfirm) {
            this.props.onConfirm.call(null)
        }
    }

    render() {
        let message = "Are you sure you want to continue?"
        if (this.props.message) {
            message = this.props.message
        }

        return (
            <div>
                <div className="overlay" onClick={this.handleCancel}>
                </div>
                <div className="confirm">
                    <blockquote>{message}</blockquote>
                    <hr/>
                    <div className="clearfix">
                        <button className="button button-outline" onClick={this.handleCancel}>No</button>
                        <button className="button-primary float-right" onClick={this.handleConfirm}>Yes</button>
                    </div>
                </div>
            </div>
        )
    }
}