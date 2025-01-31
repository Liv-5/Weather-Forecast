// import { error } from "console";
import dayjs, { type Dayjs } from "dayjs";
import dotenv from "dotenv";
dotenv.config();

// TODO: Define an interface for the Coordinates object
// interface Coordinates {
//   name: string;
//   lat: number;
//   lon: number;
//   country: string;
//   state: string;
// }

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: Dayjs | string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  icon: string;
  iconDescription: string;
  constructor(
    city: string,
    date: Dayjs | string,
    tempF: number,
    windSpeed: number,
    humidity: number,
    icon: string,
    iconDescription: string
  ) {
    this.city = city;
    this.date = date;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.icon = icon;
    this.iconDescription = iconDescription;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  private _baseURL?: string;

  private _apiKey?: string;

  private _city = "";

  constructor() {
    this._baseURL = process.env.API_BASE_URL || "";

    this._apiKey = process.env.API_KEY || "";
    console.log(this._baseURL, this._apiKey, this._city);
  }
  // * Note: The following methods are here as a guide, but you are welcome to provide your own solution.
  // * Just keep in mind the getWeatherForCity method is being called in your
  // * 09-Servers-and-APIs/02-Challenge/Develop/server/src/routes/api/weatherRoutes.ts file

  // * the array of Weather objects you are returning ultimately goes to
  // * 09-Servers-and-APIs/02-Challenge/Develop/client/src/main.ts

  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(_city: string) {
    const cityCoordinates = await fetch(
      `${this._baseURL}/geo/1.0/direct?q=${_city}&appid=${this._apiKey}`
    ).then((weatherData) => weatherData.json());
    console.log(cityCoordinates);
    console.log("test123");
    const { lat, lon } = cityCoordinates[0];

    const weatherForecast = await fetch(
      `${this._baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this._apiKey}`
    )
      .then((response) => {
        return response.json();
      })
      .then((weatherData) => {
        let fiveDay: Weather[] = [];
        const forecastList = weatherData.list;

        if (!forecastList || !Array.isArray(forecastList)) {
          console.error("Invalid weather data structure");
          return [];
        }

        for (let index = 7; index < forecastList.length; index += 8) {
          fiveDay.push(forecastList[index]);
        }
        console.log(fiveDay.length);
        console.log(forecastList.length);
        console.log("here is 5day", fiveDay);
        return fiveDay;
      });
    const now = dayjs().format("YYYY-MM-DD");
    console.log(now);
    console.log(weatherForecast);
    //   const weatherForecast = await fetch(
    //     `${this._baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=91985d9f8baeb6a32bdc3cc0b3a89be8`
    //   ).then((weatherData) => weatherData.json());
    // }
    // buildForecastArray(weatherForecast: Weather[]) {
    //   let fiveDay: Weather[] = [];

    //   for (let index = 7; index + 8 < weatherForecast.length; index += 8) {
    //     fiveDay.push(weatherForecast[index]);
    //   }
    //   console.log(fiveDay.length);
    //   console.log(weatherForecast.length);
  }
}

export default new WeatherService();
