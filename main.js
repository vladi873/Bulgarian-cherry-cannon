/* ---------- ДАННИ ЗА ЧАСТИТЕ ---------- */

const data = {

barrel: {
title: "Дървена цев",
text: "Издълбана от масивно черешово дърво. Формата е груба и несиметрична.",
video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
},

bands: {
title: "Железни обръчи",
text: "Металните обръчи намаляват риска от разцепване при изстрел."
}

};


/* ---------- ИЗБОР НА ЧАСТ ---------- */

function selectPart(key) {

const part = data[key];

const count = snapshot.numChildren();
document.getElementById("onlineCount").innerText = count;

const media = document.getElementById("media");

media.innerHTML = "";

if (part.video) {

media.innerHTML = `
<iframe width="100%" height="220"
src="${part.video}"
allowfullscreen></iframe>`;

}

}


/* ---------- КАРТА ---------- */

const map = L.map('map').setView([30,10],2);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
maxZoom:19
}).addTo(map);



/* ---------- FIREBASE CONFIG ---------- */

const firebaseConfig = {

apiKey: "AIzaSyCxVXhOTV9RfmZlMEnqyda2peavgec27RU",
  authDomain: "cherry-cannon.firebaseapp.com",
  databaseURL: "https://cherry-cannon-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cherry-cannon",
  storageBucket: "cherry-cannon.firebasestorage.app",
  messagingSenderId: "33268269491",
  appId: "1:33268269491:web:e53b465f590d350a8bcbc6",
  measurementId: "G-1480YS0HC3"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();



/* ---------- ВЗИМА ЛОКАЦИЯ НА ПОТРЕБИТЕЛЯ ---------- */

fetch("https://ipapi.co/json/")
.then(res => res.json())
.then(data => {

const lat = data.latitude;
const lon = data.longitude;

const userRef = db.ref("visitors").push();

userRef.set({
lat: lat,
lon: lon
});

userRef.onDisconnect().remove();

});


/* ---------- ПОКАЗВА ВСИЧКИ ТОЧКИ ---------- */

const markers = [];

db.ref("visitors").on("value", snapshot => {

const count = snapshot.numChildren();

document.getElementById("onlineCount").innerText = count;


/* маха старите точки */

markers.forEach(m => map.removeLayer(m));

markers.length = 0;


/* добавя новите */

snapshot.forEach(child => {

const v = child.val();

const marker = L.circleMarker(
[v.lat, v.lon],
{
radius: 6,
color: "#ff9800",
fillColor: "#ff9800",
fillOpacity: 0.8
}
).addTo(map);

markers.push(marker);

});

});