// ==========================
// CUSTOM CURSOR
// ==========================

const cursor = document.querySelector(".cursor");
const dot = document.querySelector(".cursor-dot");

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";

});

// Cursor grow on links & buttons

const hoverItems = document.querySelectorAll(
"a, button, .btn, .project-card, .skill-card"
);

hoverItems.forEach(item => {

    item.addEventListener("mouseenter", () => {

        cursor.classList.add("cursor-grow");

    });

    item.addEventListener("mouseleave", () => {

        cursor.classList.remove("cursor-grow");

    });

});