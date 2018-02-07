import React, {Component} from 'react'
import { Link } from 'react-router'
import TokenList from './list'
import Navigation from '../../../app/utils/navigation'

export default class Token extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <main className="wrapper">
                <Navigation authenticated={true} />
                <section className="container" id="tokens">
                    <h5 className="title">Tokens</h5>
                    <TokenList />
                    <Link to="/token/create">Create</Link>
                </section>
            </main>
        )
    }
}
