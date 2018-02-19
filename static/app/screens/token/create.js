import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router';
import TokenService from '../../../app/service/token-service'
import Navigation from '../../../app/utils/navigation'
import BreadCrumb from '../../../app/utils/bread-crumbs'

export default class TokenCreate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errors: "",
            id: "",
            policies: "",
            meta: "",
            no_parent: false,
            no_default_policy: false,
            renewable: true,
            ttl: "",
            explicit_max_ttl: "",
            display_name: "",
            num_uses: 0,
            period: ""
        }

        this.handleCancel = this.handleCancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCreated = this.handleCreated.bind(this)
        this.handleFailed = this.handleFailed.bind(this)
        this.handleBreadCrumb = this.handleBreadCrumb.bind(this)
    }

    handleCancel() {
        this.context.router.push({pathname: '/token'})
    }

    handleChange(event) {
        this.setState(
            {[event.target.id]: event.target.value}
        );
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({errors: ""})

        let policies = []
        if (this.state.policies !== "") {
            policies = this.state.policies.split(",")
        }

        let meta = []
        if (this.state.meta !== "") {
            meta = this.state.meta.split(",")
        }

        TokenService.create(this.handleCreated, this.handleFailed, {
            id: this.state.id,
            policies: policies,
            meta: meta,
            no_parent: this.state.no_parent,
            no_default_policy: this.state.no_default_policy,
            renewable: this.state.renewable,
            ttl: this.state.ttl,
            explicit_max_ttl: this.state.explicit_max_ttl,
            display_name: this.display_name,
            num_uses: this.state.num_uses,
            period: this.state.period
        })
    }

    handleCreated(result) {
        console.log(result)
        this.handleCancel()
    }

    handleFailed(errors) {
        this.setState({errors: errors})
    }

    handleBreadCrumb() {
        this.handleCancel()
    }

    render() {
        return (

            <main className="wrapper">
                <Navigation authenticated={true} />
                <section className="container" id="token-create">
                    <h5 className="title">Create Token</h5>
                    <BreadCrumb folders={["tokens", "create"]} onClick={this.handleBreadCrumb} />
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <label>id</label>
                            <div className="error">{this.state.errors}</div>
                            <input id="id" value={this.state.id} onChange={this.handleChange} placeholder="id... leave blank for random" type="text" />

                            <label>display_name</label>
                            <input id="display_name" value={this.state.display_name} onChange={this.handleChange} placeholder="display name... leave blank for 'token'" type="text" />

                            <label>policies (comma separated)</label>
                            <input id="policies" value={this.state.policies} onChange={this.handleChange} placeholder="policies... leave blank for creating tokens policies" type="text" />

                            <label>meta (comma separated)</label>
                            <input id="meta" value={this.state.meta} onChange={this.handleChange} placeholder="meta... optional" type="text" />

                            <label>no parent</label>
                            <select id="no_parent" onChange={this.handleChange} value={this.state.no_parent}>
                                <option value="false">false</option>
                                <option value="true">true</option>
                            </select>

                            <label>no default policy</label>
                            <select id="no_default_policy" onChange={this.handleChange} value={this.state.no_default_policy}>
                                <option value="false">false</option>
                                <option value="true">true</option>
                            </select>

                            <label>renewable</label>
                            <select id="renewable" onChange={this.handleChange} value={this.state.renewable}>
                                <option value="false">false</option>
                                <option value="true">true</option>
                            </select>

                            <label>ttl</label>
                            <input id="ttl" value={this.state.ttl} onChange={this.handleChange} placeholder="ttl... leave blank for default value" type="text" />

                            <label>explicit max ttl</label>
                            <input id="explicit_max_ttl" value={this.state.explicit_max_ttl} onChange={this.handleChange} placeholder="explicit_max_ttl... leave blank for default value" type="text" />

                            <label>num uses</label>
                            <input id="num_uses" value={this.state.num_uses} onChange={this.handleChange} placeholder="num_uses... leave blank for default value" type="text" />

                            <label>period</label>
                            <input id="period" value={this.state.period} onChange={this.handleChange} placeholder="period... leave blank for default value" type="text" />

                            <button className="button button-outline" onClick={this.handleCancel}>Cancel</button>
                            <input className="button-primary float-right" value="Save" type="submit" />
                        </fieldset>
                    </form>
                </section>
            </main>
        )
    }
}

TokenCreate.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
