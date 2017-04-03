class Navigation extends React.Component {
    render() {
        return (
            <nav className="navigation">
                <section className="container">
                    <h1 className="title">Locksmith</h1>
                    <NavigationOptions authenticated={this.props.authenticated} />
                </section>
            </nav>
        )
    }
}

class NavigationOptions extends React.Component {
    render() {

        if (this.props.authenticated) {
            return (
                <ul className="navigation-list float-right">
                    <NavigationLink title="Secrets" href="secret" />
                    <NavigationLink title="Policies" href="policy" />
                    <NavigationLink title="Config" href="config" />
                </ul>
            )
        }

        return (
            <ul className="navigation-list float-right">
            </ul>
        )
    }
}

class NavigationLink extends React.Component {
    constructor(props) {
        super(props)

        this.handleNavigationChange = this.handleNavigationChange.bind(this)
    }

    handleNavigationChange() {
        rootPage.changeToMainPage.call(rootPage, this.props.href)
    }

    render() {
        return (
            <li className="navigation-item">
                <a className="navigation-link" onClick={this.handleNavigationChange} data-popover>{this.props.title}</a>
            </li>
        )
    }
}