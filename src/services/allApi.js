import commonApi from "./commonApi";
import serverUrl from "./serverUrl";


export const addNewJob = async (reqBody, reqHeader) => {
    return await commonApi("POST", `${serverUrl}/add-product`, reqBody, reqHeader)
}

export const getAllProducts = async () => {
    return await commonApi("GET", `${serverUrl}/get-all-product`,{})
}

export const deleteProduct = async (id) => {
    return await commonApi("DELETE", `${serverUrl}/delete-product/${id}`,{})
}

export const getSingleProduct = async (id) => {
    return await commonApi("GET", `${serverUrl}/products/${id}`,{})
}

export const updateSingleProduct = async (id,reqBody,reqHeader) => {
    return await commonApi("PUT", `${serverUrl}/update-product/${id}`,reqBody,reqHeader)
}
