
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyByCQzjtw1AvHy71bLi1WrL2VY07fInKPE",
    authDomain: "unit-4-game.firebaseapp.com",
    databaseURL: "https://unit-4-game.firebaseio.com",
    projectId: "unit-4-game",
    storageBucket: "unit-4-game.appspot.com",
    messagingSenderId: "243353591405",
    appId: "1:243353591405:web:015832b50c434437"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

let database = firebase.database()
let scoreboard = {}
let game = document.getElementById("game")
let x 
let y 
let dd
let ddd
let a 
let b
let direction_h
let direction_v
let direction_hh
let direction_vv
let speed_h
let speed_v
let level
let time
let score;

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = width/1016
  x = 20
  y = 30
  dd = 40
  ddd = 59
  a = 35
  b = 45
  d = [10,155,250,325]
  e = [60,335,30,199]
  direction_h = 1
  direction_v = 1
  direction_hh = [1,1,1,1]
  direction_vv = [1,1,1,1]
  speed_h = 7
  speed_v = 6
  level = 1
  time = 100
  score = 0
}

function draw() {
  if(time > 0) {
  background(66, 244, 191);
  fill(51,110,204);
  circle(x,y,56*s);
  fill(244, 173, 66);
  circle(a,b,45*s);
  fill(244, 95, 66)
  if(touches.length == 0) {
    if(keyIsDown(LEFT_ARROW)){
     x = x - 5
   }
    if(keyIsDown(RIGHT_ARROW)){
     x = x + 5
   }
    if(keyIsDown(DOWN_ARROW)){
     y = y + 5
   }
    if(keyIsDown(UP_ARROW)){
     y = y - 5
   }
  }
else {
   x = touches[0].x
   y = touches[0].y
}
  a = a + 3*direction_h
  b = b + 5*direction_v
  if(a > width || a < 0) {
    direction_h = direction_h * -1
  }
  if(b > height || b < 0){
    direction_v = direction_v * -1
  }

  if(dist(x,y,a,b) < 56 + 45) {
    score = score + 1
  }  

  for (i=0; i<4; i=i+1) {
      circle(d[i],e[i],72*s)
      d[i] = d[i] + speed_h*direction_hh[i]
      e[i] = e[i] + speed_v*direction_vv[i]
        if(d[i] > width || d[i] < 0) {
        direction_hh[i] = direction_hh[i] * -1
      }
      if(e[i] > height || e[i] < 0){
        direction_vv[i] = direction_vv[i] * -1
      }

      if(dist(x,y,d[i],e[i]) < 56*s + 45*s) {
        score = score - 1
      }
      if (score>50 && level == 1){
        speed_h = speed_h + 2
        speed_v = speed_v + 3
        level = 2
     }
    if (score>100 && level == 2){
        speed_h = speed_h + 4
        speed_v = speed_v + 4
        level = 3
     }
    if (score>150 && level == 3){
        speed_h = speed_h + 5
        speed_v = speed_v + 6
        level = 4
     }
    if (score>170 && level == 4){
        speed_h = speed_h + 7
        speed_v = speed_v + 5
        level = 5
     }
    if (score>170 && level == 5){
        speed_h = speed_h + 8
        speed_v = speed_v + 6
        level = 6
     }
  }

  textSize(30) 
     text("Score: "+ score,x,y)
     text("Time: "+ time.toFixed(1),dd,ddd)
     time = time - 0.1
  } 
  else {
    game.innerHTML="Name? <input id='den'><button onclick='restart()'>Restart</button><button onclick='generate_alltime_leaderboard()'>All-time leaderboard</button>"
    noLoop()
  }
}

function restart() {
  let den = document.getElementById("den")
  name = den.value
  database.ref(name).set(score)
  if (name != "") {
    scoreboard[name] = score
  }
  alert("Scoreboard: "+JSON.stringify(scoreboard,null,1))
  time = 100
  score = 0
  loop()
  game.innerHTML = ""
  generate_leaderboard()
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
  alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}
function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()






