var React = require('react');

var Controls = React.createClass({

    propTypes: {
        countdownStatus: React.PropTypes.string.isRequired,
        onStatusChange: React.PropTypes.func.isRequired
    },

    onStatusChangeClick: function (newStatus) {
        return () => this.props.onStatusChange(newStatus);
    },

    // componentWillReceiveProps: function(newProps) {
    //     console.log("component will receive props");
    // },

    render: function () {

        var {countdownStatus} = this.props;
        var renderStartStopButton = () => {
            if (countdownStatus === 'started') {
                return <button className="button secondary" onClick={this.onStatusChangeClick('paused')}>Pause</button>
            }
            else if (countdownStatus === 'paused') {
                return <button className="button primary" onClick={this.onStatusChangeClick('started')}>Continue</button>
            }
        };
        return (
            <div className="controls">
                {renderStartStopButton()}
                <button className="button alert hollow" onClick={this.onStatusChangeClick('stopped')}>Clear</button>
            </div>
        )
    }
});

module.exports = Controls;