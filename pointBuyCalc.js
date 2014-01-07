maxPoints = 30;

function validateScores(str, dex, con, int, wis, cha) {
  if(arguments.length !== 6) {
    err = "Invalid number of scores";
  }
  var scores = [];
  var err = '';
  for(var i=0;i<6;i++) {
    try {
      val = parseInt(arguments[i], 10);
      scores.push(val);
    } catch(e) {
      err = "All values must be numbers";
    }
  }
  scores.forEach(function(score) {
    if(score < 6) err = "Score too low: min 6";
    if(score > 18) err = "Score too high: max 18";
    if(score % 1 !== 0) err = "Score must be integer";
  });
  if(scores.filter(function(score) { return score < 10; }).length > 3) {
    err = "Too many negative scores: max 3";
  }
  if(scores.filter(function(score) { return score < 8; }).length > 2) {
    err = "Too many scores below 8: max 2";
  }
  var cost = 0;
  var table = {
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 6,
    15: 8,
    16: 10,
    17: 13,
    18: 16
  };
  scores.forEach(function(score) {
    //Reduce cost by the amount below 8 we are
    if(score <= 8) cost += (score - 8);
    else if(score <= 18) cost += table[score];
    else cost += Math.floor(score * 1.2);
  });
  return [cost,err];
}

function updateScores() {
  var scores = [];
  for(var i=1;i<=6;i++) {
    var score = document.querySelector('#ability' + i);
    scores.push(score.value);
  }
  var pointsAndErr = validateScores.apply(this, scores);
  var points = pointsAndErr[0];
  var err = pointsAndErr[1];
  document.querySelector("#reason").innerHTML = err;
  document.querySelector("#points").innerHTML = (30 - points).toString();
  if(points <= 30) {
    document.querySelector("#validity").innerHTML = "&#x2713;";
  } else {
    document.querySelector("#validity").innerHTML = "&#x2717;";
    document.querySelector("#reason").innerHTML = "Too many points spent";
  }
}

for(var i=1;i<=6;i++) {
  var score = document.querySelector('#ability' + i);
  score.onchange = updateScores;
}

updateScores();
