import React, {Component} from 'react'
import { Link } from 'react-router'
import Navigation from '../../../app/utils/navigation'

export default class Config extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main className="wrapper">
                <Navigation authenticated={true} />

                <section className="container" id="config">
                    <h5 className="title">Config</h5>
                    <ul>
                        <ConfigRow title="Seal" href="/seal" />
                        <ConfigRow title="Audit Backends" href="/audit-backend" />
                        <ConfigRow title="Authentication Backends" href="/auth-backend" />
                        <ConfigRow title="Secret Backends" href="/secret-backend" />
                    </ul>
                </section>
            </main>
        )
    }
}

class ConfigRow extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <li>
                <Link to={this.props.href}>
                    {this.props.title}
                </Link>
            </li>
        )
    }
}
