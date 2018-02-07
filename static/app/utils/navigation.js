import React, {Component} from 'react';

export default class Navigation extends Component {
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
                    <NavigationDropdown title="Secrets" href="/secret/list/secret" subMenu={["secret/ [generic]"]} />
                    <NavigationLink title="Policies" href="/policy" />
                    <NavigationDropdown title="Authentication" href="/token" subMenu={["token"]} />
                    <NavigationConfig title="Config" href="/config" />
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
        this.context.router.push({pathname: this.props.href})
    }

    render() {
        return (
            <li className="navigation-item">
                <a className="navigation-link" onClick={this.handleNavigationChange} data-popover>{this.props.title}</a>
            </li>
        )
    }
}

NavigationLink.contextTypes = {
    router: React.PropTypes.object.isRequired,
}

class NavigationDropdown extends React.Component {
    constructor(props) {
        super(props)

        this.handleMenuClick = this.handleMenuClick.bind(this)
        this.handleSubmenuClick = this.handleSubmenuClick.bind(this)
        this.handleGlobalClick = this.handleGlobalClick.bind(this)
        this.state = {
            open: false
        }

        let baseLink = null
    }

    componentDidMount() {
      document.body.addEventListener('click', this.handleGlobalClick);
    }

    componentWillUnmount() {
      document.body.removeEventListener('click', this.handleGlobalClick);
    }

    handleMenuClick() {
        this.setState({open: !this.state.open})
    }

    handleSubmenuClick() {
        this.context.router.push({pathname: this.props.href})
    }

    handleGlobalClick(event) {
        if (!(this.baseLink == event.target) && !this.baseLink.contains(event.target)) {
            this.setState({open: false})
        }
    }

    render() {
        let cssOpen = "popover"
        if (this.state.open) {
            cssOpen = "popover popover-open"
        }

        let subMenuItems = []
        for (var i in this.props.subMenu) {
            subMenuItems.push(
                <li key={this.props.subMenu} className="popover-item">
                    <a className="popover-link" onClick={this.handleSubmenuClick} title={this.props.subMenu}>{this.props.subMenu}</a>
                </li>
            )
        }

        return (
            <li className="navigation-item">
                <a className="navigation-link" onClick={this.handleMenuClick} data-popover ref={(link) => { this.baseLink = link; }}>
                    {this.props.title}
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <div className={cssOpen} id="popover-grid">
                    <ul className="popover-list">
                        {subMenuItems}
                    </ul>
                </div>
            </li>
        )
    }
}

NavigationDropdown.contextTypes = {
    router: React.PropTypes.object.isRequired,
}

class NavigationConfig extends React.Component {
    constructor(props) {
        super(props)

        this.handleNavigationChange = this.handleNavigationChange.bind(this)
    }

    handleNavigationChange() {
        this.context.router.push({pathname: this.props.href})
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

NavigationConfig.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
