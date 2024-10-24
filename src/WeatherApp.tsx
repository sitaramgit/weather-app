import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Divider } from '@mui/material';
import Grid from "@mui/material/Grid2";
import SearchWeather from './components/SearchWeather';

const WeatherApp = () => {
    const [city, setCity] = useState('London');
    const [weatherData, setWeatherData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchWeatherData = async () => {
            setIsLoading(true);
            try {
                const url: string = `https://api.openweathermap.org/data/2.5/forecast?appid=15ca787f2d191cf1f09525804a2ce85d&q=${city}`
                const response = await axios.get(url);
                const filteredData = response.data.list.filter((data: any, index: number) => index % 8 === 0);
                setWeatherData(filteredData);
            } catch (error) {
                console.error('Error fetching weather data', error);
            } finally {
                setIsLoading(false)
            }
        };

        fetchWeatherData();
    }, [city]);

    const updateCity = useCallback((name: string) => setCity(name), [])

    return (
        <Box sx={{ padding: 4 }}>

            <SearchWeather updateCity={updateCity} isLoading={isLoading} />
            <Grid container spacing={4}>
                {weatherData.map((weather: any, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                        <Card
                            sx={{
                                minHeight: 200,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <CardContent>
                                <Typography textAlign={'center'} variant="h6" color='#d78903' gutterBottom>
                                    {new Date(weather.dt_txt).toLocaleDateString()}
                                </Typography>
                                <Typography textAlign={'center'} variant="body2">Temperature</Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Typography variant="body2">Min</Typography>
                                    <Typography variant="body2">Max</Typography>
                                </Box>
                                <Divider sx={{ marginY: 1 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Typography variant="body2">{weather.main.temp_min}°C</Typography>
                                    <Typography variant="body2">{weather.main.temp_max}°C</Typography>
                                </Box>

                                <Divider sx={{ marginY: 1 }} />
                                <Typography textAlign={'center'} variant="body2">Temp: {weather.main.temp}°C</Typography>
                                <Divider sx={{ marginY: 1 }} />
                                <Typography variant="body1">
                                    {weather.weather[0].description}
                                </Typography>

                                <Divider sx={{ marginY: 1 }} />
                                <Typography variant="body2">Humidity: {weather.main.humidity}%</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default WeatherApp;
