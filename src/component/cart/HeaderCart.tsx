import Checkbox from "@mui/material/Checkbox";

interface HeaderCartProps {
    listCart: any[];
    setListCart: (list: any[]) => void;
    isSelectAll: boolean;
    setIsSelectAll: (value: boolean) => void;
    setActiveButton: (value: boolean) => void;
}
const HeaderCart = (props: HeaderCartProps) => {
    const { listCart, setListCart, isSelectAll, setIsSelectAll, setActiveButton } = props;

    const handleSelectAll = () => {
        const updatedList = listCart.map(item => ({
            ...item,
            isBuy: !isSelectAll
        }));
        setIsSelectAll(!isSelectAll);
        setListCart(updatedList);
        localStorage.setItem('list_cart', JSON.stringify(updatedList));
        setActiveButton(!isSelectAll)
    }
    return (
        <div className="flex flex-row h-10 items-center justify-between gap-50 border-y-1 border-gray-500 my-5 bg-white dark:bg-gray-600">
            <div className="flex items-center justify-start ">
                <Checkbox
                    checked={isSelectAll}
                    onChange={handleSelectAll}
                />
                <span className="mx-5">Select all</span>
            </div>
            <div className="flex items-center justify-around gap-10">
                <span className="mx-5">Quantity</span>
                <span >Total amount</span>
                <span>Delete</span>
            </div>
        </div>
    )
}

export default HeaderCart;