/* =========================================
   KHANYISILE MAROPING PORTFOLIO
   JAVASCRIPT FILE
========================================= */


/* ---------- DIGITAL CLOCK ---------- */

function updateClock() {

    const clock = document.getElementById("clock");

    if (!clock) {
        return;
    }

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    const period = hours >= 12 ? "pm" : "am";

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    clock.textContent = hours + "." + minutes + period;
}

setInterval(updateClock, 1000);

updateClock();


/* ---------- WELCOME MESSAGE ---------- */

function welcomeMessage() {

    alert(
        "Hello! 👋 Welcome to Khanyisile Maroping's portfolio website. Thank you for visiting!"
    );

}


/* ---------- DARK MODE ---------- */

function setupDarkMode() {

    const darkModeBtn = document.getElementById("darkModeBtn");

    if (!darkModeBtn) {
        return;
    }

    /* Check saved dark mode */
    if (localStorage.getItem("darkMode") === "enabled") {

        document.body.classList.add("dark-mode");

        darkModeBtn.textContent = "☀️";

    } else {

        document.body.classList.remove("dark-mode");

        darkModeBtn.textContent = "🌙";
    }


    /* Dark mode button */
    darkModeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");


        if (document.body.classList.contains("dark-mode")) {

            darkModeBtn.textContent = "☀️";

            localStorage.setItem("darkMode", "enabled");

        } else {

            darkModeBtn.textContent = "🌙";

            localStorage.setItem("darkMode", "disabled");

        }

    });

}


/* Start dark mode */
setupDarkMode();
  

/* ---------- SHOW / HIDE ABOUT ME ---------- */

function showMore() {

    const moreInfo = document.getElementById("moreInfo");

    const button = document.getElementById("showMoreBtn");

    if (!moreInfo || !button) {
        return;
    }


    if (moreInfo.classList.contains("show")) {

        moreInfo.classList.remove("show");

        button.textContent = "Show More About Me";

    } else {

        moreInfo.classList.add("show");

        button.textContent = "Show Less";

    }

}


/* ---------- IMAGE SLIDESHOW ---------- */

const slides = [

    "images/family.jpeg",
    "images/friends.jpg",
    "images/netball1.JPG",
    "images/netball2.jpg",
    "images/netball3.jpg",
    "images/photo1.jpg",
    "images/profile.jpg.jpg",
    "images/sport.jpeg",
    "images/support.jpeg"

];

let currentSlide = 0;
let slideshowTimer = null;


function showSlide(index) {

    const slideImage = document.getElementById("slideImage");

    if (!slideImage) {
        return;
    }


    if (index >= slides.length) {

        currentSlide = 0;

    } else if (index < 0) {

        currentSlide = slides.length - 1;

    } else {

        currentSlide = index;

    }


    slideImage.src = slides[currentSlide];


    const dots = document.querySelectorAll(".dot");


    dots.forEach(function (dot, index) {

        dot.classList.remove("active-dot");

        if (index === currentSlide) {

            dot.classList.add("active-dot");

        }

    });

}


function nextSlide() {

    stopSlideshow();
    showSlide(currentSlide + 1);

}


function previousSlide() {

    stopSlideshow();
    showSlide(currentSlide - 1);

}


function stopSlideshow() {

    if (slideshowTimer !== null) {

        clearInterval(slideshowTimer);
        slideshowTimer = null;

    }

}


document.querySelectorAll(".dot").forEach(function (dot) {

    dot.addEventListener("click", function () {

        stopSlideshow();
        showSlide(Number(dot.dataset.slide));

    });

});


/* ---------- AUTOMATIC SLIDESHOW ---------- */

if (document.getElementById("slideImage")) {

    showSlide(0);

    slideshowTimer = setInterval(function () {

        nextSlide();

    }, 4000);

}


/* ---------- GALLERY LIKE BUTTONS ---------- */

const galleryLikeButtons = document.querySelectorAll(".gallery-like");

galleryLikeButtons.forEach(function (button) {
    const heart = button.querySelector(".heart");

    if (!heart) {
        return;
    }

    let liked = false;

    button.addEventListener("click", function () {
        liked = !liked;

        if (liked) {
            button.classList.add("liked");
            heart.textContent = "❤️";
        } else {
            button.classList.remove("liked");
            heart.textContent = "🤍";
        }
    });
});


/* ---------- CONTACT FORM VALIDATION ---------- */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const formMessage = document.getElementById("formMessage");

        if (
            name === "" ||
            email === "" ||
            message === ""
        ) {
            formMessage.textContent = "Please complete all fields.";
            formMessage.style.color = "#C89AA1";
            return;
        }

        if (
            !email.includes("@") ||
            !email.includes(".")
        ) {
            formMessage.textContent = "Please enter a valid email address.";
            formMessage.style.color = "#C89AA1";
            return;
        }

        const serviceId = "service_tsfjozs";
        const templateId = "template_dqvprhk";
        const publicKey = "Reg6ulvXyL5DW38kt";

        if (
            serviceId === "YOUR_SERVICE_ID" ||
            templateId === "YOUR_TEMPLATE_ID" ||
            publicKey === "YOUR_PUBLIC_KEY"
        ) {
            formMessage.textContent = "Add your EmailJS credentials to send emails.";
            formMessage.style.color = "#C89AA1";
            return;
        }

        emailjs.init({ publicKey: publicKey });

        emailjs.send(serviceId, templateId, {
            from_name: name,
            user_email: email,
            message: message
        })
            .then(function () {
                formMessage.textContent = "Thank you, " + name + "! Your message has been submitted successfully.";
                formMessage.style.color = "#7A8466";
                contactForm.reset();
            })
            .catch(function () {
                formMessage.textContent = "Something went wrong. Please try again later.";
                formMessage.style.color = "#C89AA1";
            });

    });

}