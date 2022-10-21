

let convertToF = (data) => {
    let toF = ((data-273.15)*9/5)+32;
    console.log( "new Temp", toF);
    return toF;
}
    

let cardinalDirection = (data) => {
    let val= Math.floor ((data / 22.5) + 0.5);
    let direction = ["N", "NE", "ENE", "E", "ESE", "SE", "ENE", "E", "ESE", "SE"];
    let directionValue = direction[(val % 16 )];
    return directionValue;
}

let getWeather = (data) => {
    let weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${data}&APPID=7ede6a47b6d32703e023244c218d1bb5`;

    console.log(weatherurl); 
    
    fetch(weatherurl)
    .then((response) => {
        if (response.ok) {
            return response.json();
    } else {
        return Promise.reject (response)
    }
    
    }).then((data) => {
    console.log(data);
    console.log(data);
    
    let country = data.sys.country;
    let cityName = data.name;
    let humidity = data.main['humidity']; 
    let weatherdesc = data.weather[0].description;
    let temp = data.main.temp;
    let tempChange= Math.round(convertToF(temp))
    let windDirection = data.wind.deg;
    let direction = cardinalDirection(windDirection);
    let windSpeed = Math.round(data.wind.speed);
    //log our values//
    console.log('Country: ', country);
    console.log('city: ', cityName);
    console.log('humidity: ', humidity);
    console.log('description: ', weatherdesc);
    console.log('temp: ', temp);
    console.log("New Temp: ", tempChange);
    console.log('Wind Direction Degrees: ', cityName);
    
    //write to table//
    let tableData = document.getElementById('dataEntry').innerHTML
    document.getElementById('dataEntry').insertAdjacentHTML("afterend",
    "<td>" + cityName + "</td>" +
    "<td>" + country + "</td>" +
    "<td>" + tempChange + "&deg;</td>" +
    "<td>" + weatherdesc + "</td>" +
    "<td>" + windSpeed + "mph</td>" +
    "<td>" + direction + "</td>" +
     "<td>" + humidity + "%</td>"

    );
     }).catch((error) => {
    console.error(error); 
    }).finally(() => {
        console.log ('successfully completed!')
    });
}

let getweatherButton = document.querySelector('button');
getweatherButton.addEventListener("click", getWeather());

let textSearch = document.querySelector("#data");
textSearch.addEventListener('keypress', (e) => {
    let data = document.getElementById('data').value;
    if(e.key === "Enter"){
        getWeather(data);
    }
})

getWeatherDataValue=() => {
    let data = document.getElementById('data').value;
    getWeather(data);

}
