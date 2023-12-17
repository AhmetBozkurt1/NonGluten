const sıgnInBtn=document.querySelector(".sıgnIn-Button")
const sıgnUpBtn=document.querySelector(".sıgnUp-registerButton")
const signIn=document.querySelector(".sign-in")
const signUp=document.querySelector(".sign-up")
let signInWelcome=document.querySelector(".signIn-welcome")
let signInWelcomeYan=document.querySelector("#yanMenu")
let signUpRegister=document.querySelector(".sıgnUp-register")
let signUpRegisterYan=document.querySelector("#yanRegister")
const yanSignUpBtn = document.querySelector("#yanMenu .sıgnIn-Button");
sıgnUpBtn.addEventListener("click", toggleSignUp);
yanSignUpBtn.addEventListener("click", toggleSignUp);

sıgnInBtn.addEventListener("click",function(){
    document.querySelector(".sectionTranslate").classList.add("right-panel")
    signIn.style.borderRadius="0px 30px 30px 0px"
    signUp.style.borderRadius="30px 0px 0px 30px"
    signInWelcome.style.display="none"
    signInWelcomeYan.style.display="block"
    signUpRegister.style.display="none"
    signUpRegisterYan.style.display="block"
})
function toggleSignUp() {
    document.querySelector(".sectionTranslate").classList.remove("right-panel");
    signIn.style.borderRadius = "30px 0px 0px 30px";
    signUp.style.borderRadius = "0px 30px 30px 0px";
    signInWelcome.style.display = "block";
    signInWelcomeYan.style.display = "none";
    signUpRegister.style.display = "block";
    signUpRegisterYan.style.display = "none";
}


