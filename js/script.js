// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.background = "rgba(5,8,22,.95)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.3)";
    } else {
        header.style.background = "rgba(255,255,255,.05)";
        header.style.boxShadow = "none";
    }
});

// ===============================
// MOBILE MENU
// ===============================

const menu = document.querySelector(".nav-links");
const toggle = document.querySelector(".menu-toggle");

if (toggle) {
    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        if (menu) {
            menu.classList.remove("active");
        }
    });
});

// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});

// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if(window.scrollY >= sectionTop){
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }

    });

});

// ===============================
// SCROLL REVEAL
// ===============================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

document.querySelectorAll(
".section-title,.skill-card,.project-card,.certificate-card,.timeline-item,.info-card,.stat-card,.contact-box"
).forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});

// ===============================
// BACK TO TOP
// ===============================

const backTop = document.querySelector(".back-top");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 400){

        backTop.classList.add("show");

    }else{

        backTop.classList.remove("show");

    }

});

if(backTop){

    backTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    });

}

// ===============================
// HERO TYPING EFFECT
// ===============================

const typing = document.querySelector(".hero-text h4");

if(typing){

    const text = typing.innerText;

    typing.innerText="";

    let i=0;

    function type(){

        if(i<text.length){

            typing.innerHTML+=text.charAt(i);

            i++;

            setTimeout(type,80);

        }

    }

    type();

}

// ===============================
// CONTACT FORM
// ===============================

const scriptURL = "https://script.google.com/macros/s/AKfycbwdX8jF7IKlCN4cAB_fVEOtuj9YycUUwNRvmN0NLVYFg7jJyYDWN0Y7S-JhViE6mlrv/exec";

const form = document.querySelector(".contact-form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = new FormData(form);

    try {

        const response = await fetch(scriptURL, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            alert("Message sent successfully!");
            form.reset();
        } else {
            alert("Something went wrong.");
        }

    } catch (error) {
        console.error(error);
        alert("Error sending message.");
    }

});

// ===============================
// CURRENT YEAR
// ===============================

const year=document.querySelector("#year");

if(year){

year.innerHTML=new Date().getFullYear();

}
// ===============================
// DARK / LIGHT MODE
// ===============================

const themeBtn = document.getElementById("theme-toggle");
const themeIcon = themeBtn.querySelector("i");

// Load saved theme
if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light-theme");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    if(document.body.classList.contains("light-theme")){

        localStorage.setItem("theme","light");

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    }else{

        localStorage.setItem("theme","dark");

        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");

    }

});
// ===============================
// ANIMATED COUNTERS
// ===============================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;

            const target = parseFloat(counter.dataset.target);

            let current = 0;

            const increment = target / 100;

            const updateCounter = () => {

                current += increment;

                if(current < target){

                    if(target % 1 !== 0){
                        counter.innerText = current.toFixed(2);
                    }else{
                        counter.innerText = Math.floor(current);
                    }

                    requestAnimationFrame(updateCounter);

                }else{

                    if(target % 1 !== 0){
                        counter.innerText = target.toFixed(2);
                    }else{
                        counter.innerText = target + "+";
                    }

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

},{
    threshold:0.5
});

counters.forEach(counter=>{
    counterObserver.observe(counter);
});
