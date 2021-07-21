var userInfor = [];
const EASY_TIME = 60,
  MEDIUM_TIME = 90,
  HARD_TIME = 120;
const EASY_SIZE = 36,
  MEDIUM_SIZE = 64,
  HARD_SIZE = 100;
var arrayEasy = numberBox(36),
  arrayMedium = numberBox(64),
  arrayHard = numberBox(100);
var timeRemain = 0,
  score = 0;
if (!localStorage.getItem("userInfor")) {
  localStorage.setItem("userInfor", JSON.stringify([]));
  userInfor = [];
} else {
  userInfor = JSON.parse(localStorage.getItem("userInfor"));
}
userInfor.sort(compare);
function commonAction(classAdd, classRemove) {
  document.getElementById(classAdd).classList.add("none");
  document.getElementById(classRemove).classList.remove("none");
}
function numberBox(number) {
  let array = [];
  while (array.length !== number) {
    let n = Math.floor(Math.random() * number + 1);
    if (array.indexOf(n) === -1) {
      array.push(n);
    }
  }
  return array;
}
function showNumber(number, area) {
  let displayNumber = "";
  let arrayNumber = numberBox(number);
  arrayNumber.map((value, key) => {
    displayNumber += `<div class="play-items element" id="${area}-item-${key}" onClick="select(${value},'${area}-item-${key}','${area}')">${value}</div>`;
  });
  document.getElementById(area).innerHTML = displayNumber;
}
function wrongSelect(id) {
  document.getElementById(id).classList.remove("element");
  document.getElementById(id).classList.add("bg-red");
  setTimeout(() => {
    document.getElementById(id).classList.remove("bg-red");
  }, 500);
}
function select(value, id, area) {
  if (area === "play-easy-area") {
    if (arrayEasy.indexOf(value - 1) === -1) {
      console.log(value);
      document.getElementById(id).innerHTML = "";
      arrayEasy[arrayEasy.indexOf(value)] = 0;
      updateScore(area);
      document.getElementById(id).setAttribute("onclick", null);
    } else {
      wrongSelect(id);
    }
  } else if (area === "play-medium-area") {
    if (arrayMedium.indexOf(value - 1) === -1) {
      document.getElementById(id).innerHTML = "";
      arrayMedium[arrayMedium.indexOf(value)] = 0;
      updateScore(area);
      document.getElementById(id).setAttribute("onclick", null);
    } else {
      wrongSelect(id);
    }
  } else {
    if (arrayHard.indexOf(value - 1) === -1) {
      document.getElementById(id).innerHTML = "";
      arrayHard[arrayHard.indexOf(value)] = 0;
      updateScore(area);
      document.getElementById(id).setAttribute("onclick", null);
    } else {
      wrongSelect(id);
    }
  }
}
function exitGame(level) {
  let check = confirm("Do you want to exit?");
  if (check) {
    if (level === "easy") {
      commonAction("easy-id", "menu");
    } else if (level === "medium") {
      commonAction("medium-id", "menu");
    } else {
      commonAction("hard-id", "menu");
    }
    window.location.reload();
  }
}
function countdown(starting, countdownArea, array, size) {
  timeRemain = starting - 1;
  var myVar = setInterval(() => {
    if (timeRemain >= 0) {
      if (array.indexOf(size) !== -1) {
        let minutes = Math.floor(timeRemain / 60);
        let seconds = timeRemain % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.getElementById(
          countdownArea
        ).innerHTML = `${minutes}:${seconds}`;
        timeRemain--;
      } else {
        setTimeout(() => {
          clearInterval(myVar);
          alert("YOU WIN <3");
          document.getElementById("your-score").innerHTML = score;
          document.getElementById("form-id").style.display = "block";
        }, 0);
      }
    } else {
      setTimeout(() => {
        clearInterval(myVar);
        alert("GAME OVER !!!");
        document.getElementById("your-score").innerHTML = score;
        document.getElementById("form-id").style.display = "block";
      }, 0);
    }
  }, 1000);
}
function updateScore(area) {
  score += 5 * timeRemain;
  if (area === "play-easy-area") {
    document.getElementById("easy-score").innerHTML = score;
  } else if (area === "play-medium-area") {
    document.getElementById("medium-score").innerHTML = score;
  } else {
    document.getElementById("hard-score").innerHTML = score;
  }
  return score;
}
function openGame(classRemove, size, area, starting, countdownArea, array) {
  let check = confirm("Are you ready?");
  if (check) {
    commonAction("id-1", classRemove);
    showNumber(size, area);
    countdown(starting, countdownArea, array, size);
  }
}
function createAccount() {
  let newAccount = {
    name: document.getElementById("nickname-id").value,
    scores: score,
    level: document.getElementById("level-select").value,
  };
  userInfor.push(newAccount);
  localStorage.setItem("userInfor", JSON.stringify(userInfor));
}
function compare(a, b) {
  return b.scores - a.scores;
}
function showRankings() {
  commonAction('menu','id-3');
  let easyCount=1,mediumCount=1,hardCount=1;
  let easyHtml='<div class="ranking-items"><b>EASY RANK</b></div><div class="ranking-items"><b>NICKNAME</b></div><div class="ranking-items"><b>SCORE</b></div>';
  let mediumHtml='<div class="ranking-items"><b>MEDIUM RANK</b></div><div class="ranking-items"><b>NICKNAME</b></div><div class="ranking-items"><b>SCORE</b></div>';
  let hardHtml='<div class="ranking-items"><b>HARD RANK</b></div><div class="ranking-items"><b>NICKNAME</b></div><div class="ranking-items"><b>SCORE</b></div>';
  userInfor.map((value) => {
    if(value.level==='easy'){
      easyHtml+=`<div class="ranking-items">${easyCount}</div>
      <div class="ranking-items">${value.name}</div>
      <div class="ranking-items">${value.scores}</div>`;
      easyCount++;
    }else if(value.level==='medium'){
      mediumHtml+=`<div class="ranking-items">${mediumCount}</div>
      <div class="ranking-items">${value.name}</div>
      <div class="ranking-items">${value.scores}</div>`;
      mediumCount++;
    }else{
      hardHtml+=`<div class="ranking-items">${hardCount}</div>
      <div class="ranking-items">${value.name}</div>
      <div class="ranking-items">${value.scores}</div>`;
      hardCount++;
    }
  });
  while(easyCount!==4){
    easyHtml+=`<div class="ranking-items">${easyCount}</div>
    <div class="ranking-items"></div>
    <div class="ranking-items"></div>`;
    easyCount++;
  }
  while(mediumCount!==4){
    mediumHtml+=`<div class="ranking-items">${mediumCount}</div>
    <div class="ranking-items"></div>
    <div class="ranking-items"></div>`;
    mediumCount++;
  }
  while(hardCount!==4){
    hardHtml+=`<div class="ranking-items">${hardCount}</div>
    <div class="ranking-items"></div>
    <div class="ranking-items"></div>`;
    hardCount++;
  }
  document.getElementById('easy-rankings').innerHTML=easyHtml;
  document.getElementById('medium-rankings').innerHTML=mediumHtml;
  document.getElementById('hard-rankings').innerHTML=hardHtml;
}
