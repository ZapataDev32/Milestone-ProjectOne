import kaboom from "./libs/kaboom.mjs"

const FLOOR = 100
const cactusFLOOR = 50
const JUMP_STRENGTH= 1000 
const xPos = 100;
const yPos = 500;

const SPD = 320;

const cactXPos = 1200;
const cactYPos = 530;
const cactSpeed = 200;

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



scene("game", () =>{
    const Dino = add([
        sprite("dino",{
            animSpeed: 1,
            
        }),
        pos(center()),
        scale(1.5),
        area(),
        body(),
        "Dino",
    ])
    
    onKeyDown("right",() =>{
        Dino.move(SPD,0)
    })
    
    onKeyDown("left",() =>{
        Dino.move(-SPD,0)
    })
    
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
        // loop(3 , () => {
    
        // });
        add([
            sprite("cactus"),
            area(),
            pos(width(),height() - cactusFLOOR),
            anchor("botleft"),
            scale(2),
            move(LEFT, cactSpeed),
            offscreen({destroy: true}),
            
            "Cactus",
        ]);
        wait(rand(1.5,4), summonCactus);
    }
    
    Dino.onCollide("Cactus", () =>{
        addKaboom(Dino.pos);
        shake();
        burp()
        go("lose", score); //go to "lose" scene here
    });

    let score = 0;
    const scoreLabel = add([
        text(score),
        pos(UP),
        scale(2),
    ])

    onUpdate(() => {
        score++;
        scoreLabel.text = score;
    })
    
    summonCactus()
    setGravity(2600)
})

scene("lose", (score) =>{
    add([
        text("Game Over:" + score),
        scale(2),
        pos(center()),
        anchor("center"),
    ])
})

go("game")

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