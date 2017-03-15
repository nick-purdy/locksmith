
class VaultStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sealed: false,
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.checkSealStatus(),
            10000
        );

        this.checkSealStatus();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    checkSealStatus() {
        $.ajax({
            url: "/v1/sys/seal-status",
            context: this,
            type: 'GET',
            success: function(result) {
                console.info(result)
                this.setState(result)
            },
            error: function(e) {
                console.log(e);
                console.log(e.responseJSON.errors);
                this.setState({errors: e.responseJSON.errors});
            },
        });
    }

    render() {
        let componentHtml = null;

        if (this.state.sealed === true) {
            componentHtml = (
                <Unseal progress={this.state.progress} threshold={this.state.t} />
            )
        } else if (this.state.sealed === false) {
            componentHtml = (
                <Seal />
            )
        } else {
            <div>
                Loading...
            </div>
        }

        return (
            <section className="container" id="status">
                <h5 className="title">Status</h5>
                {componentHtml}
            </section>
        )
    }
}

