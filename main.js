import kaboom from "./libs/kaboom.mjs"

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
            to: 8,
            loop: true,
        },
    },
})

const FLOOR = 100

const Dino = add([
    sprite("dino",{
        animSpeed: 1,
        
    }),
    pos(20,150),
    scale(1.5 ),
    area(),
    body(),
    "Dino",
])

//  .jump() when space key is pressed
onKeyPress("space", () => {
    Dino.jump()
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