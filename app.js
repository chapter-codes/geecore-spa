'use strict'

//get the css variable value for primary and slide-control color
const root = document.documentElement;
const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color').trim();
const slideBtnColor = getComputedStyle(root).getPropertyValue('--slide-control-button-color').trim();


//slide services carousel
const servicesCarousel = document.getElementById('services-carousel')
const servicesTransProp= 'transform 3s ease-in-out, opacity 1000ms'
const [modServicesCarousel, servicesCarouselClone, servicesSlidesLength,  servicestransfromXLen] = ModifyAndCloneCarousel(servicesCarousel, '#services-carousel-wrapper', servicesTransProp)
const servicesSlideMulltiplier=[1]
let   servCarouselInterval = setInterval(()=>{
    handleSlide(modServicesCarousel, servicesCarouselClone, servicesSlidesLength, servicestransfromXLen, servicesSlideMulltiplier, servicesTransProp, true ) 
} , 5000) 

const slideButtons= document.getElementById('slide-buttons')
slideButtons.addEventListener('click', (event)=>{
    slideWithButton(event, servCarouselInterval, modServicesCarousel, servicesCarouselClone,servicestransfromXLen, servicesSlideMulltiplier, servicesSlidesLength, servicesTransProp) 
})  //slide services carousel with button click


//slide testimonial carousel.
const tsmCarousel= document.getElementById('testimonial-carousel')
const [modTsmCarousel, tsmCarouselClone, tsmSlidesLength,  tsmTransfromXLen] = ModifyAndCloneCarousel(tsmCarousel, '#testimonial-carousel-wrapper', servicesTransProp)

const tsmSlideMultiplier=[1]
let tsmCarouselInterval = setInterval(()=>{
    handleSlide(modTsmCarousel, tsmCarouselClone, tsmSlidesLength, tsmTransfromXLen, tsmSlideMultiplier, servicesTransProp, false ) 
} , 5000) 








function ModifyAndCloneCarousel (carouselElement, cloneParent='#services-carousel-wrapper', transProp='') {
    const carouselArray = Array.from(carouselElement.children)
    const longestElement= [...carouselArray].sort((a, b) => b.offsetHeight - a.offsetHeight)[0];

    // console.log()
    const firstChildWidth = carouselElement.children[0].offsetWidth
    // const firstChildHeight = carouselElement.children[0].offsetHeight
    carouselElement.style.width = `${firstChildWidth}px`
    carouselElement.style.height = `${longestElement.offsetHeight}px`
    carouselElement.style.zIndex = '20'
    carouselElement.style.transition = transProp

    //loop through slides and arrange them to the right
    carouselArray.forEach((child, index) => {
        child.style.height=`${longestElement}px`
        child.style.transform = `translateX(${firstChildWidth * index}px)`
        
    })

    //clone carouselElement to be used when fading out of last slide and fading in of first slide
    const clonedCarousel = carouselElement.cloneNode(true);
    clonedCarousel.id='cloned-carousel'
    clonedCarousel.style.transition = transProp
    clonedCarousel.style.position = 'absolute'
    clonedCarousel.style.zIndex = '10'
    clonedCarousel.style.top = '0'
    clonedCarousel.style.left = '0'

    //keep cloned carousel fadded out
    clonedCarousel.style.opacity = 0
    
    //append cloned carousel which is positioned absolute to the carousel-wrapper
    document.querySelector(`${cloneParent}`).appendChild(clonedCarousel)

    return [carouselElement, clonedCarousel,  carouselArray.length, firstChildWidth]
}

//set interval to slide carousel every 5 seconds
// let interval= setInterval(()=>handleSlide(carousel, clonedCarousel, carousel.Length,  multiplier ), 5000);




function handleSlide(carouselElement, carouselClone, slidesLength, transformxLen, multiplier, transProp="", hasBtnControl=false){
    //if last carousel item is reached, fade out and reset carousel
    if(multiplier[0] ==slidesLength) {
        //fade out carousel, fade-in cloned cloned carousel 
        // carouselClone.style.opacity=1
        // carouselElement.style.opacity=0
        // carouselClone.style.transform = `translateX(0px)`
        // hasBtnControl? changeSlideBtnColor(0, multiplier[0], slidesLength): null

        // //fade-in back the carousel and translate it to the first slide after 1000ms( opacity transition)
        // setTimeout(() => {
        //     carouselElement.style.opacity= 1
        //     carouselElement.style.transition = 'none'
        //     carouselElement.style.transform = `translateX(0px)`
           
        //     //fade out the cloned carousel from the background
        //     carouselClone.style.opacity=0
        // }, 1000);

        // //reset
        // // multiplier[0]=1
    }else{
        //slide carousel
        carouselElement.style.transition = transProp
        carouselElement.style.transform = `translateX(-${transformxLen * multiplier}px)`
        hasBtnControl? changeSlideBtnColor(0, multiplier, slidesLength) : null

        multiplier[0]= multiplier[0] +1
    }   
}





function slideWithButton(event, openInterval, carousel, clonedCarousel, transformxLen, multiplier, slidesLength, transProp) {
    const target = event.target.closest('button')
    if(target != null) {
        const index = Array.from(target.parentElement.children).indexOf(target)
        console.log(openInterval)
        clearInterval(servCarouselInterval)

        //fade out the cloned carousel incase its shown, anytime the button is clicked.
        clonedCarousel.style.opacity=0
        carousel.style.transition = 'transform 3s ease-in-out, opacity 1000ms'
        carousel.style.transform = `translateX(-${transformxLen * index}px)`

        const previousMultiplierValue= multiplier[0]
        changeSlideBtnColor(index, previousMultiplierValue, slidesLength, 'button-selected')
        multiplier[0] = index+1
        servCarouselInterval= setInterval(()=>{
    // handleSlide(modServicesCarousel, servicesCarouselClone, servicesSlidesLength, servicestransfromXLen, servicesSlideMulltiplier, servicesTransProp, true ) 
    //
            handleSlide(carousel, clonedCarousel, slidesLength, transformxLen, multiplier, transProp, true )
        }, 5000)
        console.log(openInterval)
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








// const testimonialCarousel=document.getElementById('testimonial-carousel')
// const tstCarouselArray= Array.from(testimonialCarousel.children)
// console.dir(tstCarouselArray)
// const {offsetHeight:height, offsetWidth:width} = tstCarouselArray[0]
// console.log(width, height)
// testimonialCarousel.style.height=  `${height}px`
// testimonialCarousel.style.width=  `${width}px`
// testimonialCarousel.style.transition='transform 2s ease-in'


// tstCarouselArray.forEach((child,index) =>{
//     const translateX=(index * width)

//     console.log(width, index, translateX)
//     child.style.position='absolute'
//     child.style.transform=`translateX(${translateX}px)`
// })

// let tsmCarouselInterval=1
// setInterval(()=>{
//     if(tsmCarouselInterval==3){
//         testimonialCarousel.style.opacity=0
        
//     }else{
//         testimonialCarousel.style.transform=`translateX(-${width * tsmCarouselInterval}px)`
//         tsmCarouselInterval++
//     }

// }, 5000)


// const servicesCarousel = document.getElementById('services-carousel')
// const [modServicesCarousel, servicesCarouselClone, servicesSlidesLength,  servicestransfromXLen] = ModifyAndCloneCarousel(servicesCarousel, '#services-carousel-wrapper')

// const servicesSlideMulltiplier=[1]
// let servCarouselInterval = setInterval(()=>{
//     handleSlide(modServicesCarousel, servicesCarouselClone, servicesSlidesLength, servicestransfromXLen, servicesSlideMulltiplier, true ) 
// } , 5000) 



const aboutUsBar = document.getElementById('bar-section')
const bars= document.querySelectorAll('.bar')
const barsSectionImage= document.querySelector('#bar-section').lastElementChild
const barsSectionImageHeight= barsSectionImage.offsetHeight
console.log(barsSectionImage, barsSectionImageHeight)
window.onscroll= handleScroll

function handleScroll(){
    growBar()
}

function growBar(){
    const rect= aboutUsBar.getBoundingClientRect()
    const {top, bottom}= rect
                        
    if(top>0 && rect.bottom <= window.innerHeight){
       //start animations   

       bars.forEach(bar=>{
        bar.style.padding=0;
        bar.style.height= barsSectionImage.offsetHeight/2 +'px'
       })
    }else{
        bars.forEach(bar=>{
            bar.style.padding=0;
            bar.style.height= barsSectionImage.offsetHeight/3 +'px'
           })
    }


}





//handle hero section animation

const heroSection= document.getElementById('hero')
const heroContent= document.getElementById('hero-content')
const bgImageUrl= heroSection.style.backgroundImage.slice(5, -2)    
// console.log(bgImageUrl)

const img = new Image()
img.src=bgImageUrl



window.onload=()=>{
   img.complete? handleHeroSectionAnimation(): img.onload= handleHeroSectionAnimation
}


function handleHeroSectionAnimation(){
    console.log('handling')
    heroContent.classList.add('allow-animation')
}


//handle showing the mobile navigation menu
const menuBar= document.getElementById('menu-bar')
const menuBtn= menuBar.firstElementChild

//add click event listener
menuBar.onclick= handleMenuBtnClick

function handleMenuBtnClick(){

    const mobileNavbar= document.getElementById('mobile-navbar')
    mobileNavbar.classList.toggle('show')

    if(mobileNavbar.classList.contains('show')){
        mobileNavbar.style.height='500px'
    }else{
        mobileNavbar.style.height='0'

    }
    
    // navigation.classList.toggle('hidden')
    console.log('u click')
    console.log(navigation)
}