import kaboom from "./libs/kaboom.mjs"

kaboom({
    width: 1280,
    height: 720,
    letterbox: true,
    // background: [245, 193, 51],
})

loadSprite("dino", "./assets/lil_Dino.png")

const FLOOR = 100

const Dino = add([
    sprite("dino"),
    pos(20,150),
    scale(2),
    area(),
    body(),
])

//  .jump() when space key is pressed
onKeyPress("space", () => {
    Dino.jump()
})

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