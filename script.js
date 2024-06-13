document.querySelector('.busca').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.querySelector('#searchInput').value;
    if(!input){
        limpar()
        avisos('*Você precisa digitar alguma localização')
    }
    limpar();
    avisos("Carregando...")
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=5b766de5f6eaf8abc6fc07b1198b055a&units=metric&lang=pt_br`
    let resultado = await fetch(url);
    let json = await resultado.json();
    if(json.cod === 200){
        info({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            tempDesc: json.weather[0].description,
            windAngle: json.wind.deg,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min
        })
    } else {
        limpar()
        avisos("*A cidade digitada não foi encontrada!")
    }
})
function info(json){
    avisos('')
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.tempoatual').innerHTML = `${json.tempDesc}`;
    document.querySelector('.tempMin').innerHTML = `❄️ Temp mín. ${json.tempMin}<sup>ºC</sup>`;
    document.querySelector('.tempMax').innerHTML = `🌡️ Temp máx. ${json.tempMax}<sup>ºC</sup>`;
    document.querySelector('.umidadeInfo').innerHTML = `${json.humidity}<span>%</span>`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`
    document.querySelector('.resultado').style.display = 'block';
    }
function avisos(msg){
    document.querySelector('.aviso').innerHTML = msg;
}
function limpar(){
    avisos('')
    document.querySelector('.resultado').style.display = 'none';
}