namespace SpriteKind {
    export const Ghostee = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, myTiles.tile3, function (sprite, location) {
    game.over(true, effects.smiles)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Collision.vx <= 0) {
        Collision.vy += -30
    } else {
        Collision.vy += -12
    }
})
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    sprite.image.flipX()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    Collision.vy += 5
})
info.onLifeZero(function () {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
    Collision.setVelocity(0, 0)
    info.changeLifeBy(-1)
    music.pewPew.play()
    if (info.life() > 0) {
        tiles.placeOnTile(Collision, tiles.getTileLocation(0, 1))
        sprite.setFlag(SpriteFlag.Ghost, false)
        PlayerImage.startEffect(effects.coolRadial, 500)
    }
})
let gap: tiles.Location = null
let Baddee: Sprite = null
let Collision: Sprite = null
let PlayerImage: Sprite = null
music.setVolume(40)
tiles.setTilemap(tilemap`level`)
info.setLife(3)
let floorHeight = 4
PlayerImage = sprites.create(img`
    . . . . 6 6 6 6 6 6 6 6 . . . . 
    . . 6 6 6 9 9 9 9 9 9 6 6 6 . . 
    . 6 6 9 9 9 9 9 9 9 9 9 9 6 6 . 
    . 6 9 9 9 9 9 9 9 9 9 9 9 9 6 . 
    6 6 9 c c 1 9 9 9 9 c c 1 9 6 6 
    6 9 9 c c 1 9 9 9 9 c c 1 9 9 6 
    6 9 9 c c c 9 9 9 9 c c c 9 9 6 
    6 9 6 1 c c 9 9 9 9 1 c c 6 9 6 
    6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 
    6 9 9 6 9 9 9 9 9 9 9 9 6 9 9 6 
    6 9 9 9 c c c c c c c c 9 9 9 6 
    6 6 9 9 c b b b b b b c 9 9 6 6 
    . 6 9 9 9 c b b b b c 9 9 9 6 . 
    . 6 6 9 9 9 c c c c 9 9 9 6 6 . 
    . . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
    . . . 6 6 . . 6 6 . . 6 6 . . . 
    `, SpriteKind.Ghostee)
PlayerImage.setVelocity(0, 0)
PlayerImage.setFlag(SpriteFlag.Ghost, true)
Collision = sprites.create(img`
    . . . 2 2 2 2 . . . 
    . . 2 2 2 2 2 2 . . 
    . 2 2 2 2 2 2 2 2 . 
    . 2 2 2 2 2 2 2 2 . 
    2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 
    . 2 2 2 2 2 2 2 2 . 
    . 2 2 2 2 2 2 2 2 . 
    . . 2 2 2 2 2 2 . . 
    . . . 2 2 2 2 . . . 
    `, SpriteKind.Player)
Collision.setFlag(SpriteFlag.Invisible, true)
Collision.ay = 30
tiles.placeOnTile(Collision, tiles.getTileLocation(0, 1))
controller.moveSprite(Collision, 45, 0)
scene.cameraFollowSprite(Collision)
for (let index = 0; index <= 7; index++) {
    Baddee = sprites.create(img`
        . e e e e e e e . . . . . . . . 
        e 4 4 4 4 4 4 e e e e . . . . . 
        e 4 4 4 e e 4 4 4 4 e e e . . . 
        e 4 4 4 4 e e 4 4 4 4 4 e e . . 
        e 4 4 4 4 4 e e 4 4 4 4 4 e e . 
        e 4 4 4 e e e e 4 4 4 4 4 4 e . 
        e e 4 4 4 4 4 4 4 4 4 e e e e e 
        . e 4 4 4 4 4 4 d d e 4 4 4 4 e 
        . e 4 4 4 4 4 4 d e 4 4 4 4 4 e 
        . e 4 4 4 4 4 4 4 e 4 4 4 4 4 e 
        . e 4 4 4 4 4 4 e 4 4 4 4 4 4 e 
        . e 4 4 4 4 4 4 4 4 4 4 4 4 4 e 
        . . e 4 4 4 4 4 4 4 4 4 4 4 e . 
        . . e 4 4 4 4 4 4 4 4 4 4 4 e . 
        . . . e e 4 4 4 4 4 4 4 e e . . 
        . . . . . e e e e e e e . . . . 
        `, SpriteKind.Enemy)
    tiles.placeOnTile(Baddee, tiles.getTileLocation(randint(0, 9), floorHeight * index + 6))
    Baddee.setVelocity(50, 0)
    Baddee.setFlag(SpriteFlag.BounceOnWall, true)
}
for (let index2 = 0; index2 <= 5; index2++) {
    gap = tiles.getTileLocation(randint(1, 8), floorHeight * index2 + 3)
    tiles.setTileAt(gap, myTiles.transparency16)
    tiles.setWallAt(gap, false)
}
game.onUpdateInterval(10, function () {
    PlayerImage.setPosition(Collision.x, Collision.y)
})
