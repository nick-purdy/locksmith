import React, {Component} from 'react';
import SealService from '../../../app/service/seal-service';
import Navigation from '../../../app/utils/navigation';
import Progress from '../../../app/utils/progress';

export default class Seal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sealed: false,
            key: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSealed = this.onSealed.bind(this)
        this.onSealedFailure = this.onSealedFailure.bind(this)
    }

    handleChange(event) {
        this.setState({key: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        SealService.seal(
            this.onSealed,
            this.onSealedFailure,
            this.state.key
        )
    }

    onSealed(result) {
        this.context.router.push({pathname: '/unseal'})
    }

    onSealedFailure(errors) {
        this.setState({errors: errors})
    }

    render() {
        return (
            <main className="wrapper">
                <Navigation authenticated={true} />
                <section className="container" id="seal">
                    <h5 className="title">Seal</h5>
                    <blockquote>
                        <p><em>Vault is unsealed.</em></p>
                    </blockquote>

                    <form onSubmit={this.handleSubmit}>
                        <label>Token (must have <code>root</code> or <code>sudo</code> capability)</label>
                        <div className="error">{this.state.errors}</div>
                        <div className="success">{this.state.success}</div>
                        <input value={this.state.key} onChange={this.handleChange} placeholder="Your Seal Token. Input will be hidden..." id="unsealTokenField" type="password" />
                        <input className="button-primary" value="Seal" type="submit" />
                    </form>
                </section>
            </main>
        )
    }
}

Seal.contextTypes = {
    router: React.PropTypes.object.isRequired,
  }
  