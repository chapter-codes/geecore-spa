'use strict'



//get the css variable value for primary-color and services slide-control-button color
const root = document.documentElement;
const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color').trim();
const slideBtnColor = getComputedStyle(root).getPropertyValue('--slide-control-button-color').trim();


//slide services carousel: desktop(sm, md, lg, etc)
const servicesCarousel = document.getElementById('services-carousel')
const servicesTransProp= 'transform 3s ease-in-out, opacity 2000ms'
const [modServicesCarousel, servicesCarouselClone, servicesSlidesLength,  servicestransfromXLen] = ModifyAndCloneCarousel(servicesCarousel, '#services-carousel-wrapper', servicesTransProp)
const servicesSlideMulltiplier=[1]
let   servCarouselInterval = setInterval(()=>{
    handleSlide(modServicesCarousel, servicesCarouselClone, servicesSlidesLength, servicestransfromXLen, servicesSlideMulltiplier, servicesTransProp, true ) 
} ,7000) 

 //slide services carousel with button click :desktop
const slideButtons= document.getElementById('slide-buttons')
slideButtons.addEventListener('click', (event)=>{
    slideWithButton(event, servCarouselInterval, modServicesCarousel, servicesCarouselClone,servicestransfromXLen, servicesSlideMulltiplier, servicesSlidesLength, servicesTransProp) 
}) 

//slide services carousel: mobile (< sm)
let btnsAreDisabled= false;
const [prevBtn, nextBtn]= Array.from(document.getElementById('mobile-slide-buttons').children).map(btn=>btn)
console.log('btns', prevBtn, nextBtn)
if (getComputedStyle(servicesCarousel.parentElement).display=='none'){ //desktop-services carousel is hidden
    const servicesCarousel = document.getElementById('mobile-services-carousel')
    const servicesTransProp= 'transform 3s ease-in-out, opacity 2000ms'
    const [modServicesCarousel, servicesCarouselClone, servicesSlidesLength,  servicestransfromXLen] = ModifyAndCloneCarousel(servicesCarousel, '#mobile-services-carousel-wrapper', servicesTransProp)
    const servicesSlideMulltiplier=[1]
    servCarouselInterval = setInterval(()=>{
        handleSlide(modServicesCarousel, servicesCarouselClone, servicesSlidesLength, servicestransfromXLen, servicesSlideMulltiplier, servicesTransProp, false) 
    } ,7000) 
    
    const slideButtons= document.getElementById('mobile-slide-buttons')
    slideButtons.addEventListener('click', (event)=>{
        slideWithButton(event, servCarouselInterval, modServicesCarousel, servicesCarouselClone,servicestransfromXLen, servicesSlideMulltiplier, servicesSlidesLength, servicesTransProp) 
   
        
    })  //slide services carousel with button click
    

}
//slide testimonial carousel.
const tsmCarousel= document.getElementById('testimonial-carousel')
const tsmSlideTransProp= `transform 2000ms cubic-bezier(0, 1.32, 0.27, 1.19), opacity 1000ms`
const [modTsmCarousel, tsmCarouselClone, tsmSlidesLength,  tsmTransfromXLen] = ModifyAndCloneCarousel(tsmCarousel, '#testimonial-carousel-wrapper', servicesTransProp)

const tsmSlideMultiplier=[1]
let tsmCarouselInterval = setInterval(()=>{
    handleSlide(modTsmCarousel, tsmCarouselClone, tsmSlidesLength, tsmTransfromXLen, tsmSlideMultiplier, tsmSlideTransProp, false ) 
} , 7000)






function ModifyAndCloneCarousel (carouselElement, cloneParent='#services-carousel-wrapper', transProp='') {
    const firstChildWidth = carouselElement.children[0].offsetWidth
    const carouselArray = Array.from(carouselElement.children)

    function LongestHeight(){
        const carouselArray= Array.from(document.getElementById(carouselElement.id).children)
        const longestElement= [...carouselArray].sort((a, b) => b.offsetHeight - a.offsetHeight)[0];
        return longestElement.offsetHeight
    }

    //set services carousel height when image has fully loaded
    if(carouselElement.id.includes('services')){
        const imgUrl = document.getElementById('services-carousel').firstElementChild.firstElementChild.firstElementChild.src
        const img = new Image()
        img.src= imgUrl
       
        carouselElement.style.height =  
            img.complete  
            ? `${LongestHeight()}px`
            : (img.onload = () => carouselElement.style.height = `${LongestHeight()}px`);
        console.log(LongestHeight())
    }else{
        carouselElement.style.height = `${LongestHeight()}px`
    }
    carouselElement.style.width = `${firstChildWidth}px`
    carouselElement.style.zIndex = '20'
    carouselElement.style.transition = transProp

    //loop through slides and arrange them to the right
    carouselArray.forEach((child, index) => {
        child.style.height=`${LongestHeight()}px`
        child.style.transform = `translateX(${firstChildWidth * index}px)`
        
    })

    //clone carouselElement to be used when fading out of last slide and fading in of first slide
    const clonedCarousel = carouselElement.cloneNode(true);
    clonedCarousel.id= 'cloned-' + carouselElement.id
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
        if(carouselElement.id.includes('mobile')){
           setTimeout(()=>{
                nextBtn.disabled=false
                nextBtn.style.opacity=1
                prevBtn.disabled=true
                prevBtn.style.opacity=0.6
           }, 1000)
        }else{}
        // fade out carousel, fade-in cloned cloned carousel 
        carouselClone.style.opacity=1
        carouselElement.style.opacity=0
        hasBtnControl? changeSlideBtnColor(0, multiplier[0], slidesLength): null

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
            prevBtn.disabled=false
            prevBtn.style.opacity=1
        }else if (carouselElement.id.includes('mobile') && multiplier[0]== slidesLength-1 ){
            nextBtn.disabled=true
            nextBtn.style.opacity=0.6
        }else{}

        

        carouselElement.style.transition = transProp
        carouselElement.style.transform = `translateX(-${transformxLen * multiplier}px)`
        hasBtnControl? changeSlideBtnColor(0, multiplier, slidesLength) : null
        multiplier[0]= multiplier[0] +1
    }   
}





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
                handleSlide(carousel, clonedCarousel, slidesLength, transformxLen, multiplier, transProp, tsmCarousel)
                }, 7000)
        }else if(target.id.includes('mobile-slide-button')){
            const btnsArray= Array.from(document.getElementById('mobile-slide-buttons').children)

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
                handleSlide(carousel, clonedCarousel, slidesLength, transformxLen, multiplier, transProp, false)
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

    if(slideControlMethod=='button-selected'){
        console.log(multiplier, index)
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








//handle hero section animation

const heroBgImage= document.getElementById('bg-image')
const body= document.body
const bgImageUrl= heroBgImage.style.backgroundImage.slice(5, -2)    
// console.log(bgImageUrl)

const img = new Image()
img.src=bgImageUrl



window.onload=()=>{
   img.complete? handleHeroSectionAnimation(): img.onload= handleHeroSectionAnimation
}


function handleHeroSectionAnimation(){
    console.log('handling')
    body.classList.add('allow-animation')
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
 
}



const aboutUsBar = document.getElementById('bar-section')
const bars= document.querySelectorAll('.bar')
const animatedText = document.getElementById('animated-text')
//
const barsSectionImage= document.querySelector('#bar-section').lastElementChild
const barsSectionImageHeight= barsSectionImage.offsetHeight
const prevTextHeight = animatedText.offsetHeight

//animate the about-us bar and  section on on scroll
window.onscroll= handleScroll

function handleScroll(){
    const barRect= aboutUsBar.getBoundingClientRect()
    const animatedTextRect= animatedText.getBoundingClientRect()

    if((barRect.top>0 && barRect.bottom <= window.innerHeight) && (animatedTextRect.top>0 && animatedTextRect.bottom <= window.innerHeight)){
        growText()
        growBars()
    
    }else if((barRect.top>0 && barRect.bottom <= window.innerHeight) && !(animatedTextRect.top>0 && animatedTextRect.bottom <= window.innerHeight)){
        ungrowText()
        growBars()
    }else if( !(barRect.top>0 && barRect.bottom <= window.innerHeight) && (animatedTextRect.top>0 && animatedTextRect.bottom <= window.innerHeight) ){
        growText()
        reduceBars()
    }
    else{
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


//animate the about-us section on mouseenter
const aboutUs = document.getElementById('about-us')
aboutUs.onmouseenter= ()=>{
    growText()
    growBars()
}

aboutUs.onmouseleave = ()=>{
    ungrowText()
    reduceBars()
}

