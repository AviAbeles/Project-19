var tower, towerImg, ghost, ghostImg, door, doorImg, doorGroup,climber, climberImg, climberGroup;
var invisibleBlock, invisibleBlockGroup;
var gamestate = "play"

function preload(){
  towerImg = loadImage("tower.png")
  ghostImg = loadImage("ghost-standing.png")
  doorImg = loadImage("door.png")
  climberImg = loadImage("climber.png")
}

function setup(){
  createCanvas(600,600)
  tower = createSprite(300,300)
  tower.addImage("tower", towerImg)
  tower.velocityY = 1

  ghost = createSprite(200,200,50,50)
  ghost.scale = 0.4
  ghost.addImage("ghost", ghostImg)

  doorGroup = new Group()
  climberGroup = new Group()
  invisibleBlockGroup = new Group()
}

function draw(){
  background("grey")

  if(gamestate == "play") {
    if(tower.y > 400) {
      tower.y=300
    }
    if(keyDown("space")) {
      ghost.velocityY = -10
    }
    ghost.velocityY += 0.8

    if(keyDown("left_arrow")) {
      ghost.x -= 3
    }
    if(keyDown("right_arrow")) {
      ghost.x += 3
    }
    spawnDoors()
    if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      gamestate = "end"
      ghost.destroy()
    }
    
  }

  drawSprites()
}

function spawnDoors() {
if(frameCount % 200 == 0) {
  door = createSprite(200,-50)
  climber = createSprite(200,10)
  invisibleBlock = createSprite(200,15)
  invisibleBlock.width = climber.width
  invisibleBlock.height = 2
  door.addImage(doorImg)
  climber.addImage(climberImg)
  door.x=Math.round(random(120,400))
  climber.x=door.x
  invisibleBlock.x=door.x
  door.velocityY = 1
  climber.velocityY = 1
  invisibleBlock.velocityY = 1
  door.lifetime = 800
  climber.lifetime = 800
  invisibleBlock.lifetime = 800
  doorGroup.add(door)
  climberGroup.add(climber)
  invisibleBlockGroup.add(invisibleBlock)
  ghost.depth = door.depth
  ghost.depth += 1
  invisibleBlock.debug = true 
} 
}