'use strict'

//get the css variable value for primary-color and services slide-control-button color
const root = document.documentElement;
const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color').trim();
const slideBtnColor = getComputedStyle(root).getPropertyValue('--slide-control-button-color').trim();


//hero section animation
const heroBgImage= document.getElementById('bg-image')
const body= document.body
const bgImageUrl= heroBgImage.style.backgroundImage.slice(5, -2)    
const img = new Image()
img.src=bgImageUrl

window.onload=()=>{
   img.complete? handleHeroSectionAnimation(): img.onload= handleHeroSectionAnimation
}






// services setInterval ID
let servCarouselInterval;

//mobile screen
if(window.innerHeight<768){
    //handle showing the mobile navigation menu
    const menuBar= document.getElementById('menu-bar')
    menuBar.onclick= handleMenuBtnClick

    //slide services carousel, automatically: mobile (< sm)
    const [prevBtn, nextBtn]= Array.from(document.getElementById('mobile-slide-buttons').children).map(btn=>btn)
    const servicesCarousel = document.getElementById('mobile-services-carousel')
    const servicesTransProp= 'transform 3s ease-in-out, opacity 2000ms'
    const [modServicesCarousel, servicesCarouselClone, servicesSlidesLength,  servicestransfromXLen] = ModifyAndCloneCarousel(servicesCarousel, '#mobile-services-carousel-wrapper', servicesTransProp)
    const servicesSlideMulltiplier=[1]
    servCarouselInterval = setInterval(()=>{
        handleSlide(modServicesCarousel, servicesCarouselClone, servicesSlidesLength, servicestransfromXLen, servicesSlideMulltiplier, servicesTransProp, {prevBtn, nextBtn} ) 
    } ,7000) 
        
    //slide services carousel with button click
    const slideButtons= document.getElementById('mobile-slide-buttons')
    slideButtons.addEventListener('click', (event)=>{
        slideWithButton(event, servCarouselInterval, modServicesCarousel, servicesCarouselClone,servicestransfromXLen, servicesSlideMulltiplier, servicesSlidesLength, servicesTransProp) 
    })  
}


if(window.innerWidth>768){
    //slide services carousel, automatically: desktop(sm, md, lg, etc)
    const servicesCarousel = document.getElementById('services-carousel')
    const servicesTransProp= 'transform 3s ease-in-out, opacity 2000ms'
    const [modServicesCarousel, servicesCarouselClone, servicesSlidesLength,  servicestransfromXLen] = ModifyAndCloneCarousel(servicesCarousel, '#services-carousel-wrapper', servicesTransProp)
    const servicesSlideMulltiplier=[1]
    servCarouselInterval = setInterval(()=>{
        handleSlide(modServicesCarousel, servicesCarouselClone, servicesSlidesLength, servicestransfromXLen, servicesSlideMulltiplier, servicesTransProp, true ) 
    } ,7000) 

    //slide services carousel with button click :desktop
    const slideButtons= document.getElementById('slide-buttons')
    slideButtons.addEventListener('click', (event)=>{
        slideWithButton(event, servCarouselInterval, modServicesCarousel, servicesCarouselClone,servicestransfromXLen, servicesSlideMulltiplier, servicesSlidesLength, servicesTransProp) 
    }) 
}



//slide testimonial carousel.
const tsmCarousel= document.getElementById('testimonial-carousel')
const tsmSlideTransProp= `transform 2000ms cubic-bezier(0, 1.32, 0.27, 1.19), opacity 1000ms`
const [modTsmCarousel, tsmCarouselClone, tsmSlidesLength,  tsmTransfromXLen] = ModifyAndCloneCarousel(tsmCarousel, '#testimonial-carousel-wrapper', tsmSlideTransProp)

const tsmSlideMultiplier=[1]
let tsmCarouselInterval = setInterval(()=>{
    handleSlide(modTsmCarousel, tsmCarouselClone, tsmSlidesLength, tsmTransfromXLen, tsmSlideMultiplier, tsmSlideTransProp, false ) 
} , 7000)



function ModifyAndCloneCarousel (carouselElement, cloneParentId='#services-carousel-wrapper', transProp='') {
    const cloneParent= document.querySelector(`${cloneParentId}`)
    const carouselArray = Array.from(carouselElement.children)

    carouselElement.style.zIndex = '20'
    carouselElement.style.transition = transProp

    //clone carouselElement to be used when fading out of last slide and fading in of first slide
    const clonedCarousel = carouselElement.cloneNode(true);
    clonedCarousel.id= 'cloned-' + carouselElement.id
    clonedCarousel.style.height=cloneParent.firstElementChild.offsetHeight+'px'
    clonedCarousel.style.width=cloneParent.firstElementChild.offsetWidth+'px'
    clonedCarousel.style.transition = transProp
    clonedCarousel.style.position = 'absolute'
    clonedCarousel.style.zIndex = '10'
    clonedCarousel.style.top = '0'
    clonedCarousel.style.left = '0'

    //keep cloned carousel fadded out
    clonedCarousel.style.opacity = 0
    
    //append cloned carousel which is positioned absolute to the carousel-wrapper
    cloneParent.appendChild(clonedCarousel)
    return [carouselElement, clonedCarousel,  carouselArray.length, cloneParent.offsetWidth]
}

//add class to body to allow animation
function handleHeroSectionAnimation(){ 
    body.classList.add('allow-animation')
}

//toggle 'show' class
function handleMenuBtnClick(){
    const mobileNavbar= document.getElementById('mobile-navbar')
    mobileNavbar.classList.toggle('show')

    if(mobileNavbar.classList.contains('show')){
        mobileNavbar.style.height='500px'
    }else{
        mobileNavbar.style.height='0'
    }
}


function handleSlide(carouselElement, carouselClone, slidesLength, transformxLen, multiplier, transProp="", hasBtnControl=false){
    //if last carousel item is reached, fade out and reset carousel
    if(multiplier[0] ==slidesLength) {
        if(carouselElement.id.includes('mobile')){
           setTimeout(()=>{
                hasBtnControl.nextBtn.disabled=false
                hasBtnControl.nextBtn.style.opacity=1
                hasBtnControl.prevBtn.disabled=true
                hasBtnControl.prevBtn.style.opacity=0.6
           }, 1000)
        }else{
        }
        // fade out carousel, fade-in cloned cloned carousel 
        carouselClone.style.opacity=1
        carouselElement.style.opacity=0
        hasBtnControl===true? changeSlideBtnColor(0, multiplier[0], slidesLength): null

        //fade-in back the carousel and translate it to the first slide after 1000ms( opacity transition)
        setTimeout(() => {
            carouselElement.style.opacity= 1
            carouselElement.style.transition = 'none'
            carouselElement.style.transform = `translateX(0px)`
           
            //fade out the cloned carousel from the background
            carouselClone.style.opacity=0
        }, 2000);

        //reset
        multiplier[0]=1
    }else{
        //slide carousel
        if(carouselElement.id.includes('mobile') && multiplier[0]==1){
            hasBtnControl.prevBtn.disabled=false
            hasBtnControl.prevBtn.style.opacity=1
        }else if (carouselElement.id.includes('mobile') && multiplier[0]== slidesLength-1 ){
            hasBtnControl.nextBtn.disabled=true
            hasBtnControl.nextBtn.style.opacity=0.6
        }else{}

        

        carouselElement.style.transition = transProp
        carouselElement.style.transform = `translateX(-${transformxLen * multiplier}px)`
        hasBtnControl===true? changeSlideBtnColor(0, multiplier, slidesLength) : null
        multiplier[0]= multiplier[0] +1
    }   
}




const btnsArray= Array.from(document.getElementById('mobile-slide-buttons').children)
const [prevBtn, nextBtn]= btnsArray

function slideWithButton(event, openInterval, carousel, clonedCarousel, transformxLen, multiplier, slidesLength, transProp) {
    const target = event.target.closest('button')
    if(target != null) {
        clearInterval(servCarouselInterval)
        const index = Array.from(target.parentElement.children).indexOf(target)
        const previousMultiplierValue= multiplier[0]

        //fade out the cloned carousel incase its shown, anytime the button is clicked.
        clonedCarousel.style.opacity=0
        carousel.style.transition = transProp

        if(!target.id.includes('mobile-slide-button')){
            carousel.style.transform = `translateX(-${transformxLen * index}px)`
            changeSlideBtnColor(index, previousMultiplierValue, slidesLength, 'button-selected')

            multiplier[0] = index+1
            servCarouselInterval= setInterval(()=>{
                handleSlide(carousel, clonedCarousel, slidesLength, transformxLen, multiplier, transProp, true)
                }, 7000)
        }else if(target.id.includes('mobile-slide-button')){

            if(target.id=='mobile-slide-button-prev'){
                if(multiplier[0] > 1 ){
                   
                    carousel.style.transform =  `translateX(-${transformxLen * (multiplier[0]-2)}px)`
                    multiplier[0]=previousMultiplierValue-1
                }

            }else if(target.id=='mobile-slide-button-next'){
                if(multiplier[0] < slidesLength ){
                   
                    carousel.style.transform = `translateX(-${transformxLen * multiplier[0]+1}px)`
                    multiplier[0]=previousMultiplierValue +1
                }

            }else{
              
            }
            //
            servCarouselInterval= setInterval(()=>{
            handleSlide(carousel, clonedCarousel, slidesLength, transformxLen, multiplier, transProp, {prevBtn, nextBtn})
                }, 7000)

            multiplier[0]==1? (target.disabled=true, target.style.opacity=0.6)
            : multiplier[0]>1 && multiplier <slidesLength ? btnsArray.forEach(btn=>{
                btn.style.opacity=1
                btn.disabled=false
            })
            :multiplier[0]==slidesLength? (target.disabled=true, target.style.opacity=0.6) : (target.disabled=false, target.style.opacity=1)

        }else{

        }
    }
}


function changeSlideBtnColor(index=0, multiplier, slidesLength, slideControlMethod=''){
    const slideButtons= document.getElementById('slide-buttons')
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













