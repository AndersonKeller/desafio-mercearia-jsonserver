const array = ["Cosméticos", "Remédios", "Cosmeticos", "Sapato"];
function filterArray(){
    const res = array.filter((element)=>{
        return element !== "Cosmeticos"
    })
    return res
}

console.log(filterArray())

function filterArray2(){
    const res = array.findIndex((element)=>{
        return element=="Cosmeticos"
    })
    array.splice(res,1)
    return array
}
console.log(filterArray2())
