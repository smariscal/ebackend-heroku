const parseArgs=require('minimist')
const port={
  alias:{
    p:'puerto'
  },
  default:{
    puerto:8080
  }
}

const portDefault=parseArgs(process.argv.slice(2),port)
portDefault.otros=portDefault._
delete portDefault._
delete portDefault.otros
module.exports=portDefault