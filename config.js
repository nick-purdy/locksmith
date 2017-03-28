
class Config extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className="container">
                <h5 className="title">Config</h5>
                <ul>
                    <ConfigRow title="Seal" href="seal" />
                    <ConfigRow title="Audit Backends" href="audit-backend" />
                    <ConfigRow title="Authentication Backends" href="auth-backend" />
                    <ConfigRow title="Secret Backends" href="secret-backend" />
                </ul>
            </section>
        )
    }
}

class ConfigRow extends React.Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        rootPage.changeToMainPage.call(rootPage, this.props.href)
    }

    render() {
        return (
            <li>
                <a onClick={this.handleClick}>
                    {this.props.title}
                </a>
            </li>
        )
    }
}
