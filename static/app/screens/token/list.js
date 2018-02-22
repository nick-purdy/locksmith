import React, {Component} from 'react'
import { Link } from 'react-router';
import TokenService from '../../../app/service/token-service'
import Confirm from '../../../app/utils/confirm'

export default class TokenList extends Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.onCreate = this.onCreate.bind(this)
        this.onListTokens = this.onListTokens.bind(this)
        this.handleRevoke = this.handleRevoke.bind(this)
        this.onRevoke = this.onRevoke.bind(this)
    }

    componentDidMount() {
        TokenService.list(this.onListTokens)
    }

    onListTokens(results) {
        console.log(results.data)
        this.setState(results)
    }

    onCreate() {
        this.props.onCreate.call(null)
    }

    handleRevoke(token) {
        console.log("Revoking: " + token)
        TokenService.revoke(this.onRevoke, token)
    }

    onRevoke() {
        TokenService.list(this.onListTokens)
    }

    render() {
        let tokens = []

        if (this.state && this.state.data) {
            const innerParent = this
            for (var i in this.state.data.keys) {
                const token = this.state.data.keys[i]
                const revokeFunc = function() {
                    innerParent.handleRevoke.call(null, token)
                }
                tokens.push(
                    <TokenRow key={token} accessor={token} onLookup={this.props.onLookup} onRevoke={revokeFunc} />
                )
            }
        } else {
            tokens.push(
                <tr key="loading">
                    <td>Loading...</td>
                    <td></td>
                </tr>
            )
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th>accessor</th>
                        <th>name</th>
                        <th>tools</th>
                    </tr>
                </thead>
                <tbody>
                    {tokens}
                </tbody>
            </table>
        )
    }
}

class TokenRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display_name: ""
        }
        this.onLookupToken = this.onLookupToken.bind(this)
    }

    componentDidMount() {
        TokenService.lookup(this.onLookupToken, this.props.accessor)
    }

    onLookupToken(results) {
        this.setState(results.data)
    }

    render() {
        return (
            <tr>
                <td>
                    <Link to={"/token/lookup/" + this.props.accessor}>{this.props.accessor}</Link>
                </td>
                <td>
                    {this.state.display_name}
                </td>
                <td>
                    <a onClick={this.props.onRenew}>renew</a>
                    &nbsp;
                    <a onClick={this.props.onRevoke}>revoke</a>
                </td>
            </tr>
        )
    }
}