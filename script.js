// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            if (this.getAttribute("href").startsWith("#")) {
                event.preventDefault();
                const section = document.querySelector(this.getAttribute("href"));
                section.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});

// Button animation on hover
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
    button.addEventListener("mouseover", function () {
        this.style.transform = "scale(1.1)";
    });

    button.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
    });
});
