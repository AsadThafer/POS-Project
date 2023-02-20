import "./Button.css";
const Button = ({ design, type, children, onClick, style }) => (
  <button
    className={`button ${design}`}
    onClick={onClick}
    type={type}
    style={style}
  >
    {children}
  </button>
);

export default Button;
