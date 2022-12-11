const wsUri = "wss://echo-ws-service.herokuapp.com";

const btn = document.querySelector(".j-btn");
const outP = document.getElementById("#output");
const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');

let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
};

websocket = new WebSocket(wsUri);
  
btn.addEventListener('click', () => {
let input = document.getElementById("input").value;
// event.preventDefault();
console.log(input)

  websocket.onmessage = function(evt) {
    writeToScreen(
      '<span style="color: blue;">RESPONSE: ' + evt.data + mapLink +'</span>'
    );
    console.log(mapLink)
  };
  
  let message = input;
  writeToScreen("SENT: " + message);
  websocket.send(message);
  
});

mapLink.addEventListener("click", () => {
  mapLink.href = '';
  mapLink.textContent = '';
  
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Ссылка на карту';
}