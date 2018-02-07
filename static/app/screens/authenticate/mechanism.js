import React, {Component} from 'react'

export default class AuthenticationMechanism extends Component {

    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.context.router.push({pathname: '/authenticate/' + event.target.value})
    }

    render() {
        return (
            <select onChange={this.handleChange} value={this.props.mechanism}>
                <option value="">Select login option</option>
                <option value="token">Token</option>
                <option value="ldap">LDAP</option>
            </select>
        )
    }
}

AuthenticationMechanism.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
