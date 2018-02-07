import React, {Component} from 'react';
import SealService from '../../../app/service/seal-service';
import Navigation from '../../../app/utils/navigation';
import Progress from '../../../app/utils/progress';

export default class Unseal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sealed: props.sealed,
      progress: props.progress,
      t: props.threshold,
      key: ''
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.successfulUnsealToken = this.successfulUnsealToken.bind(this)
    this.onReset = this.onReset.bind(this)
    this.onResetFail = this.onResetFail.bind(this)
  }

  successfulUnsealToken(result) {
    this.setState(result)
    this.setState({
        success: "Successfully entered unseal token",
        key: ""
    })

    if (!result.sealed) {
      this.context.router.push({pathname: '/authenticate'})
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({errors: "", success: ""});

    SealService.unseal(
      this.successfulUnsealToken,
      function(errors) { this.setState({errors: errors}); },
      this.state.key
    )
  }

  onReset(result) {
    this.setState(result)
    this.setState({
        success: "Successfully reset unseal attempt",
        key: ""
    })
  }

  onResetFail(errors) {
    this.setState({errors: errors})
  }

  handleReset(e) {
    e.preventDefault();
    this.setState({errors: "", success: ""});

    SealService.reset(
      this.onReset,
      this.onResetFail,
      this.state.key
    )
  }

  handleChange(event) {
    this.setState({key: event.target.value});
  }

  render() {
    let currentProgress = this.state.t
    if (this.state.sealed) {
      currentProgress = this.state.progress
    }

    return (
      <main className="wrapper">
        <Navigation authenticated={false} />
        <section className="container" id="unseal">
          <h5 className="title">Unseal</h5>

          <blockquote>
              <p><em>Vault is currently sealed. To unseal please enter your unseal tokens.</em></p>
          </blockquote>

          <form onSubmit={this.handleSubmit}>
              <label>Token</label>
              <div className="error">{this.state.errors}</div>
              <div className="success">{this.state.success}</div>
              <input value={this.state.key} onChange={this.handleChange} placeholder="Your Unseal Token. Input will be hidden..." id="unsealTokenField" type="password" />
              <button className="button button-outline" onClick={this.handleReset}>Reset</button>
              <input className="button-primary float-right" value="Unseal" type="submit" />
          </form>

          <label>Progress</label>
          <Progress progress={currentProgress} total={this.state.t} />
        </section>
      </main>
    )
  }
}

Unseal.contextTypes = {
  router: React.PropTypes.object.isRequired,
}
