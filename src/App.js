import React,{useState} from 'react';
import './App.css';
import Wheatherresult from './Wheatherresult';

function App() {
  const APP_KEY ="d2c19a331cd54fa2a7d131144232705";
  let cityinput=""
  const[Wheatherdata, setwheatherdata] = useState([])

  function citytext(){
    document.querySelector("input").addEventListener("input", (e) =>{
      e.preventDefault();
      cityinput = e.target.value;
      console.log(cityinput);
    })
  }

  async function getdata(value){
    if(value === "")
    return;
    const data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=${value}&days=8&aqi=yes&alerts=yes`);
    const result = await data.json();
    setwheatherdata(result.forecast.forecastday)
    console.log(result);
  }
  return (
    <div className="App">
      <div className="search">
        <input type="text" placeholder="Search City..." onChange={citytext} />
        <button onClick={() => getdata(cityinput)}>Search</button>
      </div>
      {Wheatherdata.map(item =>(<Wheatherresult key={item.date} date={item.date} mintemp={item.day.mintemp_c} maxtemp={item.day.maxtemp_c}  condition={item.day.condition.text} icon={item.day.condition.icon}/>))}
    </div>
  );
}

export default App;
