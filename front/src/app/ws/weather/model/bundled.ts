export interface Main {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Clouds {
    all: number;
}

export interface Wind {
    speed: number;
    deg: number;
}

export interface Rain {
    threeH: number;
}

export interface Sys {
    pod: string;
}

export interface WeatherList {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    rain: Rain;
    sys: Sys;
    dt_txt: string;
}

export interface Coord {
    lat: number;
    lon: number;
}

export interface City {
    name: string;
    coord: Coord;
    country: string;
}

export interface ForecastDTO {
    cod: string;
    message: number;
    cnt: number;
    list: WeatherList[];
    city: City;
}