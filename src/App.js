import "./App.css";
import { useEffect, useState } from "react";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import "bootstrap/dist/css/bootstrap.min.css";
import ClipLoader from "react-spinners/ClipLoader";

//  1. 앱이 실행되자마자 현재 위치기반의 날씨가 보임
//  2. 날씨 정보에는 도시, 섭씨온도, 화씨온도, 날씨상태가 보임
//  3. 5개의 버튼이 있음(1개는 현재위치, 4개는 다른도시)
//  4. 도시버튼을 클릭할 때마다 도시별 날씨가 나옴
//  5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나옴
// +6. 데이터를 들고 오는 동안(데이터 도착하기 전에)
//      로딩 스피너가 돌도록..!

function App() {
  const cities = ["seoul", "tokyo", "paris", "busan"];
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  let [loading, setLoading] = useState(false);
  // 앱이 실행되자마자 현재위치 기반의 날씨는 가져오는걸 어떻게
  //  표현해줄까?->useEffect
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("현재위치 : ", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1de4f4b95fe39088d98141dc444c842e&units=metric`;

      setLoading(true);
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1de4f4b95fe39088d98141dc444c842e&units=metric`;
      setLoading(true);
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (city == "") getCurrentLocation();
    else getWeatherByCity();
  }, [city]);

  // const handleCityChange = (city) => {
  //   if (city == "current") setCity(null);
  //   else setCity(city);
  // };
  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="red" loading={loading} size={150}></ClipLoader>
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather}></WeatherBox>
          <WeatherButton
            cities={cities}
            setCity={setCity}
            // handleCityChange={handleCityChange}
          ></WeatherButton>
        </div>
      )}
    </div>
  );
}

export default App;
