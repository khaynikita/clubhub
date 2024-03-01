


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

// const btn = document.querySelector('button');
// const input = document.querySelectorAll('.form-control');

// const validateForm = ()=>{
//     let flag = false;
//     let fname = form['first'].value;
//     let lname = form['last'].value;
//     let cls = form['class'].value;
//     let rollno = form['rollno'].value;
//     let email = form['email'].value;
//     let pnum = form['pnum'].value;
//     let club = form['club'].value;
//     let exp = form['exp'].value;

//     if(fname==="" || lname==="" || cls===""|| exp===""||club===""||rollno===""||pnum===""||email===""){
//         flag=true;
//     }else if(typeof(pnum)!=='number' || typeof(pnum)!=='number'){
//         flag=true;
//     }else if(validateEmail(email)===false){
//         flag=true;
//     }
//     return flag;
// }

// function validateEmail(inputText) {
//     var mailFormat =  /\S+@\S+\.\S+/;
//     if (inputText.value.match(mailFormat)) {
//       alert("Valid address!");
//       return true;
//     } else {
//       alert("Invalid address!");
//       return false;
//     }
//   }

// btn.addEventListener('click',(e)=>{
//     const flag = validateForm();

//     if(flag===true){
//         input.forEach(element=>{
//                 element.classList.add('border')
//                 element.classList.add('border-danger')
//             }
//         )
//     }
//     // flag? input.classList.add('border','border-danger') : input.classList.remove('border','border-danger')
// })
