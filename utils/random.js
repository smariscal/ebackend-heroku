function generateRandom(n){
  const AuxrandomNumbers = [];
  for (let i=0; i<n; i++) {    
    newNumber = Math.floor(Math.random()*1000)
    let foundIndex = AuxrandomNumbers.findIndex(el => el.numero == newNumber);
    if (foundIndex !== -1) {
      let newcant = AuxrandomNumbers[foundIndex].cant + 1
      AuxrandomNumbers[foundIndex] = { numero : newNumber, cant:newcant}
    }
    else {
      AuxrandomNumbers.push({ numero: newNumber, cant: 1});
    }
  }

  AuxrandomNumbers.sort(compareNumbers)
  return AuxrandomNumbers;
}

function compareNumbers(a, b) {
  return a.numero - b.numero;
}

process.on('message',(num)=>{
  const numbers=generateRandom(num)
  process.send(numbers)
})
