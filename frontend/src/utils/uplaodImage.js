import { API_PATH } from "./apiPath";
import axiosInstance from "./axiosInstance";

const uplaodImage = async (imageFile) => {
    const formData = new FormData()
    formData.append("image", imageFile)
    
    try {
        const response = await axiosInstance.post(API_PATH.IMAGE.UPLOAD_IMAGE, formData,{
            headers:{
                "Content-Type": "multipart/form-data", // header of file image
            }
        })
        return response.data // returning response
    } catch(error){
        console.error("error while uploading image", error)
        throw error  // error handling
    }
}

export default uplaodImage