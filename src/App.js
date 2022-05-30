import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useState} from "react";
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const apiKey=process.env.REACT_APP_WEATHER_API_KEY;
 
  const searchLocationWeather = (cityName) =>{
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
      axios.get(apiURL).then((res) =>{
     //   console.log(res.data)
         setData(res.data)
         console.log(process.env.REACT_APP_WEATHER_API_KEY)
      }).catch((err) => {
        console.log("err", err)
      })
  }

  const setsearchLocation = (e)=>{
  //  console.log("value", e.target.value)
    setLocation(e.target.value)
   
  } 
  const sethandlerSearch =() =>{
      searchLocationWeather(location);
      setLocation('');
  }
  
     

  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control"
            value={location}
            onChange={setsearchLocation} />
          <button className="btn btn-primary" type="button"
            onClick={sethandlerSearch}>Search</button>
        </div>
      </div>

      {Object.keys(data).length > 0 &&
        <div className="col-md-12 text-center mt-5">

          <div className="shadow rounded wetherResultBox">
          <img className="weatherIcon"
              src= {`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`} alt='' />
             
           <h5>{data?.weather[0].main}</h5>
            <h5 className="weatherCity">
              {data?.name}
            </h5>
            <h6 className="weatherTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
          </div>
        </div>
      }

    </div>
 
  );

}

export default App;
