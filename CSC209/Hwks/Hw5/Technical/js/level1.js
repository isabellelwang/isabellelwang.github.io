function createCircle() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(250,250,40,0,2*Math.PI);
    ctx.stroke();
    ctx.moveTo(250,250);
    ctx.lineTo(250 + 70,250 + 70);
    ctx.stroke();   
}
