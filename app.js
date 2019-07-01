
//Despues de que cargue la web, vamos a obtener la locacion
window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //Esta variable Proxy es porque sin ella nos daba un CORS error y no podiamos usar la API
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/4b6d24a920ff758bc9f195cd1bb31086/${lat},${long}`;
            
            //Esto va a traer informacion de la variable API que creeamos arriba
            fetch(api)
                .then(data => { //Una vez que la info llega (con fetch) queremos data.
                    return data.json();
            })
                .then(response => {
                    console.log(response);
                    
                    const {temperature, summary, icon} = response.currently;

                    //Seteamos los DOM elements de la API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = response.timezone;

                    //Formula para Celsius
                    let celsius = (temperature-32) * (5 / 9);
                    //Set Icon - LLamamos a la funcion
                    setIcons(icon, document.querySelector('.icon'));

                    //Cambiar de Farenheit a Celsius
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "°F") {
                            temperatureSpan.textContent = "°C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "°F";
                            temperatureDegree.textContent = Math.floor(temperature);
                        }
                    });

            }); 
        });

    } else {
        h1.textContent = "Hey This is not working because reasons"
    }

    function setIcons(icon, iconId) {
        var skycons = new Skycons({color: 'white'});
        //Esta linea de abajo lo que hace es reeplazar "-" por "_" 
        var currentIcon = icon.replace(/-/g, "_").toUpperCase();
        //La animacion
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
});