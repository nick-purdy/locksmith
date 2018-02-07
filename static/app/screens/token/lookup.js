import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router';
import TokenService from '../../../app/service/token-service'
import Navigation from '../../../app/utils/navigation'
import BreadCrumb from '../../../app/utils/bread-crumbs'

export default class TokenLookup extends Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.onLookupToken = this.onLookupToken.bind(this)
        this.handleBreadCrumb = this.handleBreadCrumb.bind(this)
    }

    componentDidMount() {
        TokenService.lookup(this.onLookupToken, this.props.params.path)
    }

    onLookupToken(results) {
        this.setState(results)
    }

    handleBreadCrumb() {
        this.context.router.push({pathname: '/token'})
    }

    render() {
        let token = ""

        if (this.state && this.state.data) {
            token = (
                <div>
                    <div className="row">
                        <div className="column"><strong>id</strong></div>
                        <div className="column">{this.state.data.id}</div>
                    </div>
                    <hr />
                    <TokenLookupPolicies policies={this.state.data.policies} />
                    <div className="row">
                        <div className="column"><strong>path</strong></div>
                        <div className="column">{this.state.data.path}</div>
                    </div>
                    <TokenLookupMeta meta={this.state.data.meta} />
                    <div className="row">
                        <div className="column"><strong>display_name</strong></div>
                        <div className="column">{this.state.data.display_name}</div>
                    </div>
                    <div className="row">
                        <div className="column"><strong>num_users</strong></div>
                        <div className="column">{this.state.data.num_users}</div>
                    </div>
                </div>
            )
        } else {
            token = (
                <p>Loading...</p>
            )
        }

        return (
            <main className="wrapper">
                <Navigation authenticated={true} />
                <section className="container" id="token-lookup">
                    <h5 className="title">Token</h5>
                    <BreadCrumb folders={["tokens", "token"]} onClick={this.handleBreadCrumb} />
                    {token}
                </section>
            </main>
        )
    }
}

class TokenLookupPolicies extends React.Component {
    render() {
        let policies = []

        for (var i in this.props.policies) {
            console.log(this.props.policies[i])
            policies.push(
                <li key={this.props.policies[i]}>{this.props.policies[i]}</li>
            )
        }

        return (
            <div className="row">
                <div className="column">
                    <strong>policies</strong>
                </div>
                <div className="column">
                    <ul>
                        {policies}
                    </ul>
                </div>
            </div>
        )
    }
}

class TokenLookupMeta extends Component {
    render() {
        let meta = []

        for (var i in this.props.meta) {
            console.log(this.props.meta[i])
            meta.push(
                <li key={this.props.meta[i]}>{this.props.meta[i]}</li>
            )
        }

        return (
            <div className="row">
                <div className="column"><strong>meta</strong></div>
                <div className="column">
                    <ul>
                        {meta}
                    </ul>
                </div>
            </div>
        )
    }
}

TokenLookup.propTypes = {
    params: PropTypes.shape({
        path: PropTypes.string,
    }),
}

TokenLookup.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
