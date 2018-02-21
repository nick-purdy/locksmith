import React, {Component} from 'react';
import AuthenticationMechanism from './mechanism'
import Navigation from '../../../app/utils/navigation'

export default class Authenticate extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main className="wrapper">
                <Navigation authenticated={false} />
                <section className="container" id="authenticate">
                    <AuthenticationMechanism mechanism={''} />
                </section>
            </main>
        )
    }
}

Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
