import React from 'react';
import Form from './components/Form/Form';
import Titles from './components/Titles/Titles';
import Weather from './components/Weather/Weather';
import Axios from 'axios';

const API_KEY = 'eb8a234d14cce1fc96c42d10452ff683';

class App extends React.Component {
  state = {
    temperature: '',
    city: '',
    country: '',
    humidity: '',
    description: '',
    error: false
  }

  getWeather = async (e) => {


    const city = e.target.elements.city.value;

    const country = e.target.elements.country.value;

    e.preventDefault();
    try {
      const api_call = await
        Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);

      const response = api_call.data;
      console.log(response);
      if (city && country) {
        this.setState({
          temperature: response.main.temp,
          city: response.name,
          country: response.sys.country,
          humidity: response.main.humidity,
          description: response.weather[0].description,
          error: ""
        })
      } else {
        this.setState({
          error: "Please enter the values..."
        })
      }
    } catch (error) {
      console.log(error);
      this.setState({
        error: 'Can not fetch weather info at this time.'
      });
    }
  }


  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form loadWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default App;
