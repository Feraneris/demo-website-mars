const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);

const nextButton = document.querySelector('.right');
const previousButton = document.querySelector('.left');

const dotsNav = document.querySelector('.carousel_nav');
const dots= Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slides next to one another
// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';

const setSlidePosition = (slide, index)=>{
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, previousButton, nextButton, targetIndex) => {
    if (targetIndex === 0){
        previousButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        previousButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden')
    } else {
        previousButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

setInterval(()=>{
    const currentSlide = track.querySelector('.current-slide');
    var nextSlide;
    const currentDot = dotsNav.querySelector('.current-slide');
    var nextDot;
    var nextIndex;
    const lastSlide = slides[(slides.length)-1];
    
    if(currentSlide === lastSlide){
        nextIndex = 0;
        nextSlide = slides[0];
        nextDot = dots[0];
        //console.log("set");
    } else {
        nextSlide = currentSlide.nextElementSibling;
        nextIndex = slides.findIndex(slide => slide === nextSlide);
        nextDot = currentDot.nextElementSibling;
    }

   moveToSlide(track, currentSlide, nextSlide);
   updateDots(currentDot, nextDot);
   hideShowArrows(slides, previousButton, nextButton, nextIndex);
},5000);

// when I click left, move slides to the left
previousButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

   moveToSlide(track, currentSlide, prevSlide);
   updateDots(currentDot, prevDot);
   hideShowArrows(slides, previousButton, nextButton, prevIndex);
});

// when I click right, move slides to the right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

   moveToSlide(track, currentSlide, nextSlide);
   updateDots(currentDot, nextDot);
   hideShowArrows(slides, previousButton, nextButton, nextIndex);
});

// when I click nav indicators, move to that slide

dotsNav.addEventListener('click', e => {
    //what indicator was clicked on?
    const targetDot = e.target.closest('button');
    
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot=> dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, previousButton, nextButton, targetIndex);

    //console.log(targetIndex);
});


// testing content swapping
// document.getElementById("missions").addEventListener("click", function() {
//     var x=document.getElementById("page-main");
//     if(x.style.display==="block"){
//         x.style.display="none";
//         document.getElementById("page-mission-01").style.display="flex";
//     } else {
//         x.style.display="block";
//         document.getElementById("page-mission-01").style.display="none";
//     }
// });

const missions = document.getElementById("nav-missions");
const facts = document.getElementById("nav-facts");
const reasons = document.getElementById("nav-reasons");
const page = document.getElementById("container");
const dropdownBox = document.getElementById("dropdown-box");
const pointer = document.getElementById("pointer");
const menuMissions = document.getElementById("menu-missions");
const menuFacts = document.getElementById("menu-facts");
const menuReasons = document.getElementById("menu-reasons");

missions.onmouseenter = () => {
    menuFacts.style.display="none";
    menuReasons.style.display="none";
    menuMissions.style.display="flex";
    menuMissions.style.transitionDelay="0.2s";
    dropdownBox.style.width="fit-content";
    dropdownBox.style.height="fit-content";
    dropdownBox.style.right="120px";
    dropdownBox.style.background="rgba(255,255,255,0.9)";
    pointer.style.background="rgb(213, 91, 78)";
    menuMissions.style.visibility="visible";
}
facts.onmouseenter = () => {
    menuMissions.style.display="none";
    menuReasons.style.display="none";
    menuFacts.style.display="flex";
    menuFacts.style.transitionDelay="0.2s";
    dropdownBox.style.width="fit-content";
    dropdownBox.style.height="fit-content";
    dropdownBox.style.right="95px";
    dropdownBox.style.background="rgba(255,255,255,0.9)";
    pointer.style.background="rgb(213, 91, 78)";
    menuFacts.style.visibility="visible";
}
reasons.onmouseenter = () => {
    menuMissions.style.display="none";
    menuFacts.style.display="none";
    menuReasons.style.display="flex";
    menuReasons.style.transitionDelay="0.2s";
    dropdownBox.style.width="fit-content";
    dropdownBox.style.height="fit-content";
    dropdownBox.style.right="-115px";
    dropdownBox.style.background="rgba(255,255,255,0.9)";
    pointer.style.background="rgb(213, 91, 78)";
    menuReasons.style.visibility="visible";
}

// remove box
page.onmouseenter = () => {
    menuMissions.style.transitionDelay="0s";
    menuFacts.style.transitionDelay="0s";
    menuReasons.style.transitionDelay="0s";
    menuMissions.style.visibility="hidden";
    menuFacts.style.visibility="hidden";
    menuReasons.style.visibility="hidden";
    dropdownBox.style.background="transparent";
    dropdownBox.style.height="0";
    pointer.style.background="transparent";

}

var previousPage = document.getElementById("page-main");
var currentPage;

switchPage = (clickedPage) => {
    previousPage.style.display="none";
    currentPage = document.getElementById(clickedPage.id+"p");
    currentPage.style.display="flex";
    previousPage = currentPage;
}