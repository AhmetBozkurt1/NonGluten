document.addEventListener("DOMContentLoaded",function(){
  let localUrunAdet=JSON.parse(localStorage.getItem("productAdet")) || 0
  let urunAdet=document.querySelector(".shopIcon-adet")
  urunAdet.innerHTML=localUrunAdet
})
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    // autoplay:{
    //     delay:5000,
    // },
    disableOnInteraction:false,
    keyboard: {
      enabled: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });