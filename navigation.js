class Navigation extends React.Component {
    render() {
        return (
            <nav className="navigation">
                <section className="container">
                    <h1 className="title">Locksmith</h1>
                    <NavigationOptions />
                </section>
            </nav>
        )
    }
}

class NavigationOptions extends React.Component {
    render() {
        return (
            <ul className="navigation-list float-right">
                <NavigationLink title="Secrets" href="secret" />
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