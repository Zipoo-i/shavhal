interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: 'sm' | 'md';
}

// Shared − / count / + stepper used on the catalog card, the product sheet,
// and the cart list so the interaction feels identical everywhere.
export default function QuantityControl({
  quantity,
  onIncrement,
  onDecrement,
  size = 'md',
}: QuantityControlProps) {
  return (
    <div className={`qty qty--${size}`}>
      <button
        type="button"
        className="qty__btn"
        aria-label="Decrease quantity"
        onClick={(e) => {
          e.stopPropagation();
          onDecrement();
        }}
      >
        −
      </button>
      <span className="qty__value" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        className="qty__btn"
        aria-label="Increase quantity"
        onClick={(e) => {
          e.stopPropagation();
          onIncrement();
        }}
      >
        +
      </button>
    </div>
  );
}
