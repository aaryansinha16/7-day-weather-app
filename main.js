let apiKey = `51fe8f41a855daa11645cd286d8d74b4`

async function getData(){
    let city = document.querySelector("#city").value
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`// Url for taking longitude, latitude data for further use
    let res = await fetch(url)
    // console.log(res.statusText)
    if(res.statusText == 'Not Found'){
        document.querySelector("#container").innerHTML = 'Page Not Found'
        document.querySelector("#container").style.color = 'white'
    }
    let latLonData = await res.json()

    // console.log(latLonData)
    let lat = latLonData.coord.lat
    let lon = latLonData.coord.lon



    let mainUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}`

    let mainRes = await fetch(mainUrl)
    let data = await mainRes.json()
    // data.daily.days = ['mon', 'tue', 'wed', 'thru', 'fri', 'sat', 'sun']
    // data.daily[0].days = 'mon'
    // data.daily[1].days = 'tue'
    console.log(data)
    data.daily.pop()// Used pop() because it was giving the data of 8 days, we need only 7 days, so by using pop we eleminated the last day
    append(data.daily)

}
// getData()

function append(data){
    let container = document.querySelector("#container")
    container.innerHTML = null
    data.forEach(function(elem){
        console.log(elem)
        let box = document.createElement("div")

        let date = document.createElement("p")
        date.innerText = elem.dt
        date.setAttribute("class",'date')

        let icon = `http://openweathermap.org/img/wn/${elem.weather[0].icon}.png`
        
        let img = document.createElement("img")
        img.setAttribute('src', icon)
        img.setAttribute("class", 'img')

        let max = document.createElement("p")
        max.innerText = elem.temp.max
        max.setAttribute("class", 'max')

        let min = document.createElement("p")
        min.innerText = elem.temp.min
        min.setAttribute("class", 'min')

        box.append(date, img, max, min)
        container.append(box)
    })
}
