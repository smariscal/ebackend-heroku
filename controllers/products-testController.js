const generateProducts = async(req, res) =>{
  try{
    let prods=[];
    for (let i=0; i<5;i++){
      let producto={
          id:i+1,
          productname:i,
          productprice:i*100,
          productthumbnail:"https://picsum.photos/100"
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