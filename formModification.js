//handle form element modifications
const blogPostTextColor= getComputedStyle(root).getPropertyValue('--blog-text-color').trim();

const time =document.querySelector("input[type='time']")
time.value='12:00'
time.onchange=(event)=>{
    event.target.style.color=blogPostTextColor
}


const servicesDropdown =document.querySelector("form select")
servicesDropdown.onchange=(event)=>{
    event.target.style.color= blogPostTextColor
}