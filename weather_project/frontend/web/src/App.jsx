import React, { useState } from "react";
import { getWeather } from "../services/weatherService";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Box,
  IconButton,
} from "@mui/material";
import {
  WiDaySunny,
  WiNightClear,
  WiRain,
  WiCloudy,
  WiSnow,
} from "react-icons/wi";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(city);
      setWeatherData(data);
    } catch (error) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: "linear-gradient(135deg, #74ebd5, #ACB6E5)",
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ color: "#fff", fontWeight: "600" }}
      >
        Weather App
      </Typography>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Enter city"
            variant="outlined"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleSearchClick}
            disabled={loading}
            style={{
              backgroundColor: "#0A75BA",
              padding: "12px 20px",
              fontSize: "16px",
              borderRadius: "8px",
              color: "#fff",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              transition: "background-color 0.3s, transform 0.3s",
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Search"
            )}
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Typography
          color="error"
          align="center"
          style={{ marginTop: "20px", fontSize: "18px" }}
        >
          {error}
        </Typography>
      )}

      {weatherData && !loading && (
        <Paper
          elevation={6}
          style={{
            padding: "30px",
            marginTop: "30px",
            borderRadius: "10px",
            backgroundColor: "#fff",
            maxWidth: "900px", // Adjusted for larger screens
            width: "100%",
          }}
        >
          <Typography variant="h5" align="center" style={{ fontWeight: "600" }}>
            {weatherData.name}, {weatherData.sys.country}
          </Typography>
          <Typography variant="h6" align="center" style={{ color: "#757575" }}>
            {weatherData.weather[0].description}
          </Typography>

          <Grid
            container
            spacing={3}
            justifyContent="center"
            style={{ marginTop: "20px" }}
          >
            <Grid item xs={12} sm={4}>
              <Typography
                align="center"
                variant="h6"
                style={{ fontWeight: "500" }}
              >
                Temperature:{" "}
                <span style={{ color: "#FF6347" }}>
                  {weatherData.main.temp}°C
                </span>
              </Typography>
              <Typography
                align="center"
                style={{ fontSize: "14px", color: "#999" }}
              >
                Feels Like: {weatherData.main.feels_like}°C
              </Typography>
              <Typography
                align="center"
                style={{ fontSize: "14px", color: "#999" }}
              >
                Humidity: {weatherData.main.humidity}%
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography
                align="center"
                style={{ fontSize: "14px", color: "#999" }}
              >
                Wind Speed: {weatherData.wind.speed} m/s
              </Typography>
              <Typography
                align="center"
                style={{ fontSize: "14px", color: "#999" }}
              >
                Pressure: {weatherData.main.pressure} hPa
              </Typography>
              <Typography
                align="center"
                style={{ fontSize: "14px", color: "#999" }}
              >
                Visibility: {weatherData.visibility / 1000} km
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography
                align="center"
                style={{ fontSize: "14px", color: "#999" }}
              >
                Cloudiness: {weatherData.clouds.all}%
              </Typography>
              <Typography
                align="center"
                style={{ fontSize: "14px", color: "#999" }}
              >
                UV Index: {weatherData.uvi || "N/A"}
              </Typography>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center" marginTop="20px">
            {weatherData.weather[0].main === "Clear" && (
              <WiDaySunny size={64} color="#FF6347" />
            )}
            {weatherData.weather[0].main === "Rain" && (
              <WiRain size={64} color="#0A75BA" />
            )}
            {weatherData.weather[0].main === "Clouds" && (
              <WiCloudy size={64} color="#757575" />
            )}
            {weatherData.weather[0].main === "Snow" && (
              <WiSnow size={64} color="#ADD8E6" />
            )}
            {weatherData.weather[0].main === "Clear" && (
              <WiNightClear size={64} color="#FF6347" />
            )}
          </Box>
        </Paper>
      )}
    </div>
  );
};

export default App;
