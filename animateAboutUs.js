'use strict'
const aboutUsBar = document.getElementById('bar-section')
const bars= document.querySelectorAll('.bar')
const animatedText = document.getElementById('animated-text')
const animatedTextSibling= animatedText.parentElement.nextElementSibling
//
const barsSectionImage= document.querySelector('#bar-section').lastElementChild
const barsSectionImageHeight= barsSectionImage.offsetHeight
const prevTextHeight = animatedText.offsetHeight



if(window.innerWidth < 1024) window.onscroll=handleScroll;
if(window.innerWidth > 1024) handleMouseAction() ;
if(window.innerWidth > 1024) window.onscroll=handleScroll


//animate the about-us section on mouseenter and mouseleave: for desktop scrren
function handleMouseAction (){
    const aboutUs = document.getElementById('about-us')
    aboutUs.onmouseenter= ()=>{
        growText()
        growBars()
    }

    aboutUs.onmouseleave = ()=>{
        ungrowText()
        reduceBars()
    }
}


//animate the about-us bar and  section on on scroll: for mobilescreen
function handleScroll(){
    const barRect= aboutUsBar.getBoundingClientRect()
    const animatedTextRect= animatedText.getBoundingClientRect()
    const animatedTextSiblingRect= animatedTextSibling.getBoundingClientRect()

    if((barRect.top>0 && barRect.bottom <= window.innerHeight) && (animatedTextRect.top>0 && animatedTextSiblingRect.top<= window.innerHeight)){
        growText()
        growBars()
    
    }else if((barRect.top>0 && barRect.bottom <= window.innerHeight) && !(animatedTextRect.top>0 && animatedTextSiblingRect.top<= window.innerHeight)){
        ungrowText()
        growBars()
    }else if( !(barRect.top>0 && barRect.bottom <= window.innerHeight) && (animatedTextRect.top>0 && animatedTextSiblingRect.top<= window.innerHeight) ){
        growText()
        reduceBars()
    }
    else{
        ungrowText()
      reduceBars()
    }
}
function handleDesktopScroll(){
    const aboutUs = document.getElementById('about-us')
    aboutUs.onmouseenter= ()=>{
        growText()
        growBars()
    }

    aboutUs.onmouseleave = ()=>{
        ungrowText()
        reduceBars()
    }
}

function growBars(){
       bars.forEach(bar=>{
        bar.style.padding=0;
        bar.style.height= barsSectionImage.offsetHeight/2 +'px'
       })
    }
function reduceBars (){
    bars.forEach(bar=>{
        bar.style.padding=0;
        bar.style.height= barsSectionImage.offsetHeight/3 +'px'
       })
}
    
function growText(){
    animatedText.style.maxHeight= '500px'
}

function ungrowText(){
    animatedText.style.maxHeight= prevTextHeight +'px';
    
}

