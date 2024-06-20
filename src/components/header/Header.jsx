import Button from "../button/Button";
import Container from "../container/Container";
import Logo from "../logo/Logo";
import "./headerStyles.scss";
function Header() {
  return (
    <div className="header">
      <Container>
        <div className="header-container">
          <Logo />
          <div className="buttons">
            <Button>Users</Button>
            <Button>Login</Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
