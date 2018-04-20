var input = new synaptic.Layer(1); // Two inputs
var output = new synaptic.Layer(1); // Three outputs

input.project(output); // Connect input to output


var trainingData = [
    {
        input: [0],
        output: [0]
    },
//    {
//        input: [0.1],
//        output: [0.1736]
//    },
//    {
//        input: [0.2],
//        output: [0.3420]
//    },
//    {
//        input: [0.3],
//        output: [0.5]
//    },
//    {
//        input: [0.4],
//        output: [0.6428]
//    },
    {
        input: [0.45],
        output: [0.7071]
    },
//    {
//        input: [0.5],
//        output: [0.7660]
//    },
//    {
//        input: [0.6],
//        output: [0.8660]
//    },
//    {
//        input: [0.7],
//        output: [0.9397]
//    },
//    {
//        input: [0.8],
//        output: [0.9848]
//    },
//
    {
        input: [0.9],
        output: [1]
    },
];

var learningRate = 0.2;  //learning rate

//training NN
function train() {    
    for (var i = 0; i < trainingData.length; i++) {        
        input.activate(trainingData[i]["input"]);        
        output.activate();        
        output.propagate(learningRate, trainingData[i]["output"]);    
    }
}

//Retrain NN with new training data
function retrain() {         
    trainingData = _.shuffle(trainingData);        
    train();    
} 
retrain();

// Drawing and clearing canvas
var canvas = document.getElementById("sincan");
var ctx = canvas.getContext("2d");
$(document).ready(function () {
    $("#clear").on('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        location.reload();
    });
});

// Auto learning NN
function sinauto() {

    setInterval(calc, 100);
}

// Calc new data to training data and retraining NN
function calc() {

    // How long canvas refreshing
    var p = document.getElementById("sinsum");
    p.innerHTML = 12 - trainingData.length;
    if (trainingData.length > 12) {
        p.innerHTML = "END";
        return;
    }

    // calc angles 0-90 degree and insert to NN 
    for (var i = 0; i <= 90; i++) {
        var sin = i / 90;
        input.activate([sin]); // Whistle
        var result = output.activate(); //result of new generation

        //console.log(result[0]);
        //console.log(Math.sin(i * Math.PI / 180));

        if (result[0] >= Math.sin(i * Math.PI / 180) - 0.00005 && result[0] <= Math.sin(i * Math.PI / 180) + 0.00005) { //0.00005=error +/- 
            trainingData.push({ //inserting to training data array
                input: [sin],
                output: [result[0]]
            });
        }
    }
    retrain();
    draw();
}

//drawing new output by auto()
function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
    var space = 0; //x
    //console.log(trainingData);
    retrain();

    for (var i = 0; i <= 90; i++) {
        var sin = i / 90;
        input.activate([sin]); // Whistle
        var result = output.activate(); //result of new generation

        //sin NN
        ctx.beginPath();
        ctx.arc(space + i * 9.9, -(result[0] * 250) + 300, 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();

        //sin math
        ctx.beginPath();
        ctx.arc(space + i * 9.9, -(Math.sin(i * (Math.PI / 180))) * 250 + 300, 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();

        //difference
        ctx.beginPath();
        ctx.moveTo(space + i * 9.9, -(result[0] * 250) + 300);
        ctx.lineTo(space + i * 9.9, -(Math.sin(i * (Math.PI / 180))) * 250 + 300);
        ctx.strokeStyle = "green";
        ctx.stroke();

        //range
        ctx.beginPath();
        ctx.moveTo(100, 0);
        ctx.lineTo(100, 400);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, 310);
        ctx.lineTo(900, 310);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(895, 0);
        ctx.lineTo(895, 400);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, 45);
        ctx.lineTo(900, 45);
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
    //console.log(trainingData);
}
