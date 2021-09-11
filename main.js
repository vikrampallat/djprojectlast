song = "";

function preload() {
    song = loadSound("music.mp3");
    next_song = loadSound("starwars.mp3");


    scoreLeftWrist = 0;
    scoreRightWrist = 0;

    rightWristX = 0;
    rightWristY = 0;

    leftWristY = 0;
    leftWristX = 0;
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
}

function draw() {
    image(video, 0, 0, 500, 500, );

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreLeftWrist > 0.2) {
        circle(leftWrist, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        song.setVolume(volume);
        song.isPlaying(leftWristX,leftWristY);
        next_song.stop(leftWristX,leftWristY);
        next_song.setVolume(volume);
        next_song.isPlaying(rightWristX,rightWristY);
        song.stop(rightWristY,rightWristX)
    }

}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log('PoseNet is Initialized');
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("rightWristX = " + rightWristX + " rightWristY" + rightWristY);
    }
}