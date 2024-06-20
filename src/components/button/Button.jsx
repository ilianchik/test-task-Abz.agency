import "./buttonStyles.scss";
function Button({ children, onClick, disabled, type }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="button"
    >
      {children}
    </button>
  );
}

export default Button;
