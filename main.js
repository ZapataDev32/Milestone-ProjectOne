import kaboom from "./libs/kaboom.mjs"

const FLOOR = 100
const BGFLOOR = 20
const cactusFLOOR = 50
const dactylFLOOR = 200
const JUMP_STRENGTH= 1100 
const centerTitle = 300
let gameStart = false

 // Initialize the high score from local storage or set it to 0 if not present
let highScore = parseInt(localStorage.getItem("highScore")) || 0;

const SPD = 320;

// const cactXPos = 1200;
// const cactYPos = 530;
const cactSpeed = 200;
// const dactylSpeed = 230;


kaboom({
    // width: 1280,
    // height: 720,
    // letterbox: true,
    background: [255, 213, 65],
    
})

loadSprite("dino", "./assets/lil_Dino-Sheet.png", {
    sliceX: 14,
    // sliceY: 1,
    anims: {
        idle: {
            from: 1,
            to: 8  ,
            loop: true,
        },
        run: {
            from: 11,
            to: 13,
            loop: true,
        },
        jump: {
            from: 13,
            to: 13,
        },
    },
})

loadSprite("cactus","./assets/cactus.png")
loadSprite("cactus2","./assets/cactus2.png")
loadSprite("BG-1", "./assets/sand-BG.png")
loadSound("bounce", "./assets/Bounce_Jump 5 NEW.wav")
loadSound("bgMusic", "./assets/Casual - Level 1 (Loop_02).wav")
loadSprite("dactyl", "./assets/pterodactyl-Sheet.png", {
    sliceX: 2,
    anims: {
        fly: {
            from: 0,
            to: 1,
            loop: true,
        },
    }
})

const music = play("bgMusic", {
    volume: 0.3,
    loop: true
});

const boing = play("bounce", {
    volume: 0.2
})
music.play()


scene("game", () =>{

    const title = add([
        text("Dino Game: \nPress Enter to start"),
        pos(0,height() - 300),
        scale(1.5),
    ])
  
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


    
    title

    onKeyPress("enter", () =>{
        gameStart = true
        destroy(title)
    })
    Dino.play('idle')
    function movementManager(player){
        // movement
        onKeyDown("right",() =>{
            player.move(SPD,0)
        })
        
        onKeyDown("left",() =>{
            player.move(-SPD,0)
        })

        // jump controls
        onKeyPress("space",() =>{
            if (Dino.isGrounded()) {
                Dino.jump(JUMP_STRENGTH);
                Dino.play('jump');
                // play("bounce");
                boing.play();
            };
        });    
        onKeyRelease("space", () =>{
            player.play('idle')
        });
        onKeyPress("up",() =>{
            if (Dino.isGrounded()) {
                Dino.jump(JUMP_STRENGTH);
                Dino.play('jump');
            };
            onKeyRelease("up", () =>{
                player.play('idle')
            });
        });    
    }
    
    movementManager(Dino)
    // add platform
    
    add([
        rect(width(), FLOOR),
        outline(4),
        area(),
        pos(0, height() - 60),
        body({isStatic: true}),
        color(180,32,42),
        
    ])

    // add left screen wall, so player does not die
    add([
        rect(10, 400),
        
        area(),
        pos(-8, height() - 300),
        body({isStatic: true}),
        color(180,32,42),
        opacity(0.0)
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
        if(gameStart === true){
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
        }

        wait(randi(2,5), summonCactus);

    }


    function spawnBG1(){
        add([
            sprite("BG-1"),
            pos(0, height() - BGFLOOR),
            anchor("botleft"),
            move(LEFT, SPD/1.4),
            z(-1),
            // scale(0,2),
            "bg-1",
        ])

        // wait(2.5, spawnBG1)
    }
    
    onUpdate("bg-1", (bg) =>{
        if (bg.pos.x < -1200){
            destroy(bg)
        }
    })

    function spawnBG2(){
        add([
            sprite("BG-1"),
            pos(width(), height() - BGFLOOR),
            anchor("botleft"),
            move(LEFT, SPD/1.4),
            z(-1),
            "bg-2",
        ])

        wait(2.6, spawnBG2)
    }
    
    onUpdate("bg-2", (bg) =>{
        if (bg.pos.x < -800){
            destroy(bg)
        }
    })

   
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
        if(gameStart === true){
            score++;
            scoreLabel.text = score;

             // Check if the current score is higher than the stored high score
            if(score > highScore){
                highScore = score;
            }
        }

    })

    // if(score >= 500){
    //     SPD = SPD*2
    // }
    
    
    summonCactus()
    // summonBird()
    spawnBG1()
    spawnBG2()
    setGravity(2600)
})

scene("lose", (score) =>{
     // Save the high score to local storage
    localStorage.setItem("highScore", highScore);

    add([
        text("Game Over:" + score),
        
        scale(2),
        pos(center()),
        anchor("center"),
    ])
    add([
        text("High Score: " + highScore),
        pos(center().add(0, 50)),
        scale(1.5),
    ]);

    add([
        text("Press ENTER to Restart"),
        scale(1.5),
        
    ])

    onKeyPress("enter", () =>{
        go("game"),
        gameStart = false
    })

    
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