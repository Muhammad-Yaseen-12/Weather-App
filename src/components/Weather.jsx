import React, { useEffect, useState } from 'react';
import "./Weather.css";
import searchIcon from "../assets/search.png";
import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";

function Weather() {
    const [weatherData, setWeatherData] = useState({
        humidity: null,
        windSpeed: null,
        temperature: null,
        location: null,
        icon: clearIcon,
    });
    const [city, setCity] = useState("");

    const allIcons = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudIcon,
        "02n": cloudIcon,
        "03d": cloudIcon,
        "03n": cloudIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon,
    };

    const apikey = "1d3916c9eae518b842be735b8cbb8e02";

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.cod === 200) {
                const icon = allIcons[data.weather[0].icon] || clearIcon;
                setWeatherData({
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    temperature: Math.floor(data.main.temp),
                    location: data.name,
                    icon: icon,
                });
            } else {
                console.error("City not found");
                // Optionally, you can set some state to show an error message to the user
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        search(""); // Fetch weather data for London when the component mounts
    }, []);

    const handleSearch = () => {
        if (city) {
            search(city);
        }
    };

    return (
        <div className='weather'>
            <div className='search-bar'>
                <input 
                    type="text" 
                    placeholder='Search' 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <img src={searchIcon} alt="" onClick={handleSearch} />
            </div>
            <img src={weatherData.icon} alt="" className='weather-icon' />
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>
            <div className='weather-data'>
                <div className="col">
                    <img src={humidityIcon} alt="" />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>

                <div className="col">
                    <img src={windIcon} alt="" />
                    <div>
                        <p>{weatherData.windSpeed} km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;