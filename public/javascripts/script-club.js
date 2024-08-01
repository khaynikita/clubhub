


const navLink = document.querySelectorAll('.navlink')

navLink.forEach(element=>{
    element.addEventListener('mouseover',()=>{
        element.classList.add('active')
    })
})
navLink.forEach(element=>{
    element.addEventListener('mouseout',()=>{
        element.classList.remove('active')
    })
})
