import styled from "styled-components";

const StyledButton = styled.button`
  width: auto;
  padding: 0.3rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s ease;

  background-color: ${({ variant, disabled }) => {
    if (disabled) return "#dadada";

    switch (variant) {
      case "primary":
        return "#0A6085";
      case "danger":
        return "#dc2626";
      case "success":
        return "#16a34a";
      default:
        return "#0A6085";
    }
  }};

  color: ${({ disabled }) => (disabled ? "#888" : "white")};

  &:hover {
    background-color: ${({ variant, disabled }) => {
      if (disabled) return "#dadada";

      switch (variant) {
        case "primary":
          return "#084d6b";
        case "danger":
          return "#b91c1c";
        case "success":
          return "#15803d";
        default:
          return "#084d6b";
      }
    }};
  }
`;

const Button = ({ children, otherClasses = '', variant = "primary", disabled = false, ...props }) => {
  return (
    <StyledButton className={otherClasses} variant={variant} disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;