function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
      rectangle1.attackBox.position.x + rectangle1.attackBox.width > rectangle2.position.x &&
      rectangle1.attackBox.position.x < rectangle2.position.x + rectangle2.width &&        
      rectangle1.attackBox.position.y + rectangle1.attackBox.height > rectangle2.position.y &&
      rectangle1.attackBox.position.y < rectangle2.position.y + rectangle2.height
  )
}

let timer = 60
let timerId
function decreaseTimer() {    
  if (timer > 0){
      timerId = setTimeout(decreaseTimer, 1000)
      timer--
      document.querySelector('#timer').innerHTML = timer
  }

  if (timer === 0){
      determineWinner({ player, enemy, timerId })      
  }
}

function determineWinner({ player, enemy, timerId}) {
  clearTimeout(timerId)
  document.querySelector('#displayEndGameMessage').style.display = 'flex'

  if (player.health === enemy.health){
      document.querySelector('#displayEndGameMessage').innerHTML = 'НИЧЬЯ'           
  }
  else if (player.health > enemy.health){
      document.querySelector('#displayEndGameMessage').innerHTML = 'Trump wins!!!'
      player.switchSprite('win')
  }
  else if (player.health < enemy.health){
      document.querySelector('#displayEndGameMessage').innerHTML = 'Biden wins!!!'
      enemy.switchSprite('win') 
  }

  isGameEnd = true
  
  setTimeout(() => {
      showRefreshScreen();
  }, 3000);
}