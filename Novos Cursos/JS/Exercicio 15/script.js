function verificar() {
   var data= new Date()
   var ano= data.getFullYear()
   var fano = document.getElementById('txtano')
   var res = document.querySelector('div#res')
    if (fano.value.length == 0 || Number(fano.value) > ano){
        window.alert('Erro - Verifique os dados e tente novamente')
    } else {
        var fsex = document.getElementsByName('radsex')
        var idade = ano - Number(fano.value)
        var genero = ''
        var img = document.createElement('img')
        img.setAttribute('id', 'foto') 
    
    if(fsex[0].checked){
            genero = "Homem"
           if(idade >=0 && idade <10){
           img.setAttribute('src','bebemenino.jpg')
           } else if(idade <21){
           //jovem
           img.setAttribute('src','jovemhomem.jpg')
          } else if(idade <50){
           //Adulto
           img.setAttribute('src','homemadulto.jpg')
          } else {
           //idoso
           img.setAttribute('src','velho.jpg')
          }
}  
else if (fsex[1].checked){
    genero = 'Mulher'
    document.body.style.background = 'pink'
    if(idade >=0 && idade <10){
        //criança
        img.setAttribute('src','bebemenina.jpg')
    } else if(idade <21){
        //jovem
        img.setAttribute('src','jovemmulher.jpg')
    } else if(idade <50){
        //Adulto
        img.setAttribute('src','mulheradulta.jpg')
    } else {
        //idoso
        img.setAttribute('src','velha.jpg')
    }
    }

    res.style.textAlign = 'center'
    res.innerHTML = `Detectamos ${genero} com ${idade} anos`
    res.appendChild(img)


    }
}


