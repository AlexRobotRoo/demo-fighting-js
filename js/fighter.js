class Fighter extends Sprite {
    constructor({
      position,
      velocity,
      color = 'red',
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 },
      sprites,
      attackBox = { offset: {}, width: undefined, height: undefined },
      direction = ''
    }) {
      super({
        position,
        imageSrc,
        scale,
        framesMax,
        offset
      })
  
      this.velocity = velocity
      this.width = 50
      this.height = 150
      this.lastKey
      this.attackBox = {
        position: {
          x: this.position.x,
          y: this.position.y
        },
        offset: attackBox.offset,
        width: attackBox.width,
        height: attackBox.height
      }
      this.color = color
      this.isAttacking
      this.health = 100
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 10
      this.sprites = sprites
      for (const spriteKey in this.sprites) {
        this.sprites[spriteKey].image = new Image()
        this.sprites[spriteKey].image.src = this.sprites[spriteKey].imageSrc;
        this.sprites[spriteKey].image.onload = () => {
            console.log('Спрайт успешно загружен!')
        };
      }

      this.direction = direction        
    }
  
    update() {
      this.draw()
      this.animateFrames()

      // Атак бокс
      this.attackBox.position.x = this.position.x + this.attackBox.offset.x
      this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        
      // Отрисовка границ атак бокса
      // c.fillRect(
      //   this.attackBox.position.x,
      //   this.attackBox.position.y,
      //   this.attackBox.width,
      //   this.attackBox.height
      // )
  
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y

      // Отрисовка границ игрока
      //c.fillRect(this.position.x, this.position.y, this.width, this.height)  
        
      // Обработка вертикального движения
      if (this.position.y > 0 && this.position.y < canvas.height - this.offset.y) {
        this.velocity.y += gravity
      }
      
      if (this.position.y + this.height + this.offset.y >= canvas.height){
          this.velocity.y = 0
      }
    }    
  
    attack() {
      if (this.direction === 'right')
        this.switchSprite('attack_right')
      else if (this.direction === 'left')
        this.switchSprite('attack_left')
      
      this.isAttacking = true
    }

    switchSprite(spriteName) {
      const sprite = this.sprites[spriteName];
      
      if (!sprite) return;
      
      if (this.image !== sprite.image) {
          this.image = sprite.image;
          this.framesMax = sprite.framesMax;
          this.framesCurrent = 0;
      }
    }

  }