const apikey = '6471c97a3bfddc9bfeec7667391b07b5';
const container = document.getElementById('container');
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// API URL
const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

// API'den bilgileri alma
async function lokasyonBilgisi(city) {
    try {
        const resp = await fetch(url(city));
        const respData = await resp.json();

        if (respData.cod === 404) {
            uyariMesaji();
        } else if (respData.main && respData.weather) {
            havaDurumuBilgisi(respData);
        }
    } catch (error) {
        console.error(error);
        uyariMesaji();
    }
}

// Hava durumu bilgilerini ekrana basma
function havaDurumuBilgisi(data) {
    const temp = dereceCevirme(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML = `
        <h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
            ${temp}°C
        </h2>
        <small>${data.weather[0].main} - </small>
        <small><label>${data.sys.country}</label>,</small>
        <small>${data.name}</small>
    `;
    main.innerHTML = '';
    main.appendChild(weather);
}

// Form submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value.trim();
    if (city) {
        lokasyonBilgisi(city);
    } else {
        uyariMesaji();
    }
});
// Kelvin -> Celsius
function dereceCevirme(K) {
    return Math.floor(K);
}

// Uyarı mesajı
function uyariMesaji() {
    const notif = document.createElement('div');
    notif.classList.add('mesaj');
    notif.innerText = 'Konum bilgisi bulunmamaktadır!!!';
    container.appendChild(notif);
    setTimeout(() => {
        notif.remove();
    }, 2000);
    main.innerHTML = ''; // Hava dur
}
