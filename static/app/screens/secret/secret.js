import React, {Component, PropTypes} from 'react';
import SecretList from './list'
import AuthService from '../../../app/service/auth-service'
import Navigation from '../../../app/utils/navigation'

export default class Secret extends Component {
    constructor(props) {
        super(props)

        this.state = {
            path: ['secret']
        };

        this.handleCreate = this.handleCreate.bind(this)
    }

    handleCreate() {
        this.context.router.push({pathname: '/secret/create/' + this.state.path.join("/")})
    }

    render() {
        return (
            <main className="wrapper">
                <Navigation authenticated={true} />
                <section className="container" id="secrets">
                    <h5 className="title">Secrets</h5>
                    <SecretList path={this.props.params.path} />
                    <div>
                        <a onClick={this.handleCreate}>Create</a>
                    </div>
                </section>
            </main>
        )
        // if (this.state.view === "list") {
        //     return (
        //         
        //     )
        // } else {
        //     return (
        //         <SecretEdit path={this.state.path} onListSecret={this.handleListSecrets} newSecret={this.state.newSecret} />
        //     )
        // }
    }
}

Secret.propTypes = {
    params: PropTypes.shape({
        path: PropTypes.string,
    }),
}

Secret.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
