var latitude; 
var longitude; 

//Get the user's local coordinates. 
localCoordinates(); 

//Functions 

function localCoordinates() {
    //Access the user's local coordinates from the navigator object. 
    navigator.geolocation.getCurrentPosition(retrieveLocation); 
}

// getting locations based on lat and lon
function retrieveLocation(position) {
    //Save latitude and longitude that are retrieved from getCurrentPosition. 
    latitude = position.coords.latitude; 
    longitude = position.coords.longitude;  
}

var prevSearches=[];

// function to search a specific city
function weatherSearch(){

    var counter=0;
    var search=$('#keyTerm').val();
    var searchQuery='https://api.openweathermap.org/data/2.5/forecast?q='+search+'&appid=ab855531e2a84587938c2262d8863c07'
    // maybe create its own function for this api call?
    var uvQuery='https://api.openweathermap.org/data/2.5/uvi/history?appid={appid}&lat='+latitude+'&lon='+longitude+'&cnt=5&start={start}&end={end}'

    // API call
    $.ajax({
        url: searchQuery,
        method: "GET"
    }).then(function(res) {
// layout for first day
var searchWeather=document.querySelector('#searched-city');
    searchCity=document.createElement('h3');
    searchCity.textContent=res.city.name;
    searchWeather.append(searchCity);

    // adding icons
    if (res.list[0].weather[0].main==='Clouds'){
        $('#image-div').html("<img src=https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3bjRqzFjxkmvAWL3ff72-tH8UidJ4UxFzmQ&usqp=CAU' height=200px width:200px />");
    }
    else if(res.list[0].weather[0].main==='haze'){
        $("#image-div").html("<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3bjRqzFjxkmvAWL3ff72-tH8UidJ4UxFzmQ&usqp=CAU' height=200px width:200px />");
    }
    else if(res.list[0].weather[0].main==='Clear'){
        $("#image-div").html("<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQB5rA_3-rOSGZygBtaYfgA6YdfW9pRFav4vQ&usqp=CAU' height=200px width:200px />");
    }
    else if(res.list[0].weather[0].main==='Rain'){
        $("#image-div").html("<img src='https://lh3.googleusercontent.com/proxy/osGz8h9UkfY_pgBR60hlzNuBDfubrEzmOeipoz54xKwsrl900mZEQl8pru8LAWpLxpwlWaQUCJclxaj6oQZhkjA4Tx6RfGpXEJRwNV2Ug9PcAxFkZDmX7EOfyT5_t7UyhMTxSM8WgOLOfxc5tpf_adMnsp-D2KcocJyrFAk7V4_JFWQQPLnddvUKaRw' height=200px width:200px />");
    }
    else if(res.list[0].weather[0].main==='Thunderstorm'){
        $("#image-div").html("<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHUzZMG5T41Na5OYewYjGrMwy56nxcyl1vJQ&usqp=CAU' height=200px width:200px />");
    }
    else if(res.list[0].weather[0].main==='snow'){
        $("#image-div").html("<img src='https://lh3.googleusercontent.com/proxy/2ZPXMzmsBUygSnCxTujchS45Ry6QCRfhbt_xPGOKdxOpcMs_AMkMBKtG3Zblqgalyxu-vKRilAeQPkp4JOEPTYGMR0343H2DoqGr-nQU-tHhbIcmkQDzOnM-uBGDF1BqFklABBYkSgt3KTy_Mh0aW8KeNV91uVW9CTB9j41dcy0B5wr8LIXm0on7G0VmiJpqaPlk9Q' height=200px width:200px />");
    }

    // to append date
    var forecastDate = document.createElement("h4");
    var forecastToday =(new Date(res.list[0].dt_txt).toLocaleDateString());
    // updating the text in the html
    forecastDate.innerHTML = forecastToday
    searchWeather.append(forecastDate);

    // to append current city weather
    var smain=document.createElement('h4');
    smain.textContent='Weather Conditions: '+res.list[0].weather[0].main;
    searchWeather.append(smain);

    // to append current city temp ==>Funtcioning properly now!!!
    var searchTemp=document.createElement('h4');
    searchTemp.textContent='Temperature: '+Math.round((res.list[0].main.temp - 273.15) * (9/5) + 32)
    searchWeather.append(searchTemp);

    // to append current humidity
    var shumidity=document.createElement('h4');
    shumidity.textContent='Humidity: ' + res.list[0].main.humidity;
    searchWeather.append(shumidity);

    // to append current windspeed
    var swindSpeed=document.createElement('h4');
    swindSpeed.textContent='Wind Speed: '+ res.list[0].wind.speed;
    searchWeather.append(swindSpeed);

    // for loop to display next 4 days
    for (var i=1;i<res.list.length;i++){
        console.log(res);

    if (res.list[i].dt_txt.indexOf("9:00") !== -1 && counter<4){
        counter++
        console.log(res.list[i].dt_txt)

    var card=$('<div>');
    card.addClass('card', 'mx-2');
    var cardBody=$('<div>');
    cardBody.addClass('card-body');

    var heading=$('<h4>');
    heading.addClass('card-title');
    heading.text(res.city.name)
    
    var date= $('<h5>')
    date.addClass('card-text');
    date.text((new Date(res.list[i].dt_txt).toLocaleDateString()))

    var conditions=$('<p>');
    conditions.addClass('card-text');
    conditions.text('Weather Conditions: '+res.list[i].weather[0].main)

    var temperature=$('<p>');
    temperature.addClass('card-text');
    temperature.text('Temperature: '+Math.round((res.list[i].main.temp - 273.15) * (9/5) + 32))
    
    var humidity=$('<p>');
    humidity.addClass('card-text');
    humidity.text('Humidity: ' + res.list[i].main.humidity);

    var windSpeed=$('<p>');
    windSpeed.addClass('card-text');
    windSpeed.text('Wind Speed: '+ res.list[i].wind.speed)

    cardBody.append(heading);
    cardBody.append(date);
    cardBody.append(conditions);
    cardBody.append(temperature);
    cardBody.append(humidity);
    cardBody.append(windSpeed);
    card.append(cardBody);
    
    $('#forecast-output').append(card);
}
}
});
};

// creating onclick for weathersearch function/search button
$('#searchBtn').on('click',function(event){
    event.preventDefault();
    var searchWeather = document.querySelector('#searched-city')
    var nameOfCity = document.getElementById('keyTerm').value
    localStorage.setItem('city', JSON.stringify(nameOfCity));
    prevSearches.push(nameOfCity);
    
    var searchWeather=document.querySelector('#searched-city')
    searchWeather.innerHTML="",
    weatherSearch();
    
});