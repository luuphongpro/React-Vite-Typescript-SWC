import { useEffect, useState } from 'react';
import successImage from '../../assets/success.png';
interface Notity {
    show: boolean;
    type: 'success' | 'error';
    message: string;
}   
const Success = (props:Notity) => {
    const {show, type, message} = props
    const [showModal, setShowModal] =useState(show)
    useEffect(() => {
        if (show) {
            setShowModal(true);
            const timeout = setTimeout(() => {
                setShowModal(false);
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [show]);
    return (
        <>
            <div className={"bg-gray-400 fixed top-0 right-0 bottom-0 left-0 opacity-50" + (showModal ? "  " : " hidden ")}></div>
            <div className={'w-full h-full flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 z-50 ' + (showModal ? "  " : " hidden ")}>
                <div className='p-5 flex flex-col items-center mx-auto bg-white rounded-md gap-2'>
                    <img src={successImage} className="w-1/2 mx-auto my-3" />
                    <div>{type=='success' ? 'Success': 'Error'}</div>
                    <div>{message}</div>
                </div>
            </div>
        </>
    )
}
export default Success;