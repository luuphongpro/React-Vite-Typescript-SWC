
import axiosInstance from '../config/axiosInstance';
export const fetchAddCart=async(id:number,products:any) =>{
    const data=await axiosInstance.post('carts/add',{
        userId: id,
        products
    })
    return data.data;
}

