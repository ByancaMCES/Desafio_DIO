var agora = new Date()
var hora = agora.getHours()

console.log(`Agora São exatamente ${hora} horas!`)

if(hora >=12){ 
       if(hora >=18){ console.log('Boa noite!')}
        else {console.log('Boa tarde!')}
} 

else if (hora >=5) console.log('Bom dia!')
else{console.log('Boa madrugada!')}

