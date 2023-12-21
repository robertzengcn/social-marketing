type Iresponse ={
    status: boolean
    msg: string
    data?: any
}

export const windowInvoke=async(data)=>{
    console.log(data)
    const result =await window.api.invoke("campaign:list", JSON.stringify(data)); 
    if(!result){
        throw new Error("unknow error")
    }
    console.log(result)
    if(!result.status){
        throw new Error(result.msg)
    }
    return result.data; 
}