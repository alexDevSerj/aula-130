var song = "";
var scoreLeftWrist = 0;
var scorerightWrist = 0;

var leftWristX = 0;
var leftWristY = 0;

var rightWristX = 0;
var rightWristY = 0;

function preload(){
    song =  loadSound("music.mp3")
}

function  setup(){
    canvas = createCanvas(600,500);
    canvas.position(400,200);

    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video,modelLoaded)
    poseNet.on('pose',gotPoses)
}

function gotPoses(results){
    if(results.length > 0){
        //console.log(results)
        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("score pulso esquerdo "+scoreLeftWrist)

        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("x:"+leftWristX+"y:"+leftWristY)
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
    }
}

function modelLoaded(){
    console.log("posNet foi inicializado")
}

function draw(){
    image(video,0,0,600,500)
    fill("#ff0000")
    stroke("#00EEB5")
    if(scorerightWrist > 0.2){
    
    circle(rightWristX,rightWristY,40)

    if(rightWristY>0 && rightWristY<=100){
        document.getElementById("velocidade").innerHTML = "velocidade = 0.5x"
        song.rate(0.5)
    }else if(rightWristY>100 && rightWristY<=200){
        document.getElementById("velocidade").innerHTML = "velocidade = 1x"
        song.rate(1) 
    }else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("velocidade").innerHTML = "velocidade = 1.5x"
        song.rate(1.5) 
    }else if(rightWristY>300 && rightWristY<=400){
        document.getElementById("velocidade").innerHTML = "velocidade = 2x"
        song.rate(2) 
    }else if(rightWristY>400){
        document.getElementById("velocidade").innerHTML = "velocidade = 2.5x"
        song.rate(2.5) 
    }
    }

    if(scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,40)
    InNunberleftWrinstY = Number(leftWristY);
    remove_decimals = floor(InNunberleftWrinstY)
    volume = remove_decimals/500
    document.getElementById("volume").innerHTML = "volume = "+volume;
    song.setVolume(volume)
}
}

function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}

function parar(){
    song.pause() 
}
