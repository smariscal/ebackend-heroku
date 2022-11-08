const {faker}= require('@faker-js/faker');

const generateProducts = async(req, res) =>{
  try{
    let prods=[];
    for (let i=0; i<5;i++){
      let producto={
          id:i+1,
          productname:faker.commerce.productName(),
          productprice:faker.commerce.price(150,2000,0,'$'),
          productthumbnail:faker.image.business(150, 150, true)
      }
      prods.push(producto);
    }
    res.json(prods);
  } 
  catch(err){
    console.log("error", err);
  }
}

module.exports = {generateProducts};