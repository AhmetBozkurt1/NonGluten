
// *!CART ALANI AÇILIP KAPANMASI
const cart=document.querySelector(".cart")
const cartOpen=document.querySelector(".nav-padding")

cartOpen.addEventListener("click",function(){
    document.querySelector("body").classList.add("open")
})

const cartClose=document.querySelector(".aside-cart-icon")

cartClose.addEventListener("click",function(){
    document.querySelector("body").classList.remove("open")
})

// *LOCALDE ÜRÜN VARSA AÇILAN BÖLÜMDE GÖSTERİLMESİ

document.addEventListener("DOMContentLoaded",function(){
    let localUrun=JSON.parse(localStorage.getItem("product")) || []
    if(localUrun.length>0){
       let sepetTotal=0
       localUrun.forEach(function(element){
           let sepetRow=document.createElement("div")
           sepetRow.classList.add("row","aside-cart-row")
           let productPrice = parseInt(element.fiyat);
           let productQuantity = element.adet;
           let totalPrice = productPrice * productQuantity;
           sepetRow.innerHTML+=`
               <div class="col-4 aside-cart-urunImage">
                   <img src="${element.image}" alt="">
               </div>
               <div class="col-8 aside-cart-urunAciklama">
                   <h6 class="product-name">${element.adi}</h6>
                   <div class="aside-cart-remove">
                       <i class="product-close fa-regular fa-rectangle-xmark"></i>
                   </div>
                   <div class="aside-cart-aciklama2">
                       <p class="productFiyat">${totalPrice} TL</p>
                       <div class="aside-cart-button">
                           <ul class="aside-cart-list">
                               <li>
                                   <button class="aside-cart-listIcon">
                                       <i class="aside-cart-eksi fa-regular fa-square-minus"></i>
                                   </button>
                               </li>
                               <li>
                                   <span class="aside-cart-number">${element.adet}</span>
                               </li>
                               <li>
                                   <button class="aside-cart-listIcon">
                                       <i class="aside-cart-arti fa-regular fa-square-plus"></i>
                                   </button>
                               </li>
                           </ul>
                       </div>
                   </div>
               </div>
           `
           document.querySelector(".aside-cart-urunler").appendChild(sepetRow)
           sepetTotal+=productPrice*productQuantity
           
           document.querySelector(".aside-cart-allFiyat").innerHTML = `${sepetTotal} TL`;
           let cartFooter=document.querySelector(".aside-cart-footer")
           cartFooter.style.display="block"
       })
    }else{
        let sepetMessage=document.createElement("div")
        sepetMessage.classList.add("row","sepetMessage")
        sepetMessage.innerHTML+=`
            <div class="col-12">
                 <h4 class="sepet-message">Sepetinizde Ürün Yoktur.</h4>
            </div>
        `
    }
})

// *SEPETTEN ÜRÜN SİLME

let sepetAside=document.querySelector(".aside-cart-urunler")

sepetAside.addEventListener("click",function(e){
    let localUrun=JSON.parse(localStorage.getItem("product")) || []
    let localUrunAdet=JSON.parse(localStorage.getItem("productAdet")) || 0

    if(e.target.classList.contains("product-close")){
        let sepetAdet=document.querySelector(".shopIcon-adet")
        let sepetRow=e.target.parentElement.parentElement.parentElement
        let productName=sepetRow.querySelector(".product-name")
        let productAdet=sepetRow.querySelector(".aside-cart-number").innerHTML
        let productFiyat=parseInt(sepetRow.querySelector(".productFiyat").innerHTML)
        let total=parseInt(document.querySelector(".aside-cart-allFiyat").innerHTML)
        let newTotal=total-productFiyat
        document.querySelector(".aside-cart-allFiyat").innerHTML=`${newTotal} TL`
        
        sepetRow.remove()
        sepetAdet.innerHTML=sepetAdet.innerHTML-productAdet
        // *localdende bu verileri silmem gerekiyor

        let newProduct=localUrun.filter(element=>element.adi!==productName.innerHTML)
        localStorage.setItem("product",JSON.stringify(newProduct))

        let newAdet=localUrunAdet-productAdet
        localStorage.setItem("productAdet",JSON.stringify(newAdet))

        cartClose.addEventListener("click",function(){
            location.reload()
        })

        if(newProduct.length==0){
            let cartFooter=document.querySelector(".aside-cart-footer")
            cartFooter.style.display="none"

            let sepetMessage=document.createElement("div")
            sepetMessage.classList.add("row","sepetMessage")
            sepetMessage.innerHTML+=`
                <div class="col-12">
                    <h4 class="sepet-message">Sepetinizde Ürün Yoktur.</h4>
                </div>
            `
            // *burada sepette ürün bittikten sonra sayfadan tekrar ürün eklediğimde eski silinen ürünleri de getiriyordu o yüzden sepette ürün sayısı 0 eşit olunca X butonuna basılınca sayfayı yeniletme yaptım.
            document.querySelector(".aside-cart-urunler").appendChild(sepetMessage)
            cartClose.addEventListener("click",function(){
                location.reload()
            })
        }
    }
    else if(e.target.classList.contains("aside-cart-arti")){
        let parent=e.target.parentElement.parentElement.parentElement.parentElement
        let urunAdi=parent.parentElement.previousElementSibling.previousElementSibling.innerHTML
        let urunFiyat=parent.previousElementSibling
        let urunAdet=e.target.parentElement.parentElement.previousElementSibling.children[0]
        let numberUrunAdet=Number(urunAdet.innerHTML)
        let urunAdetToplam=document.querySelectorAll(".aside-cart-number")
        let totalFiyat=document.querySelector(".aside-cart-allFiyat")
        let tekUrunFiyat=parseInt(urunFiyat.innerHTML)/numberUrunAdet
        let deleteTotal=parseInt(totalFiyat.innerHTML)-parseInt(urunFiyat.innerHTML)
        
       
        let newAdet=numberUrunAdet+1
        urunAdet.innerHTML=newAdet
        urunFiyat.innerHTML=`${newAdet*tekUrunFiyat} TL`
        let newUrunFiyat=parseInt(urunFiyat.innerHTML)
        totalFiyat.innerHTML=`${newUrunFiyat+deleteTotal} TL`

        cartClose.addEventListener("click",function(){
            location.reload()
        })

        // *aldığım ilk hatalar: ürünü sayfadan sepete eklediğimde localde ürün adeti gözüküyordu ve arttırma butonuna bastığımda sadece arttırma yaptığım ürünün adetini locale ürün adeti olarak kaydediyordu.locale kaydetmeyi yukarıda ürün adetini kaydedecek şekilde yapmıştım bunun önüne tüm ürünlerin adet sayılarını dizi ile dolaşarak toplayıp son hallerini locale gönderdim.

        // *aldığım ikinci hata:sayfadan ürün ekleme yapıyorum sepete daha sonra sepette arttırdığımda object tipindeki ürünlerin veri tipinde adet artmadığı için sepetten çıkıp sayfa yenilendiği zaman ürünlerin ilk hali(sayfadan eklendiği hali) sepette karşıma çıkıyordu.bunu da localde ürünleri çektim daha sonra bir değişkende find fonksiyonunu çalıştırdım eğer localdeki ürünler ile işlem yaptığım ürün ad olarak eşleşiyorsa içindeki adet değerini bir arttırıp son hali ile locale set ettim

        let sayi=0
        urunAdetToplam.forEach(function(element){
            number=Number(element.innerHTML)
            sayi+=number
        })
        localStorage.setItem("productAdet",JSON.stringify(sayi))
        
        let localVarUrun=JSON.parse(localStorage.getItem("product")) || []
        let varProduct=localVarUrun.find(item=>item.adi==urunAdi)
        if(varProduct){
            varProduct.adet++
        }
        localStorage.setItem("product",JSON.stringify(localVarUrun))
    }
    else if(e.target.classList.contains("aside-cart-eksi")){
        let parent=e.target.parentElement.parentElement.parentElement.parentElement
        let urunAdi=parent.parentElement.previousElementSibling.previousElementSibling.innerHTML
        let urunFiyat=parent.previousElementSibling
        let urunAdet=e.target.parentElement.parentElement.nextElementSibling.children[0]
        let numberUrunAdet=Number(urunAdet.innerHTML)
        let totalFiyat=document.querySelector(".aside-cart-allFiyat")
        let tekUrunFiyat=parseInt(urunFiyat.innerHTML)/numberUrunAdet
        let deleteTotal=parseInt(totalFiyat.innerHTML)-parseInt(urunFiyat.innerHTML)
        let urunAdetToplam=document.querySelectorAll(".aside-cart-number")

        if(numberUrunAdet>1){
            let newAdet=numberUrunAdet-1
            urunAdet.innerHTML=newAdet
            let newUrunFiyat=newAdet*tekUrunFiyat
            urunFiyat.innerHTML=`${newUrunFiyat} TL`
            totalFiyat.innerHTML=`${newUrunFiyat+deleteTotal} TL`
            
            cartClose.addEventListener("click",function(){
                location.reload()
            })

            // *burada da yukarıda arttır butonunda yaptığım gibi tüm değerleri localden çektim üzerine ekleyip tekrar locale attım
            let sayi=0
            urunAdetToplam.forEach(function(item){
                number=Number(item.innerHTML)
                sayi+=number
            })
            localStorage.setItem("productAdet",JSON.stringify(sayi))

            let localVarUrun=JSON.parse(localStorage.getItem("product")) || []
            let varProduct=localVarUrun.find(item=>item.adi==urunAdi)
            if(varProduct){
                varProduct.adet--
            }
            localStorage.setItem("product",JSON.stringify(localVarUrun))
        }
    }
})

// *SEPETTE BUTONLARIN AKTİF EDİLMESİ


