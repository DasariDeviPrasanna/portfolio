// ==========================
// FLOATING PARTICLES
// ==========================

const hero = document.querySelector(".hero");

if(hero){

for(let i=0;i<30;i++){

const particle=document.createElement("span");

particle.classList.add("particle");

particle.style.left=Math.random()*100+"%";

particle.style.animationDuration=
(Math.random()*8+6)+"s";

particle.style.animationDelay=
(Math.random()*5)+"s";

particle.style.width=
particle.style.height=
(Math.random()*8+4)+"px";

hero.appendChild(particle);

}

}