import React, {Component, PropTypes} from 'react'
import PolicyService from '../../../app/service/policy-service'
import Navigation from '../../../app/utils/navigation'
import BreadCrumb from '../../../app/utils/bread-crumbs'

export default class PolicyUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rules: "",
            name: this.props.params.path
        }

        this.handleCancel = this.handleCancel.bind(this)
        this.onReadPolicy = this.onReadPolicy.bind(this)
        this.handleRulesChange = this.handleRulesChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleBreadCrumb = this.handleBreadCrumb.bind(this)
        this.onUpdatePolicy = this.onUpdatePolicy.bind(this)
        this.onFailToUpdatePolicy = this.onFailToUpdatePolicy.bind(this)
    }

    handleCancel() {
        this.context.router.push({pathname: '/policy'})
    }

    componentDidMount() {
        PolicyService.read(this.onReadPolicy, this.state.name)
    }

    onReadPolicy(results) {
        this.setState(results)
    }

    handleNameChange(event) {
        this.setState({name: event.target.value})
    }

    handleRulesChange(event) {
        this.setState({rules: event.target.value})
    }

    handleBreadCrumb() {
        this.context.router.push({pathname: '/policy'})
    }

    handleSubmit(e) {
        e.preventDefault()

        PolicyService.createOrUpdate(
            this.onUpdatePolicy,
            this.onFailToUpdatePolicy,
            this.state.name,
            this.state.rules
        )
    }

    onUpdatePolicy() {
        this.context.router.push({pathname: '/policy'})
    }

    onFailToUpdatePolicy(message) {
        this.setState({errors: message})
    }

    render() {
        return (
            <main className="wrapper">
                <Navigation authenticated={true} />
                <section className="container" id="policy-update">
                    <div>
                        <h5 className="title">Update Policy</h5>
                        <BreadCrumb folders={["policies", this.state.name]} onClick={this.handleBreadCrumb} />
                        <label>Name</label>
                        <p>{this.state.name}</p>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <label>Rules</label>
                        <div className="error">{this.state.errors}</div>
                        <textarea value={this.state.rules} onChange={this.handleRulesChange} rows="20" cols="10" style={{height: '20em'}}></textarea>
                        <button className="button button-outline" onClick={this.handleCancel}>Cancel</button>
                        <input className="button-primary float-right" value="Save" type="submit" />
                    </form>
                </section>
            </main>
        )
    }
}

PolicyUpdate.propTypes = {
    params: PropTypes.shape({
        path: PropTypes.string,
    }),
}

PolicyUpdate.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
