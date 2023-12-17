// *!MYBOOK SEARCH ALANI AÇILIP KAPANMASI

const searchOpenIcon=document.querySelector(".shopping-searchNow-icon")
const searchCloseIcon=document.querySelector(".shopping-search-exit")

searchOpenIcon.addEventListener("click",function(){
    document.querySelector(".shopping-navbar-search").classList.add("openSearch")
})

searchCloseIcon.addEventListener("click",function(){
    document.querySelector(".shopping-navbar-search").classList.remove("openSearch")
})

// *DOMCONTENTLOAD BAŞLANGIÇ

document.addEventListener("DOMContentLoaded",function(){
    // *Sayfa ilk yüklendiğinde eğer localde ürün ve ürün adeti varsa bunları ilgili alanlarda gösterdim yoksa mesaj verdim
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
// *DOMCONTENTLOAD BİTİŞ

// *LOCALSTORAGE ÜRÜN EKLEME

const urunlerAlan=document.querySelector(".urunler")
let sepetAdet=document.querySelector(".shopIcon-adet")

let urun=JSON.parse(localStorage.getItem("product")) || []
let urunAdet=JSON.parse(localStorage.getItem("productAdet")) || 0

urunlerAlan.addEventListener("click",function(e){
    if(e.target.classList.contains("urun-ekle")){
        let parentDiv=e.target.parentElement.parentElement.parentElement
        let urunAdi=parentDiv.previousElementSibling.children[0].innerHTML
        let urunFiyat=parentDiv.previousElementSibling.children[1].innerHTML
        let urunImage=parentDiv.previousElementSibling.previousElementSibling.children[0].src

        urunAdet++
        
        // *burada locale kaydedilen ürünler arasında aynı ürün varsa ikinciye ürün eklemeden sadece obje içine oluşturduğum adet değerini arttırıyorum.Bunuda find fonksiyonu ile yaptım.ayn değilse yeni ürün olarak push ediyorum.
        let varProduct=urun.find(item=>item.adi==urunAdi)
        if(varProduct){
            varProduct.adet++
        }else{
            urun.push(
                {
                    adi:urunAdi,
                    fiyat:urunFiyat,
                    image:urunImage,
                    adet:1,
                }
            )
        }
        localStorage.setItem("product",JSON.stringify(urun))
        localStorage.setItem("productAdet",JSON.stringify(urunAdet))
        sepetAdet.innerHTML++
        // *sayfayı refresh etmek için kullandık
        location.reload()
    }
})
