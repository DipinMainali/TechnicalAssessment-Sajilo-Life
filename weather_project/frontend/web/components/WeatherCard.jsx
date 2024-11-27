import React from "react";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WeatherCard = ({ weather, getWeatherColor }) => {
  return (
    <Card className={`${getWeatherColor(weather.main.temp)} text-white`}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            <h2 className="text-xl font-semibold">{weather.name}</h2>
          </div>
          <span className="text-3xl font-bold">
            {Math.round(weather.main.temp)}°C
          </span>
        </div>
        <p className="text-lg capitalize">{weather.weather[0].description}</p>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
