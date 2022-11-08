class Contenedor {
  constructor(Schema) {
    this.Schema = Schema
  }

  async save(object){
    try {
      let obj = await new this.Schema(object).save()
      return obj.id;
    } catch (err) {
      console.log(err)
    }
  }

  async getAll(){ 
    try {
      return await this.Schema.find();      
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = Contenedor;