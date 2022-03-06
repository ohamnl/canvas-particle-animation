const canvas = document.getElementById('canvas1');

const c = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const particlesArray = [];
let hue = 0;




window.addEventListener('resize',function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    c.fillStyle = 'green';
    c.beginPath();
    c.arc(100,100, 50, 0, Math.PI * 2);
    c.fill()
   
    
})

const mouse = {
    x : undefined,
    y : undefined,
}
canvas.addEventListener('click', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 10; i++){
        particlesArray.push(new Particle());
    }
        

});


canvas.addEventListener ('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 2; i++){
        particlesArray.push(new Particle());
    }

})


class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5; 
        this.color = 'hsl(' + hue + ', 100%, 50%)';
       
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.01;
    }
    draw() {
        c.fillStyle = this.color;
        c.lineWidth = 3;
        c.beginPath();
        c.arc(this.x,this.y, this.size, 0, Math.PI * 2);
        c.fill();

    }
}

function handleParticles (){
   for (let i = 0; i < particlesArray.length; i++ ) {
       particlesArray[i].update();
       particlesArray[i].draw();

       for ( let j= i; j < particlesArray.length; j++ ) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100){
            c.beginPath();
            c.strokeStyle = particlesArray[i].color;
            c.lineWidth = particlesArray[i].size/15;
            c.moveTo(particlesArray[i].x, particlesArray[i].y);
            c.lineTo(particlesArray[j].x, particlesArray[j].y);
            c.stroke();
        }

    }
       if(particlesArray [i].size <= 0.3 ){
           particlesArray.splice (i, 1);
           i--;
       }
       
   } 
}



function animate (){
    c.clearRect(0,0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    handleParticles();
    hue+=2;
}
animate();







