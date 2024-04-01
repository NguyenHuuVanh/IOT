const apiLinks = {
  weather: () => {
    return "https://api.weatherapi.com/v1/current.json?key=356e909b24e7451793b83455240104&q=Vietnam";
  },
  time:()=>{
    return  "https://api.ipgeolocation.io/timezone?apiKey=e27d5a8ea7b64a2eba0ab973d839c466&tz=Asia/Bangkok"
  },
  weatherOfWeek:()=>{
    return "https://api.weatherapi.com/v1/forecast.json?key=356e909b24e7451793b83455240104&q=Vietnam&days=7&aqi=no&alerts=yes"
  }
  
};

export {apiLinks}
