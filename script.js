const url = "https://api.quotable.io/random";
let randomtext = document.querySelector("#random");
let areatype = document.querySelector("#typing-area");
let btn = document.querySelector(".newbtn");
let right = true;
let timermain = document.querySelector("#timer");
let speedbtn = document.querySelector(".endsections");
let wholebox = document.querySelector(".container");
let speed = document.querySelector(".speed");
let reset = document.querySelector("#reset");
let user = true;
let firstimeval = 0;
let calculate = "";
let char = 0;
let stopm = 0;


areatype.addEventListener("input",() => {
    if(firstimeval===0){
        stopm++;
        firstimeval++;
        timermain.style.display = "block";
        timer();
    }
    char++;

    const secondcompare = randomtext.querySelectorAll("span");
    const userval = areatype.value.split('');
    secondcompare.forEach((elementspan,index) =>{
    let mainval = userval[index];
    if(mainval==null){
        elementspan.classList.remove("incorrect");
        elementspan.classList.remove("correct");
        right = false;

    }else if(mainval===elementspan.innerText){
        elementspan.classList.add("correct");
        elementspan.classList.remove("incorrect");
        right = true;
        user = false;
    }else{
        elementspan.classList.add("incorrect");
         elementspan.classList.remove("correct");
         right = false;
    }
    });
    
    if (right){  
       elementset();
    }
});
reset.addEventListener("click",()=>{
    
    timermain.style.display = "none";
    firstimeval = 0;
    char = 0;
    wholebox.style.display = "flex";
    generate();
})
btn.addEventListener("click",()=>{
    reset.style.display = "block";
   timermain.style.display = "none";
    firstimeval = 0;
    char = 0;
    speedbtn.style.display = "none";
    wholebox.style.display = "flex";
    generate();
});
async function generate(){
   let response = await fetch(url);
   let dataMain = await response.json();
   randomtext.innerText = " ";
   calculate = dataMain.content;
   let quote = dataMain.content;
   quote.split('').forEach(element =>{
    let characterspan = document.createElement("span");
    characterspan.innerText = element;
    randomtext.appendChild(characterspan);
   })
   
   areatype.value = null;

   }
  function elementset(){
    reset.style.display = "none";
    wholebox.style.display = "none";
    speedbtn.style.display = "flex";
     speed.innerText = `You Typed ${char} Characters Keep Practicing !`;
  }
   let starttime;
   function timer(){
    timermain.innerText = 0;
    starttime = new Date();
    setInterval(()=>{
        if(getime()<=60){
        timermain.innerText = getime();
        }else if(stopm==1){
            firstimeval = 0;
            char = 0;
            timermain.style.display = "none";
            reset.style.display = "none";
            wholebox.style.display = "none";
            speedbtn.style.display = "flex";
            speed.innerText = `Try Again and Keep Practicing !`;
            stopm = 0;
        }
    },1000);
}

function getime(){
    return Math.floor((new Date()-starttime)/1000);
   }
generate();