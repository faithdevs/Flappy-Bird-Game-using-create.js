var stage,  loader;

function init() {
    stage = new createjs.StageGL("gameCanvas");

    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", stage);

    var background = new createjs.Shape();
    background.graphics.beginLinearGradientFill(["#2573BB", "#6CB8DA", "#567A32"], [0, 0.85, 1], 0, 0, 0, 480)
    .drawRect(0, 0, 320, 480);
    background.x = 0;
    background.y = 0;
    background.name = "background";
    background.cache(0, 0, 320, 480);

    stage.addChild(background);


    var manifest = [
        { "src": "cloud.png", "id": "cloud" },
        { "src": "flappy.png", "id": "flappy" },
        { "src": "pipe.png", "id": "pipe" },
    ];
     
      loader = new createjs.LoadQueue(true);
      loader.addEventListener("complete", handleComplete);
      loader.loadManifest(manifest, true, "./img/");
}
    var flappy;
    function handleComplete() {
      createClouds();
      createFlappy();
      stage.on("stagemousedown", jumpFlappy);
    }
    
    function createFlappy() {
        flappy = new createjs.Bitmap(loader.getResult("flappy"));
        flappy.regX = flappy.image.width / 2;
        flappy.regY = flappy.image.height / 2;
        flappy.x = stage.canvas.width / 2;
        flappy.y = stage.canvas.height / 2;
        stage.addChild(flappy);
    }
       
    function jumpFlappy() {
    createjs.Tween.get(flappy, { override: true }).to({ y: flappy.y - 60, rotation: -10 }, 500, createjs.Ease.getPowOut(2))
    .to({ y: stage.canvas.height + (flappy.image.width / 2), rotation: 30 }, 1500, createjs.Ease.getPowIn(2))
    .call(gameOver);
    }

    function gameOver() {
        console.log("Game over!");
    }

    function createClouds() {
      var clouds = [];
      for (var i = 0; i < 3; i++) {
        clouds.push(new createjs.Bitmap(loader.getResult("cloud")));
      }
     
      clouds[0].x = 40;
      clouds[0].y = 20;
      clouds[1].x = 140;
      clouds[1].y = 70;
      clouds[2].x = 100;
      clouds[2].y = 130;
     
      for (var i = 0; i < 3; i++) {
        var directionMultiplier = i % 2 == 0 ? -1 : 1;
        var originalX = clouds[i].x;
        createjs.Tween.get(clouds[i], {loop:true})
        .to({ x: clouds[i].x - (200 * directionMultiplier)}, 3000, createjs.Ease.getPowInOut(2))
        .to({ x: originalX }, 3000, createjs.Ease.getPowInOut(2));
        stage.addChild(clouds[i]);
      }
     
    }
    