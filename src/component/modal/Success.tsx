import successImage from '../../assets/success.png';
const Success = (props) => {
    const { showSuccess, setShowSuccess } = props;
    if (showSuccess) {
        setTimeout(() => {
            setShowSuccess(false);
        }, 500);
    }
    return (
        <>
            <div className={"bg-gray-400 fixed top-0 right-0 bottom-0 left-0 opacity-50" + (showSuccess ? "  " : " hidden ")}></div>
            <div className={'w-full h-full flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 z-50 ' + (showSuccess ? "  " : " hidden ")}>
                <div className='w-50 h-50 flex flex-col items-center mx-auto bg-white rounded-md gap-2'>
                    <img src={successImage} className="w-1/2 mx-auto my-3" />
                    <div>Successful</div>
                    <div>Order added successfully</div>
                </div>
            </div>
        </>
    )
}
export default Success;