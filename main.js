import kaboom from "./libs/kaboom.mjs"

const FLOOR = 100
const cactusFLOOR = 50
const dactylFLOOR = 200
const JUMP_STRENGTH= 1100 
// const xPos = 100;
// const yPos = 500;

const SPD = 320;

// const cactXPos = 1200;
// const cactYPos = 530;
const cactSpeed = 200;
const dactylSpeed = 230;


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
loadSprite("cactus2","./assets/cactus2.png")


loadSprite("dactyl", "./assets/pterodactyl-Sheet.png", {
    sliceX: 2,
    anims: {
        fly: {
            from: 0,
            to: 1,
            loop: true,
        }
    }
})


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
    // const destroyDinoArea = () => {
    //     Dino.scale(0.5); // destroy the area component
    // };
    
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
        const randomCactusIndex = randi(1,4);
        // const byrd = add([
        //     sprite("dactyl", {
        //         animSpeed: 1,
        //     }),
        //     "Bird",
        // ])
        // byrd.play("fly")
        let cactusSprite;
        if(randomCactusIndex === 1){
            cactusSprite = "cactus";
        } else if(randomCactusIndex === 2){
            cactusSprite = "dactyl";
        } else if(randomCactusIndex == 3){
            cactusSprite = "cactus2";
        }
        // if(randomCactusIndex < 0.6) {
        //     cactusSprite = "cactus2";
        // } else {
        //     cactusSprite = "cactus";
        // }
        if(cactusSprite === "cactus"){
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
            // wait(randi(2,5), summonCactus);
        } else if(cactusSprite === "cactus2"){
            add([
                sprite("cactus2"),
                area(),
                pos(width(),height() - cactusFLOOR),
                anchor("botleft"),
                scale(2),
                move(LEFT, cactSpeed),
                offscreen({destroy: true}),
                
                "Cactus",
            ]);
        } else if(cactusSprite === "dactyl"){
            const byrd = add([
                sprite("dactyl",{
                    animSpeed: 1,
                }),
                area(),
                pos(width(),height() - cactusFLOOR),
                anchor("botleft"),
                scale(3),
                move(LEFT, cactSpeed),
                offscreen({destroy: true}),
                
                "Cactus",
            ]);
            byrd.play("fly")
        }
        wait(randi(2,5), summonCactus);

    }
    // const byrd = add([
    //         sprite("dactyl",{
    //             animSpeed: 1,
    //         }),
    // //         area(),
    // //         pos(width(),height() - dactylFLOOR),
    // //         move(LEFT, dactylSpeed),
    // //         scale(3),
    // //         offscreen({destroy: true}),
    //         "Bird",
            
    // ])
    // wait(randi(10,18), byrd);

        
    // }
   
    Dino.onCollide("Cactus",() =>{
        addKaboom(Dino.pos);
        shake();
        burp()
        go("lose", score); //go to "lose" scene here
    });
    Dino.onCollide("Bird",() =>{
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
    // summonBird()
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