function createScoreboard() {
    var numTeams = document.getElementById('numTeams').value;
    var scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = ''; // 清空計分板
  
    for (var i = 1; i <= numTeams; i++) {
      // 創建小組計分區塊
      var teamDiv = document.createElement('div');
      teamDiv.className = 'team';
      teamDiv.innerHTML = `
        <h2>Team ${i}</h2>
        <div class="score">0</div>
        <button class="btn add" onclick="changeScore(this, 1)">ADD</button>
        <button class="btn subtract" onclick="changeScore(this, -1)">DEDUCT</button>
      `;
      scoreboard.appendChild(teamDiv);
    }
    
    // 顯示查看排名按鈕
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
    rankingDiv.innerHTML = ''; // 清空排名
  
    var scores = Array.from(teams).map(function(team) {
      return {
        name: team.querySelector('h2').textContent,
        score: parseInt(team.querySelector('.score').textContent)
      };
    });
  
    // 根據分數排序
    scores.sort(function(a, b) { return b.score - a.score; });
  
    // 創建排名列表
    var list = document.createElement('ol');
    for (var i = 0; i < scores.length; i++) {
      var item = document.createElement('li');
      item.textContent = `${scores[i].name} - scores: ${scores[i].score}`;
      list.appendChild(item);
    }
  
    rankingDiv.appendChild(list);
    rankingDiv.style.display = 'block'; // 顯示排名
  }
  
  window.onload = function() {
    // 初始化時隱藏排名按鈕
    document.getElementById('rankBtn').style.display = 'none';
  };
