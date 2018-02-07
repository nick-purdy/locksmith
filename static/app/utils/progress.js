import React, {Component} from 'react';

export default class Progress extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cssWidth = null;
        if (this.props.progress !== 0) {
            const progressPercent = ((this.props.progress / this.props.total) * 100)
            cssWidth = {width: progressPercent + "%"}
            console.info(cssWidth)
        } else {
            cssWidth = {width: "1px"}
        }

        return (
            <div>
                <div className="progress">
                    <div className="progress-fill" style={cssWidth}>
                        {this.props.progress} / {this.props.total}
                    </div>
                </div>
            </div>
        )
    }
}

