let bgi = document.getElementById("backgroundImage");
let nthimg = 1;
window.onload = function(){
    bgi.style.backgroundImage = "url(./images/img0.jpg)";
}

setInterval(changeImg, 4000);

function changeImg(){
    console.log("changeimg")
    bgi.style.backgroundImage = 'url(./images/img'+nthimg+'.jpg)';
    bgi.style.transitionDuration = "1s"
    nthimg = (++nthimg) % 3;
}