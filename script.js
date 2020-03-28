
const BUTTONS = document.getElementById('buttons'); //Portfolio Buttons
const WORKS = document.getElementById('works');
const SUBMIT = document.getElementById('submit');// Form Submit Button
const CLOSE_MESSAGE = document.getElementById('close-button'); // Messege about succesful sent
const SLIDS = document.querySelectorAll('.element'); //Slids
const NAVIGATION = document.querySelectorAll('.navigation_link');
let verticalDisplay = document.querySelector('.phone-vertical__display-v');
let horizontalDisplay = document.querySelector('.phone-horizontal__display-h');
let images = document.querySelectorAll('.portfolio__images-block');

//NAVIGATION

 document.addEventListener('scroll', function(event) {
    const curPos = window.scrollY;
    document.querySelectorAll('section').forEach((el) => {
        if(el.offsetTop <= curPos && el.offsetTop + el.offsetHeight > curPos){
            NAVIGATION.forEach((a) => {
                a.classList.remove('active-link');
                if(el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('active-link');
                }
            });
        }

    });
 });

let burgerMain =  document.querySelector('.header-burger-main');
let burgerWindow = document.querySelector('.header-burger-shadow');

document.querySelector('.header-burger__burger').addEventListener('click', () => {
    document.querySelectorAll('.header-burger__burger').forEach((el) => {
        el.classList.add('header-burger__burger_active');
    });
    burgerMain.style.display = 'none';
    burgerWindow.classList.add('burger-menu-window-active');
});

document.querySelector('.header-burger-window .header-burger__burger').addEventListener('click', () => {
    document.querySelectorAll('.header-burger__burger').forEach((el) => {
        el.classList.remove('header-burger__burger_active');
    });
    burgerMain.style.display = 'flex';
    burgerWindow.classList.remove('burger-menu-window-active');
});

//SLIDER
let activeSlide = 1;

showSlides(activeSlide); //Костыль

function showSlides(n){
    if(n < 1){
        activeSlide = SLIDS.length;
    } else if( n > SLIDS.length){
        activeSlide = 1; 
    }
    if(SLIDS[1] == SLIDS[activeSlide-1]){
        document.querySelector('.slider-block').style.backgroundColor = "#648BF0";
    } else {
        document.querySelector('.slider-block').style.backgroundColor = "#F06C64";
    }

    for(let i = 0; i < SLIDS.length; i++){
        SLIDS[i].classList.add('active');
    }

    SLIDS[activeSlide-1].classList.remove('active');
}

function moveSlide(n){
    showSlides(activeSlide += n);
}

/*let isEnabled  = true;

function chngeActiveSlide(n) {
    activeSlide = (n + SLIDS.length) % SLIDS.length;
}

function hideSlide(direction) {
    isEnabled = false;
    SLIDS[activeSlide].classList.add(direction);
    SLIDS[activeSlide].addEventListener('animationand', function(){
        this.classList.remove('active', direction);
    });
}

function showSlide(direction) {
    SLIDS[activeSlide].classList.add('next', direction);
    SLIDS[activeSlide].addEventListener('animationand', function(){
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    });
}

function previousSlide() {
    /*hideSlide('to-right');
    chngeActiveSlide(n-1);
    showSlide('from-left');
}

function nextSlide() {
    /*hideSlide('to-left');
    chngeActiveSlide(n+1);
    showSlide('from-right');
} */

document.querySelector('.arrow_left').addEventListener('click', function(){
    /*if(isEnabled){
        previousSlide(activeSlide);
    }*/
    moveSlide(-1);
});

document.querySelector('.arrow_right').addEventListener('click', function(){
    /*if(isEnabled){
        nextSlide(activeSlide);
    }*/
    moveSlide(1);
});

//FIRST SLIDE DISPLAY
verticalDisplay.addEventListener('click', () => {
        verticalDisplay.classList.add('active');

});

horizontalDisplay.addEventListener('click', () => {
        horizontalDisplay.classList.add('active');

});

document.querySelector('.phone-vertical__body-v').addEventListener('click', () => {
    if(verticalDisplay.classList.contains('active')){
        verticalDisplay.classList.remove('active');
    }
});

document.querySelector('.phone-horizontal__body-h').addEventListener('click', () => {
    if(horizontalDisplay.classList.contains('active')){
        horizontalDisplay.classList.remove('active');
    }
});

//PORTFOLIO
function getRandomInt(){
    return Math.floor(Math.random() * Math.floor(12));
}

BUTTONS.addEventListener('click', (event) => {

    let galery = document.querySelector('.portfolio__images');
    let mas = [];
    let i = 0;

    if(event.target == BUTTONS) {
        event.target.classList.remove('activeButton');
    } else {
        BUTTONS.querySelectorAll('button').forEach(el => el.classList.remove('activeButton'));
        event.target.classList.add('activeButton');

        images.forEach(el => {
            mas[i] = el;
            i++;
        });
    
        for(let i = 0; i < mas.length; i++){ // Нерабочая сортировка элементов блока WORKS
            let randIndex = getRandomInt();
            let temp = mas[i];
            mas[i] = mas[randIndex];
            mas[randIndex] = temp;
            }
    
        mas.forEach(el => galery.append(el));
    }
   
});

WORKS.addEventListener('click', (event) => {
    if(event.target == WORKS){
        WORKS.querySelectorAll('img').forEach((el) => el.classList.remove('img_active'));
        event.target.classList.remove('img_active');
    } else {
        WORKS.querySelectorAll('img').forEach((el) => el.classList.remove('img_active'));
        event.target.classList.add('img_active');
    }
    
});

//FORMS
SUBMIT.addEventListener('click', (event) => {

    const subjectText = document.getElementById('subject').value.toString();
    const descriptionText = document.getElementById('description').value.toString();
    let requiredInputs = [...document.querySelectorAll("[required]")];
    let validStatus = el => el.checkValidity();
    
    if(requiredInputs.every(validStatus)){
        event.preventDefault();
        document.getElementById('message-block').classList.remove('hidden');

    if(subjectText.length == 0){
        document.getElementById('information-subject').innerText = "Без темы  ";
    } else {
        document.getElementById('information-subject').innerText = "Тема:  " + subjectText;
    }
    if(descriptionText.length == 0){
        document.getElementById('information-description').innerText = "Без описания";
    } else {
        document.getElementById('information-description').innerText = "Описание:  " + descriptionText;
    }

    document.getElementById('name').value = "";
    document.getElementById('mail').value = "";
    document.getElementById('subject').value = "";
    document.getElementById('description').value = "";
    }
    
});

CLOSE_MESSAGE.addEventListener('click', () => {
    document.getElementById('message-block').classList.add('hidden');
    document.getElementById('information-subject').innerText = "";
    document.getElementById('information-description').innerText = "";
});

