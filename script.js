let gear = "";
var shifter = document.getElementById("gearshift")
var DText = document.getElementById('D')
var RText = document.getElementById('R')
var input = document.getElementById("gear");
var y_init = 0;
var y_final = 0;
// Importing the required modules

 window.onload = function(){
    input = document.getElementById("gear");
    shifter = document.getElementById("gearshift");
    DText = document.getElementById('D')
    RText = document.getElementById('R')
    console.log(gear);
    console.log(shifter);

    const ws = new WebSocket("ws://localhost:4444");
    ws.addEventListener("open", () =>{
    console.log("We are connected");
    //ws.send("Hello World");
    });
    
    ws.addEventListener('message', function (event) {
        console.log(event.data);
        if(event.data == 'Drive'){
            drive();
        }
        if(event.data == 'Reverse'){
            reverse();
        }
    });
    
    document.addEventListener('touchstart', e => {
        // alert('touchstart!'+ e.changedTouches[0].screenY);
        // get touch start coordinate
        y_init = e.changedTouches[0].screenY;
        shifter.style.backgroundColor = 'red'
    
    })
    document.addEventListener('touchmove', e=> {
        shifter.style.backgroundColor = 'red'
        console.log("move")
    })
    document.addEventListener('touchend', e=> {
        // alert('touchend!'+ e.changedTouches[0].screenY);
        console.log("end")
        y_final = e.changedTouches[0].screenY;
        shifter.style.backgroundColor = 'gray'


        if(y_init < y_final && Math.abs(y_final-y_init) > (screen.height)/4){
            //alert('swiped down');
            reverse();
        }
        if(y_init > y_final && Math.abs(y_final-y_init) > (screen.height)/4){
            //alert('swiped up');
            drive();
        }
    })

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        ws.send(input.value);

        // if(input.value == "drive"){
        //     drive();
        //     console.log(input.value);
        // }
        // if(input.value == "reverse"){
        //     reverse();
        //     console.log(input.value);
        // }
    })   

}

const slideUp = [
    { transform:"translateY(300px)"},
    { transform: "translateY(0px)"},
];

const slideUpTiming= {
    duration: 500,
    iterations:1,
};
const slideDown = [
    { transform:"translateY(-300px)"},
    { transform: "translateY(0px)"},
];

const slideDownTiming= {
    duration: 500,
    iterations:1,
};

function reverse() {
    shifter.style.top = '75%';
    RText.style.color = 'red';
    DText.style.color= 'white';
    if(gear != 'R'){
        shifter.animate(slideDown, slideDownTiming);
    }
    gear = 'R';

 }

 function drive() {
    shifter.style.top = '0%';
    DText.style.color= 'red';
    RText.style.color = 'white';
    if(gear != 'D'){
        shifter.animate(slideUp, slideUpTiming);
    }
    gear = 'D';
 }