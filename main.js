import kaboom from "./libs/kaboom.mjs"

const FLOOR = 100
const JUMP_STRENGTH= 800
const xPos = 100;
const yPos = 500;

const cactXPos = 1300;
const cactYPos = 705;

kaboom({
    // width: 1280,
    // height: 720,
    // letterbox: true,
    background: [245, 193, 51],
})

loadSprite("dino", "./assets/lil_Dino-Sheet.png", {
    sliceX: 9,
    // sliceY: 1,
    anims: {
        idle: {
            from: 1,
            to: 8  ,
            loop: true,
        },
    },
})

loadSprite("cactus","./assets/cactus.png")

const Dino = add([
    sprite("dino",{
        animSpeed: 1,
        
    }),
    pos(xPos,yPos),
    scale(1.5),
    area(),
    body(),
    "Dino",
])

// const Cactus = add([
//     sprite("cactus"),
//     scale(2)
    
// ])

//  .jump() when space key is pressed
onKeyPress("space", () => {
    if (Dino.isGrounded()) {
        Dino.jump(JUMP_STRENGTH);
    }
})
Dino.play('idle')
// add platform

add([
    rect(width(), FLOOR),
    outline(4),
    area(),
    pos(0, height() - 60),
    body({isStatic: true}),
    color(127,200,255),
    
])


// add cactus
function summonCactus(){
    add([
        sprite("cactus"),
        area(),
        pos(cactXPos,cactYPos),
        anchor("botleft"),
        scale(2)

    ])
}
summonCactus()
setGravity(1600)

// Dino.play("idle", {
//     loop: true,
// })
// const scenes = {
//     menu: () => {
//         // add([text("test"), pos(600,500),color(0,0,0)])
        
//     },
//     controls: () => {

//     },
//     main: ()=> {

//     }
// }

// for (const key in scenes){
//     scene(key, scenes[key])
// }

// go("menu")