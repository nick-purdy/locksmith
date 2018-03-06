import React, {Component} from 'react'
import AuditBackendService from '../../../app/service/audit-backend-service'
import Navigation from '../../../app/utils/navigation'
import BreadCrumb from '../../../app/utils/bread-crumbs'

export default class AuditBackendMount extends Component {
    constructor(props) {
        super(props)

        this.state = {
            path: ""
        }

        this.onMountedBackend = this.onMountedBackend.bind(this)
        this.onFailToMountBackend = this.onFailToMountBackend.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleChange(event) {
        this.setState({path: event.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()

        AuditBackendService.mount(
            this.onMountedBackend,
            this.onFailToMountBackend,
            "file",
            "file",
            "File audit backend",
            { path: this.state.path }
        )
    }

    handleCancel() {
        this.context.router.push({pathname: '/audit-backend'})
    }
    
    onMountedBackend() {
        this.context.router.push({pathname: '/audit-backend'})
    }

    onFailToMountBackend(message) {
        this.setState({errors: message})
    }

    render() {
        return (
            <main className="wrapper">
                <Navigation authenticated={true} />

                <section className="container" id="audit-backend-mount">
                    <h5 className="title">Mount Audit Backend</h5>
                        
                    <form onSubmit={this.handleSubmit}>
                        <select>
                            <option value="file">file</option>
                        </select>

                        <div className="error">{this.state.errors}</div>
                        <input value={this.state.path} onChange={this.handleChange} placeholder="/var/log/vault/log" type="text" />

                        <button className="button button-outline" onClick={this.handleCancel}>Cancel</button>
                        <input className="button-primary float-right" value="Save" type="submit" />
                    </form>
                </section>
            </main>
        )
    }
}

AuditBackendMount.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
