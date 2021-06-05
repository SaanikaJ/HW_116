eye_x = 0; 
eye_y = 0; 

function preload(){
    eye = loadImage("eye.png"); 
}

function setup(){
    console.log("canvas enabled");
    canvas = createCanvas(600, 480);
    canvas.position(580, 400);

    video = createCapture(VIDEO); 
    video.size(300, 300);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded); 
    poseNet.on("pose", gotPoses); 
}

function draw(){
    image(video, 0, 0, 300, 300);
    image(eye, eye_x, eye_y, 50, 50); 
}

function snapshot(){
    save("filtered_image.png");
} 

classifier = ml5.imageClassifier("MobileNet", modelLoaded); 

function modelLoaded(){ 
    console.log("Model loaded!");
} 

function gotPoses(results){
    if(results.length > 0 ){
        console.log(results); 
        console.log("Left eye x = " + results[0].pose.leftEye.x); 
        console.log("Left eye y = " + results[0].pose.leftEye.y); 

        eye_x = results[0].pose.leftEye.x; 
        eye_y = results[0].pose.leftEye.y; 
    }
}