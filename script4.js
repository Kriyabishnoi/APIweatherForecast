const searchBtn = document.querySelector("#search");
const searchInput = document.querySelector("input");
const tempratureElem = document.querySelector(".temprature");
const locationElem = document.querySelector(".location");
const timeDateElem = document.querySelector(".time");
const dayElem = document.querySelector(".day");
const dateElem = document.querySelector(".date");
const emojiImg=document.querySelector(".emoji");
const cond=document.querySelector(".condition");
searchBtn.addEventListener("click", function() {
    const location = searchInput.value;
    if (location != "") {
        fetchWeather(location).then((data) => {
            if (data == null) {
                // Handle null data here if needed
            } else {
                updateDOM(data);
            }
        });
        searchInput.value = "";
    }
});

function updateDOM(data) {
    console.log("hello");
    const temp = data.current.temp_c;
    const location = data.location.name;
    const timeData = data.location.localtime;
    const [date, time] = timeData.split(" ");
    const iconLink = data.current.condition.icon;
    const condition = data.current.condition.text; // Updated to use text for condition
    
    console.log("`````````````````````");
    console.log("temp: ", temp, "location : ", location, "Date: ", date);
    console.log("Time: ", time, "link", iconLink);
    console.log("````````````````````");

    tempratureElem.textContent = `${temp}°C`;
    locationElem.textContent = location;
    timeDateElem.textContent = ` ${time} ${date}`;
    // Update dayElem and dateElem if you have that information
    emojiImg.src=iconLink;
    cond.textContent=condition;
}

async function fetchWeather(location) {
    const url = `http://api.weatherapi.com/v1/current.json?key=c24118a9b52e42ef91a172953241407&q=${location}&aqi=no`;

    try {
        const response = await fetch(url);
        if (response.status == 404) {
            alert("Data not found");
            return null;
        } else if (response.status == 400) {
            alert("Location is invalid");
            return null;
        } else if (response.status == 200) {
            const json = await response.json();
            console.log(json);
            return json;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching the weather data.");
        return null;
    }
}
