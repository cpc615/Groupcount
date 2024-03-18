function createScoreboard() {
  var numTeams = document.getElementById('numTeams').value;
  var scoreboard = document.getElementById('scoreboard');
  scoreboard.innerHTML = ''; // Clear the scoreboard

  for (var i = 1; i <= numTeams; i++) {
    // Create team score block
    var teamDiv = document.createElement('div');
    teamDiv.className = 'team';
    teamDiv.innerHTML = `
      <h2>Team ${i}</h2>
      <div class="score">0</div>
      <button class="btn add" onclick="changeScore(this, 1)">Add Point</button>
      <button class="btn subtract" onclick="changeScore(this, -1)">Subtract Point</button>
    `;
    scoreboard.appendChild(teamDiv);
  }
  
  // Display the view ranking button
  document.getElementById('rankBtn').style.display = 'block';
}

function changeScore(button, increment) {
  var scoreDiv = button.previousElementSibling;
  var newScore = parseInt(scoreDiv.textContent) + increment;
  scoreDiv.textContent = (newScore >= 0) ? newScore : 0;
}

function showRanking() {
  var teams = document.querySelectorAll('.team');
  var rankingDiv = document.getElementById('ranking');
  rankingDiv.innerHTML = ''; // Clear the ranking

  var scores = Array.from(teams).map(function(team) {
    return {
      name: team.querySelector('h2').textContent,
      score: parseInt(team.querySelector('.score').textContent)
    };
  });

  // Sort by score
  scores.sort(function(a, b) { return b.score - a.score; });

  // Create a ranking list
  var list = document.createElement('ol');
  for (var i = 0; i < scores.length; i++) {
    var item = document.createElement('li');
    item.textContent = `${scores[i].name} - Score: ${scores[i].score}`;
    list.appendChild(item);
  }

  rankingDiv.appendChild(list);
  rankingDiv.style.display = 'block'; // Display the ranking
}

window.onload = function() {
  // Hide the ranking button on initialization
  document.getElementById('rankBtn').style.display = 'none';
};
