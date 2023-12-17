document.addEventListener("DOMContentLoaded",function(){
    let localSepetUrun=JSON.parse(localStorage.getItem("product")) || []
    let localSepetAdet=JSON.parse(localStorage.getItem("productAdet")) || 0
    if(localSepetUrun.length>0){
        let sepetSayi=document.querySelector(".shopIcon-adet")
        sepetSayi.innerHTML=localSepetAdet
        localSepetUrun.forEach(function(element){
            let contentRow=document.createElement("div")
            contentRow.classList.add("row","sepet-content-row")
            let contentFiyat=parseInt(element.fiyat)
            let contentAdet=element.adet
            let contentTotal=contentAdet*contentFiyat
            contentRow.innerHTML+=`
                <div class="col-2 sepet-content-urunImage">
                    <img src="${element.image}" alt="">
                </div>
                <div class="col-10 sepet-content-urunAciklama">
                    <div class="sepet-content-all h-100">
                        <div class="row h-100">
                            <div class="col-md-6 sepet-content-urunName">
                                <div class="sepet-content-name">
                                    <h6 class="content-product-name">${element.adi}</h6>
                                </div>
                                <div class="sepet-content-delete">
                                    <button class="sepet-delete-btn">
                                        <i class="delete-btn-icon fa-regular fa-trash-can"></i>
                                        <a href="#" class="delete-link" href="urunler.html">Sepetten Sil</a>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-3 sepet-content-urunButton">
                                <div class="sepet-content-button">
                                    <ul class="sepet-content-list">
                                        <li class="sepet-content-list1">
                                            <button class="sepet-content-listIcon">
                                                <i class="sepet-urunAzalt fa-solid fa-minus"></i>
                                            </button>
                                        </li>
                                        <li class="sepet-content-listFlex text-center">
                                            <span class="sepet-content-number">${element.adet}</span>
                                            <span class="sepet-content-adet">Adet</span>
                                        </li>
                                        <li class="sepet-content-list2">
                                            <button class="sepet-content-listIcon">
                                                <i class="sepet-urunArttir fa-solid fa-plus"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-3 sepet-content-urunFiyat">
                                <div class="sepet-contenfiyat">
                                    <p class="content-productFiyat">${contentTotal} TL</p>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            `
            document.querySelector(".sepet-content-urunler").appendChild(contentRow)
        })

        // *HESAP ÖZETİ KISMI FİYAT AYARLAMA
        let sayi=0
        let sepetToplam=document.querySelectorAll(".content-productFiyat")
        sepetToplam.forEach(function(element){
            let numberSepetToplam=parseInt(element.innerHTML)
            sayi+=numberSepetToplam
        })
        let araToplam=document.querySelector(".sepet-araToplam-fiyat")
        let kdv=document.querySelector(".sepet-pay-kdv")
        let kadvDahil=document.querySelector(".sepet-pay-kdvDahil")
        let sepetTotalFiyat=document.querySelector(".sepet-pay-fiyatTotal")
        araToplam.innerHTML=`${sayi} TL`
        let kdvHesaplama=parseInt(araToplam.innerHTML)/100
        kdv.innerHTML=`${kdvHesaplama} TL`
        kadvDahil.innerHTML=`${parseInt(araToplam.innerHTML)+parseFloat(kdv.innerHTML)} TL`
        sepetTotalFiyat.innerHTML=`${parseFloat(kadvDahil.innerHTML)} TL`
        // *HESAP ÖZETİ KISMI FİYAT AYARLAMA

    }else{
        let containerSepet=document.querySelector(".sepet")
        let sepet=document.querySelector(".sepetDisplayNone")
        let contentRowBos=document.createElement("div")
        contentRowBos.classList.add("row","sepet-content-bosMessage")
        sepet.style.display="none"
        contentRowBos.innerHTML=`
            <div class="col-12 sepet-content-messageText">
                <div class="sepetMessage-section">
                    <div class="sepetMessage-icon">
                        <i class="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <div class="sepetMessage-text">
                        <h6>Alışveriş Sepetinizde Ürün Bulunmamaktadır.</h6>
                    </div>
                </div>
            </div>
        
        `
        containerSepet.appendChild(contentRowBos)
    }
})

let sepetContent=document.querySelector(".sepet-content-urunler")
sepetContent.addEventListener("click",function(e){
    let localSepetUrun=JSON.parse(localStorage.getItem("product")) || []
    let localSepetAdet=JSON.parse(localStorage.getItem("productAdet")) || 0
    if(e.target.classList.contains("delete-link")){
        let contentRow=e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
        let urunAdi=contentRow.querySelector(".content-product-name").innerHTML
        let urunAdet=+contentRow.querySelector(".sepet-content-number").innerHTML
        let urunTotal=parseInt(contentRow.querySelector(".content-productFiyat").innerHTML)
        let araToplam=parseInt(document.querySelector(".sepet-araToplam-fiyat").innerHTML)
        let newAraToplam=araToplam-urunTotal
        araToplam.innerHTML=`${newAraToplam} TL`
        contentRow.remove()
        
        let newUrunAdet=localSepetAdet-urunAdet
        localStorage.setItem("productAdet",JSON.stringify(newUrunAdet))

        let newProduct=localSepetUrun.filter(item=>item.adi!==urunAdi)
        localStorage.setItem("product",JSON.stringify(newProduct))

        location.reload()
    }
    else if(e.target.classList.contains("sepet-urunArttir")){
        let urunAdi=e.target.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.children[0].children[0].innerHTML
        let urunAdet=e.target.parentElement.parentElement.previousElementSibling.children[0]
        let numberUrunAdet=Number(urunAdet.innerHTML)
        let urunFiyat=e.target.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[0]
        let numberUrunFiyat=parseInt(urunFiyat.innerHTML)
        let tekUrunFiyat=numberUrunFiyat/numberUrunAdet
        let araToplam=document.querySelector(".sepet-araToplam-fiyat")
        let deleteTotal=parseInt(araToplam.innerHTML)-numberUrunFiyat
        
        let newAdet=numberUrunAdet+1
        urunAdet.innerHTML=newAdet
        urunFiyat.innerHTML=`${newAdet*tekUrunFiyat}`
        let newUrunFiyat=parseInt(urunFiyat.innerHTML)
        araToplam.innerHTML=`${deleteTotal+newUrunFiyat} TL`

        let sayi=0
        let urunAdetToplam=document.querySelectorAll(".sepet-content-number")
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

        location.reload()
    }
    else if(e.target.classList.contains("sepet-urunAzalt")){
        let urunAdi=e.target.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.children[0].children[0].innerHTML
        let urunAdet=e.target.parentElement.parentElement.nextElementSibling.children[0]
        let numberUrunAdet=Number(urunAdet.innerHTML)
        console.log(numberUrunAdet)
        let urunFiyat=e.target.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[0]
        let numberUrunFiyat=parseInt(urunFiyat.innerHTML)
        let tekUrunFiyat=numberUrunFiyat/numberUrunAdet
        let araToplam=document.querySelector(".sepet-araToplam-fiyat")
        let deleteTotal=parseInt(araToplam.innerHTML)-numberUrunFiyat

        if(numberUrunAdet>1){
            let newAdet=numberUrunAdet-1
            urunAdet.innerHTML=newAdet
            urunFiyat.innerHTML=`${tekUrunFiyat*newAdet} TL`
            let newUrunFiyat=parseInt(urunFiyat.innerHTML)
            araToplam.innerHTML=`${deleteTotal+newUrunFiyat} TL`
            let sayi=0
            let urunAdetToplam=document.querySelectorAll(".sepet-content-number")
            urunAdetToplam.forEach(function(element){
                number=Number(element.innerHTML)
                sayi+=number
            })
            localStorage.setItem("productAdet",JSON.stringify(sayi))
    
            let localVarUrun=JSON.parse(localStorage.getItem("product")) || []
            let varProduct=localVarUrun.find(item=>item.adi==urunAdi)
            if(varProduct){
                varProduct.adet--
            }
            localStorage.setItem("product",JSON.stringify(localVarUrun))
    
            location.reload()
        }
    }
})

let checkBox=document.querySelector(".form-check-input")
let noneContent=document.querySelector(".sepet-altContent-entry")
checkBox.addEventListener("change",function(){
    if(checkBox.checked){
        noneContent.classList.add("show")
    }
    else{
        noneContent.classList.remove("show")
    }
})