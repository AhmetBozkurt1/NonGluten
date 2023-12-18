document.addEventListener("DOMContentLoaded",function(){
  let localAdet=JSON.parse(localStorage.getItem("productAdet")) || 0
  if(localAdet>0){
    document.querySelector(".shopIcon-adet").innerHTML=localAdet
    }

  let localUrun=JSON.parse(localStorage.getItem("product")) || []

  if(localUrun.length==0){
    let sepetMessage=document.createElement("div")
    sepetMessage.classList.add("row","sepetMessage")
    sepetMessage.innerHTML+=`
        <div class="col-12">
            <h4 class="sepet-message">Sepetinizde Ürün Yoktur.</h4>
        </div>
    `
    document.querySelector(".aside-cart-urunler").appendChild(sepetMessage)
  }
})
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay:{
        delay:5000,
    },
    disableOnInteraction:false,
    keyboard: {
      enabled: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });