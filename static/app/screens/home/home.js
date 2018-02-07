import React, {Component} from 'react'
import Navigation from '../../../app/utils/navigation'
import Status from '../../../app/utils/status'

export default class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const status = Status.getInstance()
        console.log(status)
        status.registerSealStatusWatcher(this, function(result) {
            status.deregisterSealStatusWatcher(this)

            if (result.sealed) {
                console.log("Sealed!")
                this.context.router.push({pathname: '/unseal'})
            } else {
                this.context.router.push({pathname: '/authenticate'})
                console.log("Unsealed!")
            }
        })
    }

    render() {
        return (
            <main className="wrapper">
                <Navigation authenticated={false} />
                <section className="container" id="status"><h5>Loading vault status...</h5></section>
            </main>
        )
    }
}

Home.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
