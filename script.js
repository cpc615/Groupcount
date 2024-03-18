// This function creates the scoreboard based on the number of teams entered
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

// This function updates the score for a team
function changeScore(button, increment) {
  var scoreDiv = button.previousElementSibling; // Get the div that displays the score
  var currentScore = parseInt(scoreDiv.textContent); // Get the current score
  var newScore = currentScore + increment; // Calculate the new score

  // Ensure new score is not negative
 if (newScore < 0) {
    newScore = 0;
  }
  scoreDiv.textContent = newScore; // Update the score display
}

// This function shows the ranking of all teams
function showRanking() {
  var teams = document.querySelectorAll('.team');
  var rankingDiv = document.getElementById('ranking');
  rankingDiv.innerHTML = ''; // Clear the ranking
  
  // Map each team to an object with name and score
  var scores = Array.from(teams).map(function(team) {
    return {
      name: team.querySelector('h2').textContent,
      score: parseInt(team.querySelector('.score').textContent)
    };
  });

  // Sort the teams by score in descending order
  scores.sort(function(a, b) { return b.score - a.score; });

  // Create a list to display the ranking
  var list = document.createElement('ol');
  for (var i = 0; i < scores.length; i++) {
    var item = document.createElement('li');
    item.textContent = `${scores[i].name} - Score: ${scores[i].score}`;
    list.appendChild(item);
  }

  rankingDiv.appendChild(list);
  rankingDiv.style.display = 'block'; // Show the ranking
}

// This function hides the ranking button on page load
window.onload = function() {
  document.getElementById('rankBtn').style.display = 'none';
};
