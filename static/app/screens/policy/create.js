import React, {Component} from 'react'
import PolicyService from '../../../app/service/policy-service'
import Navigation from '../../../app/utils/navigation'
import BreadCrumb from '../../../app/utils/bread-crumbs'

export default class PolicyCreate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rules: "",
            name: ""
        }

        this.handleCancel = this.handleCancel.bind(this)
        this.handleRulesChange = this.handleRulesChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onCreatePolicy = this.onCreatePolicy.bind(this)
        this.onFailToCreatePolicy = this.onFailToCreatePolicy.bind(this)
        this.handleBreadCrumb = this.handleBreadCrumb.bind(this)
    }

    componentDidMount() {
    }

    handleCancel() {
        this.context.router.push({pathname: '/policy'})
    }

    handleNameChange(event) {
        this.setState({name: event.target.value})
    }

    handleRulesChange(event) {
        this.setState({rules: event.target.value});
    }

    handleBreadCrumb() {
        this.context.router.push({pathname: '/policy'})
    }

    handleSubmit(e) {
        e.preventDefault()

        PolicyService.createOrUpdate(
            this.onCreatePolicy,
            this.onFailToCreatePolicy,
            this.state.name,
            this.state.rules
        )
    }

    onCreatePolicy() {
        this.context.router.push({pathname: '/policy'})
    }

    onFailToCreatePolicy(message) {
        console.log(message)
        this.setState({errors: message})
    }

    render() {
        return (
            <main className="wrapper">
                <Navigation authenticated={true} />
                <section className="container" id="policy-create">
                    <div>
                        <h5 className="title">Create Policy</h5>
                        <BreadCrumb folders={["policies", "policy"]} onClick={this.handleBreadCrumb} />
                        <label>Name</label>
                        <input value={this.state.name} onChange={this.handleNameChange} placeholder="Policy name" type="text" />
                    </div>
                    <form onSubmit={this.handleSubmit}>

                        <label>Rules</label>
                        <div className="error">{this.state.errors}</div>
                        <textarea value={this.state.rules} onChange={this.handleRulesChange} placeholder="rules json..." rows="20"></textarea>

                        <button className="button button-outline" onClick={this.handleCancel}>Cancel</button>
                        <input className="button-primary float-right" value="Save" type="submit" />
                    </form>

                </section>
            </main>
        )
    }
}

PolicyCreate.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
