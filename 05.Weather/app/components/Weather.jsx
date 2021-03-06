var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var OpenWeatherMap = require('OpenWeatherMap');

var Weather = React.createClass({

    getInitialState: function () {
        return {
            isLoading: false
        };
    },

    handleNewUpdate: function (location) {
        // console.log(location+ "==========================");
        // debugger;
        var that = this;
        this.setState({
            isLoading: true,
            location: undefined,
            temp: undefined
        });
        OpenWeatherMap.getTemp(location).then(
            function (temp) {
                that.setState({
                    location: location,
                    temp: temp,
                    isLoading: false
                });
            },
            function (e) {
                that.setState({
                    isLoading: false,
                    err: e.message
                });
            }
        )
    },

    componentDidMount: function () {
        var location = this.props.location.query.location;

        if (location && location.length > 0) {
            this.handleNewUpdate(location);
            window.location.hash = '#/'
        }
    },

    componentWillReceiveProps: function (newProps) {
        var location = newProps.location.query.location;

        if (location && location.length > 0) {
            this.handleNewUpdate(location);
            window.location.hash = '#/'
        }
    },

    render: function () {
        var {isLoading, location, temp, err} = this.state;

        function renderWeather() {
            if (isLoading) {
                return (<h3 className="text-center">Loading...</h3>);
            }
            else if (err) {
                return (<h3 className="text-center">{err}</h3>);
            } else if (temp && location) {
                return (<WeatherMessage location={location} temp={temp}/>);
            }
        }

        return (
            <div>
                <h3 className="text-center page-title">Get Weather</h3>
                <WeatherForm onNewUpdateAtrF={this.handleNewUpdate}/>
                {renderWeather()}
            </div>
        );

    }
});

module.exports = Weather;