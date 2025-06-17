interface ChangeQuantityProps {
  quantity: number;
  onChange: (newQuantity: number) => void;
}

const ChangeQuantity = ({ quantity, onChange }: ChangeQuantityProps) => {
  const increaseQuantity = () => onChange(quantity + 1);
  
  const decreaseQuantity = () => {
    if (quantity > 1) onChange(quantity - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    if (value >= 0) {
      onChange(value);
    }
  };

  return (
    <div className="flex flex-row select-none">
      <input
        value={quantity}
        onChange={handleInputChange}
        className="px-4 border border-primary rounded-l-sm flex items-center w-15 text-center outline-none"
        min="0"
      />
      <div className="grid grid-rows-2 cursor-pointer">
        <div
          onClick={increaseQuantity}
          className="border border-l-0 border-b-0 border-primary size-5 flex items-center justify-center hover:bg-gray-100 rounded-tr-sm"
        >
          <span className="text-xs leading-none">+</span>
        </div>
        <div
          onClick={decreaseQuantity}
          className="border border-l-0 border-primary size-5 flex items-center justify-center hover:bg-gray-100 rounded-br-sm"
        >
          <span className="text-xs leading-none">−</span>
        </div>
      </div>
    </div>
  );
};

export default ChangeQuantity;