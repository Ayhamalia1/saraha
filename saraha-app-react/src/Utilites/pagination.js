import _, { startCase } from "lodash"

const pagination=(users,pageNumber,pageSize)=>{
   let startIndex=pageNumber*pageSize
  return _ (users).slice(startIndex).take(pageSize).value()

}
export default pagination