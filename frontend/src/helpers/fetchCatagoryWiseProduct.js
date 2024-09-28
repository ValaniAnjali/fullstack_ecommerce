const { default: SummartApi } = require("../common")

const fetchCatagoryWiseProduct =async(catagory)=>{
    const response = await fetch(SummartApi.catagoryWiseProduct.url,{
        method:SummartApi.catagoryWiseProduct.method,
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify({
            catagory:catagory
        })
    })

    const dataResponse = await response.json()
    return dataResponse
}

export default fetchCatagoryWiseProduct