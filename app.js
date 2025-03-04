'use strict'


    
let carousel = document.getElementById('carousel')
const children= carousel.children
const childrenArray = Array.from(children)
const slidesLength=childrenArray.length
const firstChild = children[0]
const firstChildWidth = firstChild.offsetWidth
const firstChildHeight = firstChild.offsetHeight

//set width and height of carousel
carousel.style.width = `${firstChildWidth}px`
carousel.style.height = `${firstChildHeight}px`
carousel.style.zIndex = '20'

//loop through slides and arrange them to the right
childrenArray.forEach((child, index) => {
    child.style.transform = `translateX(${firstChildWidth * index}px)`
})

//clone carousel to be used when fading out of last slide and fading in of first slide
const clonedCarousel = carousel.cloneNode(true);
clonedCarousel.id='cloned-carousel'
clonedCarousel.style.transition = 'transform 3s ease-in-out'

clonedCarousel.style.position = 'absolute'
clonedCarousel.style.zIndex = '10'
clonedCarousel.style.top = '0'
clonedCarousel.style.left = 0
//keep cloned carousel fadded out
clonedCarousel.style.opacity = 0

//append cloned carousel which is positioned absolute to the carousel-wrapper
document.querySelector('#carousel-wrapper').appendChild(clonedCarousel)


let multiplier=1;
//set interval to slide carousel every 5 seconds
let interval= setInterval(handleSlide, 5000);


function handleSlide(){
    console.log('interval', multiplier)

    //if last carousel item is reached, fade out and reset carousel
    if(multiplier ==slidesLength) {
        //fade out carousel, fade-in cloned cloned carousel 
        carousel.style.opacity=0
        clonedCarousel.style.opacity=1


        //fade-in back the carousel and translate it to the first slide after 1000ms( opacity transition)
        setTimeout(() => {
            carousel.style.opacity= 1
            carousel.style.transition = 'none'
            carousel.style.transform = `translateX(0px)`

            //fade out the cloned carousel from the background
            clonedCarousel.style.opacity=0
        }, 1000);

        //reset
        multiplier=1
    }else{
        //slide carousel
        carousel.style.transition = 'transform 3s ease-in-out, opacity 1000ms'
        carousel.style.transform = `translateX(-${firstChildWidth * multiplier}px)`
        multiplier++
    
    }   
}



const slideButtons= document.getElementById('slide-buttons')

slideButtons.addEventListener('click', function(event) {
    console.log(event.target)
    const target = event.target.closest('button')


    if(target != null) {
        const index = Array.from(target.parentElement.children).indexOf(target)
        clearInterval(interval)
        console.log('index', index)
        clonedCarousel.style.opacity=0
        carousel.style.transition = 'transform 3s ease-in-out'
        carousel.style.transform = `translateX(-${firstChildWidth * index}px)`

        multiplier = index
        interval= setInterval(handleSlide,5000)
    }
});






