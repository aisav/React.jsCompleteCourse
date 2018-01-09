var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var OpenWeatherMap = require('OpenWeatherMap');

var Weather = React.createClass({
    getDefaultProps: function () {
        return {
            loc: 'Yerevan',
            temp: '0'
        };
    },

    getInitialState: function () {
        return {
            loc: this.props.loc,
            temp: this.props.temp
        };
    },

    handleNewUpdate: function (updates) {
        OpenWeatherMap.getTemp(updates.loc).
            then(
            (temp) => {updates.temp=temp;        this.setState(updates);},
            (err) => {alert(err)}
        )
    },

    render: function () {
        var {loc, temp} = this.state;

        return (
            <div>
                <h3>Weather Component</h3>
                <WeatherForm onNewUpdateAtrF= { this.handleNewUpdate }/>
                <WeatherMessage loc={loc} temp={temp}/>
            </div>
        );
    }
});

module.exports = Weather;