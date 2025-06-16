interface ChangeQuantityProps {
  quantity: number;
  onChange: (newQuantity: number) => void;
}

const ChangeQuantity = ({ quantity, onChange }: ChangeQuantityProps) => {
  const increaseQuantity = () => onChange(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) onChange(quantity - 1);
  };

  return (
    <div className="flex flex-row select-none">
      <div className="px-4 border border-primary rounded-l-md flex items-center min-w-[40px] justify-center">
        {quantity}
      </div>
      <div className="grid grid-rows-2 cursor-pointer">
        <div
          onClick={increaseQuantity}
          className="border border-primary size-5 flex items-center justify-center hover:bg-gray-100"
        >
          +
        </div>
        <div
          onClick={decreaseQuantity}
          className="border border-primary size-5 flex items-center justify-center hover:bg-gray-100"
        >
          -
        </div>
      </div>
    </div>
  );
};

export default ChangeQuantity;
