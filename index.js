const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.5
let isGameEnd = false

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './assets/images/backgrounds/background6.jpg'
})

const player = new Fighter({
  position: {
    x: 0,
    y: 200
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 60
  },
  imageSrc: './assets/images/Trump/trump_idle_right.png',
  framesMax: 1,
  scale: 1, 
  sprites: {
    idle_right: {
      imageSrc: './assets/images/Trump/trump_idle_right.png',
      framesMax: 1
    },
    run_right: {
      imageSrc: './assets/images/Trump/trump_run_right.png',
      framesMax: 5
    },
    jump_right: {
      imageSrc: './assets/images/Trump/trump_jump_right.png',
      framesMax: 1
    },
    attack_right: {
      imageSrc: './assets/images/Trump/trump_attack_right.png',
      framesMax: 1
    },
    idle_left: {
      imageSrc: './assets/images/Trump/trump_idle_left.png',
      framesMax: 1
    },
    run_left: {
      imageSrc: './assets/images/Trump/trump_run_left.png',
      framesMax: 5
    },
    jump_left: {
      imageSrc: './assets/images/Trump/trump_jump_left.png',
      framesMax: 1      
    },
    attack_left: {
      imageSrc: './assets/images/Trump/trump_attack_left.png',
      framesMax: 2
    } 
  },
  attackBox: {
    offset: {
      x: 0,
      y: 0
    },
    width: 150,
    height: 50
  },
  direction: 'right'
})

const enemy = new Fighter({
  position: {
    x: canvas.width - 150,
    y: 200
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: 0,
    y: 58
  },
  imageSrc: './assets/images/Biden/biden_idle_left.png',
  framesMax: 1,
  scale: 1,  
  sprites: {
    idle_left: {
      imageSrc: './assets/images/Biden/biden_idle_left.png',      
      framesMax: 1
    },
    run_left: {
      imageSrc: './assets/images/Biden/biden_run_left.png',
      scale: 0.4,
      framesMax: 6
    },
    jump_left: {
      imageSrc: './assets/images/Biden/biden_jump_left.png',
      framesMax: 1
    },    
    attack_left: {
      imageSrc: './assets/images/Biden/biden_attack_left.png',
      framesMax: 1
    },
    idle_right: {
      imageSrc: './assets/images/Biden/biden_idle_right.png',      
      framesMax: 1
    },
    run_right: {
      imageSrc: './assets/images/Biden/biden_run_right.png',
      scale: 0.4,
      framesMax: 6
    },
    jump_right: {
      imageSrc: './assets/images/Biden/biden_jump_right.png',
      framesMax: 1
    },    
    attack_right: {
      imageSrc: './assets/images/Biden/biden_attack_right.png',
      framesMax: 1
    }

  },
  attackBox: {
    offset: {
      x: 0,
      y: 0
    },
    width: 150,
    height: 50
  },
  direction: 'left'
})

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

function showRefreshScreen() {
  const refreshScreen = document.createElement('div');
  refreshScreen.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999;">
          <h1 style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white;">Game Over! Перезагрузите страницу, чтобы начать новую игру.</h1>
      </div>
  `;
 
  document.body.appendChild(refreshScreen);
}

decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()  

  // Управление движением игрока (Трамп)
  player.velocity.x = 0
  if (keys.a.pressed && player.lastKey === 'a') {
    if (player.position.x <= 5) {
      player.velocity.x = 0
    } else {
        player.velocity.x = -5
    }
    player.direction = 'left'
    player.switchSprite('run_left')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    if (player.position.x + player.width + player.velocity.x + 55 >= canvas.width) {
        player.velocity.x = 0
    } else {
        player.velocity.x = 5
    }
    player.direction = 'right'
    player.switchSprite('run_right')
  } else {
    if (player.direction === 'left')
        player.switchSprite('idle_left')
    else if (player.direction === 'right')
        player.switchSprite('idle_right')
  }

  if (player.velocity.y < 0) {
    if (player.direction === 'left')
        player.switchSprite('jump_left')
    else if (player.direction === 'right')
        player.switchSprite('jump_right')
  }

  // Управление движением соперника(Байден)
  enemy.velocity.x = 0
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    if (enemy.position.x <= 0) {
        enemy.velocity.x = 0
    } else {
        enemy.velocity.x = -5
    }   
    enemy.direction = 'left'
    enemy.switchSprite('run_left')

  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    if (enemy.position.x + enemy.width + enemy.velocity.x + 50 >= canvas.width) {
            enemy.velocity.x = 0
        } else {
            enemy.velocity.x = 5
        }
    enemy.direction = 'right'
    enemy.switchSprite('run_right')    
  } else {
    if (enemy.direction === 'left')
        enemy.switchSprite('idle_left')
    else if (enemy.direction === 'right')
        enemy.switchSprite('idle_right')
  }
  
  if (enemy.velocity.y < 0) {
    if (enemy.direction === 'left')
    enemy.switchSprite('jump_left')
    else if (enemy.direction === 'right')
      enemy.switchSprite('jump_right')
    console.log(enemy.position.y)
  }  
  
  // Определение взаимодействия по Атак боксу
  if (rectangularCollision({ rectangle1: player, rectangle2: enemy}) && player.isAttacking){
    player.isAttacking = false        
    enemy.health -= 10 //Math.floor(Math.random() * 15) + 1
    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    console.log('player hit')       
  }

  if (rectangularCollision({ rectangle1: enemy, rectangle2: player}) && enemy.isAttacking){
      enemy.isAttacking = false
      player.health -= 10 //Math.floor(Math.random() * 15) + 1
      document.querySelector('#playerHealth').style.width = player.health + '%'
      console.log('enemy hit')
  }

  // Проверяем здоровье игроков для определения победителя
  if (enemy.health <= 0 || player.health <= 0){
      determineWinner({ player, enemy, timerId })          
  } 
}

animate()

window.addEventListener('keydown', (event) => {
    if (isGameEnd) {
      return
    }

    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      case 'w':
          if (player.position.y <= 50){
              player.velocity.y = gravity
          } else
              player.velocity.y = -5               
          break
      case ' ':        
        player.attack()
        break
    } 
 
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        enemy.direction = 'right'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        enemy.direction = 'left'
        break
      case 'ArrowUp':
        if (enemy.position.y <= 50){
            enemy.velocity.y = gravity
        } else
            enemy.velocity.y = -5
        break
      case 'ArrowDown':
        enemy.attack()
        break
    }
  
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }
  
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})
