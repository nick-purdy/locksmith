import React, {Component} from 'react'

export default class RowDropdown extends Component {
    constructor(props) {
        super(props)

        this.handleMenuClick = this.handleMenuClick.bind(this)
        this.handleSingleClick = this.handleSingleClick.bind(this)
        this.handleMultilineClick = this.handleMultilineClick.bind(this)
        this.handleJsonClick = this.handleJsonClick.bind(this)
        this.handleGlobalClick = this.handleGlobalClick.bind(this)
        this.state = {
            open: false
        }

        let baseLink = null
    }

    componentDidMount() {
        document.body.addEventListener('click', this.handleGlobalClick);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.handleGlobalClick);
    }

    handleMenuClick() {
        this.setState({open: !this.state.open})
    }

    handleSingleClick() {
        this.props.onAdd.call(null, 'single')
    }
    
    handleMultilineClick() {
        this.props.onAdd.call(null, 'multiline')
    }

    handleJsonClick() {
        this.props.onAdd.call(null, 'json')
    }

    handleGlobalClick(event) {
        if (!(this.baseLink == event.target) && !this.baseLink.contains(event.target)) {
            this.setState({open: false})
        }
    }

    render() {
        let cssOpen = "popover"
        if (this.state.open) {
            cssOpen = "popover popover-open"
        }

        return (
            <div style={{height: '3em'}}>
                <div style={{position: 'absolute'}}>
                <a className="navigation-link" onClick={this.handleMenuClick} data-popover ref={(link) => { this.baseLink = link; }}>
                    add
                    <i className="fa fa-plus" aria-hidden="true" style={{marginLeft: '0.25em'}}></i>
                </a>
                <div className={cssOpen} id="popover-grid">
                    <ul className="popover-list">
                        <li key="single" className="popover-item">
                            <a className="popover-link" onClick={this.handleSingleClick} title="single">single</a>
                        </li>
                        <li key="multiline" className="popover-item">
                            <a className="popover-link" onClick={this.handleMultilineClick} title="multiline">multiline</a>
                        </li>
                        {/* <li key="json" className="popover-item">
                            <a className="popover-link" onClick={this.handleJsonClick} title="json">json</a>
                        </li> */}
                    </ul>
                </div>
                </div>
            </div>
        )
    }
}