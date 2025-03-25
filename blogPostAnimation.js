'use strict'

const bgAboutUsBarColor = getComputedStyle(root).getPropertyValue('--bg-abt-us-bar-color').trim();

const isMobile = window.innerWidth < 1024 ? true : false
//mobile
if(isMobile){
    const blogPosts = document.getElementById('blog-posts')
    blogPosts.ontouchstart  =  handleMouseMove
    blogPosts.ontouchend = handleMouseLeave  
}
//desktop
if(window.innerWidth> 1024 ){
    const blogPosts = document.getElementById('blog-posts')
    blogPosts.onmousemove=handleMouseMove
    blogPosts.onmouseleave=handleMouseLeave    
}


//reset the image
function handleMouseLeave(event){
    resetImage(prevTarget, null)
}

let prevTarget;
//scale the image
function handleMouseMove(event){
    const closestTarget= event.target.closest('a')

   if(closestTarget==null && prevTarget) {
        resetImage(prevTarget, null)
    return;
   }
    scaleImage(closestTarget)
    prevTarget = closestTarget;


}

function scaleImage(target){
    const img = target.firstElementChild.firstElementChild.firstElementChild
    target.firstElementChild.firstElementChild.style.backgroundColor = bgAboutUsBarColor
    img.style.transition = 'transform 0.5s'
    // img.style.transform = 'scale(1.5)'
    img.style.transform = "translateX(-20px)"
}
function resetImage(prevTarget, target){
    const prevTargetImg = prevTarget.firstElementChild.firstElementChild.firstElementChild
    prevTarget.firstElementChild.firstElementChild.style.backgroundColor = 'none'
    prevTargetImg.style.transition = 'transform 0.5s'
    // prevTargetImg.style.transform = 'scale(1)'
    prevTargetImg.style.transform = "translateX(0px)"

    if(!target==null) scaleImage(target) ;
}
