import { useEffect, useState } from "react";
import axios from "axios";
import sun from '../assets/sun.png'

function WeatherBox() {
    // string 대신 아이콘 함수
    const getWeatherIcon = (desc: string) => {
        if (desc.includes("맑음")) return "☀️ (맑음)";
        if (desc.includes("구름")) return "☁️ (구름)";
        if (desc.includes("비")) return "🌧️ (비)";
        if (desc.includes("눈")) return "❄️ (눈)";
        return "";
    };

    // 날씨 로딩 state
    const [weather, setWeather] = useState<React.ReactNode>(
        <img src={sun} alt="날씨 로딩 중" className="weatherLoading" />
    );

    useEffect(() => {
        const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

        const getKakaoLocation = async (lat: number, lon: number) => {
            try {
                const res = await axios.get(
                    "https://dapi.kakao.com/v2/local/search/address.json?query=",
                    {
                        params: {
                            x: lon,
                            y: lat,
                        },
                        headers: {
                            Authorization: `KakaoAK ${KAKAO_API_KEY}`,
                        },
                    }
                );

                const info = res.data.documents[0];
                return `${info.region_1depth_name} ${info.region_2depth_name} ${info.region_3depth_name}`;
            } catch (err) {
                console.error("Kakao 위치 변환 실패:", err);
                return "위치 확인 불가";
            }
        };

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const location = await getKakaoLocation(latitude, longitude);
                try {
                    const response = await axios.get(
                        "https://api.openweathermap.org/data/2.5/weather",
                        {
                            params: {
                                lat: latitude,
                                lon: longitude,
                                
                                appid: WEATHER_API_KEY,
                                units: "metric",
                                lang: "kr",
                            },
                        }
                    );

                    const data = response.data;
                    const description = data.weather[0].description;
                    const city = data.name;
                    const temp = Math.round(data.main.temp);
                    const icon = getWeatherIcon(description);

                    setWeather(
                        `${city} ${temp}°C / ${icon || description}`
                    );
                } catch (error) {
                    console.error("날씨 정보 불러오기 실패", error);
                    setWeather("날씨 정보를 불러오지 못했습니다.");
                }
            },
            (err) => {
                console.error("위치 정보를 가져올 수 없습니다.", err);
                setWeather("위치 허용이 필요합니다.");
            }
        );
    }, []);

    return <div>{weather}</div>;
}

export default WeatherBox;
