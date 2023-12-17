// *!RECIPES SEARCH ALANI AÇILIP KAPANMASI

const searchOpenIcon=document.querySelector(".searchNow-icon")
const searchCloseIcon=document.querySelector(".search-exit")

searchOpenIcon.addEventListener("click",function(){
    document.querySelector(".recipes-navbar-search").classList.add("openSearch")
})

searchCloseIcon.addEventListener("click",function(){
    document.querySelector(".recipes-navbar-search").classList.remove("openSearch")
})