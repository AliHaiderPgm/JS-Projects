let hamburger = document.querySelector('.hamburger');
let navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click',function(){
    // nav links class toggle
    navLinks.classList.toggle('activeNavLinks')
    // hamburger class toggle 
    hamburger.classList.toggle('hamburgerActive')
})


// typing effect
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ['Tasks','Notes','Reminder'];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});


// Footer year
let now = new Date();
let year = now.getFullYear();
let footerSpan = document.querySelector('#year');
footerSpan.innerHTML = year;


// Greeting user in navbar
function time(){
  let newDay = new Date();
  let hour = newDay.getHours();
  if(hour>=5 && hour <= 11){
      return 'Morning'
  }
  else if(hour>11 && hour<=17){
      return 'Afternoon';
  }
  else if(hour>17 && hour<=20){
      return 'Evening'
  }
  else{
      return 'Night'
  }
}
let greet = document.querySelector('.greet');
greet.innerHTML ='Good' + ' ' + time() + '!';