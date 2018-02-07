import React, {Component} from 'react'
import { Link } from 'react-router'
import PolicyList from './list'
import Navigation from '../../../app/utils/navigation'

export default class Policy extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main className="wrapper">
                <Navigation authenticated={true} />
                <section className="container" id="policies">
                    <h5 className="title">Policies</h5>
                    <PolicyList />
                    <Link to="/policy/create">Create</Link>
                </section>
            </main>
        )
    }
}
