import React, {Component} from 'react'
import { Link } from 'react-router'
import AuditBackendList from './list'
import Navigation from '../../../app/utils/navigation'

export default class AuditBackend extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main className="wrapper">
                <Navigation authenticated={true} />

                <section className="container" id="audit-backend">
                    <h5 className="title">Audit Backend</h5>
                    <AuditBackendList />
                    <Link to="/audit-backend/mount">Mount</Link>
                </section>
            </main>
        )
    }
}
