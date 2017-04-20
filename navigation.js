class Navigation extends React.Component {
    render() {
        return (
            <nav className="navigation">
                <section className="container">
                    <h1 className="title">
                        <i className="fa fa-unlock-alt" aria-hidden="true"></i>
                        Locksmith
                    </h1>
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
                    <NavigationDropdown title="Secrets" href="secret" />
                    <NavigationLink title="Policies" href="policy" />
                    <NavigationDropdown title="Authentication" href="token" />
                    <NavigationConfig title="Config" href="config" />
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

class NavigationDropdown extends React.Component {
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
                <a className="navigation-link" onClick={this.handleNavigationChange} data-popover>
                    {this.props.title}
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
            </li>
        )
    }
}

class NavigationConfig extends React.Component {
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
                <a className="navigation-link" onClick={this.handleNavigationChange} data-popover>
                    <i className="fa fa-cog" aria-hidden="true"></i>
                </a>
            </li>
        )
    }
}