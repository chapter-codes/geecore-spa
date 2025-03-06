'use strict'

//get the css variable value for primary and slide-control color
const root = document.documentElement;
const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color').trim();
const slideBtnColor = getComputedStyle(root).getPropertyValue('--slide-control-button-color').trim();

const servicesCarousel = document.getElementById('services-carousel')
const [modServicesCarousel, servicesCarouselClone, servicesSlidesLength,  servicestransfromXLen] = ModifyAndCloneCarousel(servicesCarousel, '#services-carousel-wrapper')

const servicesSlideMulltiplier=[1]
let servCarouselInterval = setInterval(()=>{
    handleSlide(modServicesCarousel, servicesCarouselClone, servicesSlidesLength, servicestransfromXLen, servicesSlideMulltiplier, true ) 
} , 5000) 

const slideButtons= document.getElementById('slide-buttons')
slideButtons.addEventListener('click', (event)=>{
    slideWithButton(event, [servCarouselInterval], modServicesCarousel, servicesCarouselClone,servicestransfromXLen, servicesSlideMulltiplier, servicesSlidesLength) 
})  //slide carousel with button click



function ModifyAndCloneCarousel (carouselElement, cloneParent='#services-carousel-wrapper') {
    const carouselArray = Array.from(carouselElement.children)
    const firstChildWidth = carouselElement.children[0].offsetWidth
    const firstChildHeight = carouselElement.children[0].offsetHeight

    carouselElement.style.width = `${firstChildWidth}px`
    carouselElement.style.height = `${firstChildHeight}px`
    carouselElement.style.zIndex = '20'
    carouselElement.style.transition = 'transform 3s ease-in-out, opacity 1000ms'

    //loop through slides and arrange them to the right
    carouselArray.forEach((child, index) => {
        child.style.transform = `translateX(${firstChildWidth * index}px)`
        
    })

    //clone carouselElement to be used when fading out of last slide and fading in of first slide
    const clonedCarousel = carouselElement.cloneNode(true);
    clonedCarousel.id='cloned-carousel'
    clonedCarousel.style.transition = 'transform 3s ease-in-out'
    clonedCarousel.style.position = 'absolute'
    clonedCarousel.style.zIndex = '10'
    clonedCarousel.style.top = '0'
    clonedCarousel.style.left = 0

    //keep cloned carousel fadded out
    clonedCarousel.style.opacity = 0
    
    //append cloned carousel which is positioned absolute to the carousel-wrapper
    document.querySelector(`${cloneParent}`).appendChild(clonedCarousel)

    return [carouselElement, clonedCarousel,  carouselArray.length, firstChildWidth]
}

//set interval to slide carousel every 5 seconds
// let interval= setInterval(()=>handleSlide(carousel, clonedCarousel, carousel.Length,  multiplier ), 5000);




function handleSlide(carouselElement, carouselClone, slidesLength, transformxLen, multiplier, hasBtnControl=false){

    //if last carousel item is reached, fade out and reset carousel
    if(multiplier[0] ==slidesLength) {
        console.log('yeah')
        //fade out carousel, fade-in cloned cloned carousel 
        carouselElement.style.opacity=0
        carouselClone.style.opacity=1
        carouselClone.style.transform = `translateX(0px)`
        carouselClone.style.transition = 'opacity 1000ms'
        hasBtnControl? changeSlideBtnColor(0, multiplier[0], slidesLength): null

        //fade-in back the carousel and translate it to the first slide after 1000ms( opacity transition)
        setTimeout(() => {
            carouselElement.style.opacity= 1
            carouselElement.style.transition = 'none'
            carouselElement.style.transform = `translateX(0px)`
           
            //fade out the cloned carousel from the background
            carouselClone.style.opacity=0
        }, 3000);

        //reset
        multiplier[0]=1
    }else{
        //slide carousel
        carouselElement.style.transition = 'transform 3s ease-in-out, opacity 1000ms'
        carouselElement.style.transform = `translateX(-${transformxLen * multiplier}px)`
        hasBtnControl? changeSlideBtnColor(0, multiplier, slidesLength) : null
        console.log(multiplier[0])
        multiplier[0]= multiplier[0] +1
        console.log(multiplier)
    
    }   
}





function slideWithButton(event, openInterval=[], carousel, clonedCarousel, transformxLen, multiplier, slidesLength) {
    const target = event.target.closest('button')
    if(target != null) {
        const index = Array.from(target.parentElement.children).indexOf(target)
        clearInterval(openInterval[0])

        //fade out the cloned carousel incase its shown, anytime the button is clicked.
        clonedCarousel.style.opacity=0
        carousel.style.transition = 'transform 3s ease-in-out, opacity 1000ms'
        carousel.style.transform = `translateX(-${transformxLen * index}px)`

        const previousMultiplierValue= multiplier[0]
        changeSlideBtnColor(index, previousMultiplierValue, slidesLength, 'button-selected')
        multiplier[0] = index+1
        openInterval[0]= setInterval(handleSlide,5000)
    }
}


function changeSlideBtnColor(index=0, multiplier, slidesLength, slideControlMethod=''){

    if(slideControlMethod=='button-selected'){
        slideButtons.children[multiplier-1].firstElementChild.style.backgroundColor = slideBtnColor
            slideButtons.children[index].firstElementChild.style.backgroundColor = primaryColor
    }else{
        if(multiplier == slidesLength){
            slideButtons.children[slidesLength-1].firstElementChild.style.backgroundColor = slideBtnColor
            slideButtons.children[0].firstElementChild.style.backgroundColor = primaryColor
        }else{
            slideButtons.children[multiplier-1].firstElementChild.style.backgroundColor = slideBtnColor
            slideButtons.children[multiplier].firstElementChild.style.backgroundColor = primaryColor
        }
    }
}










const tstCarousel=document.getElementById('testimonial-carousel')
// const [modTstCarousel, tstCarouselClone, tstSlidesLength,  tsttra    nsfromXLen] = ModifyAndCloneCarousel(tstCarousel, '#testimonial-carousel')
Array.from(tstCarousel.children).forEach((child, index) => {
    child.style.transform=`translateX(-${child.offsetWidth*index}px)`
})
//  setInterval(()=>{
//     console.log('moving')
//     tstCarousel.style.transform=`translateX(-500px)`
//  }, 5000)

