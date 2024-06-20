import Container from "./components/container/Container";
import FormSection from "./components/formSection/FormSection";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import UsersSection from "./components/usersSection/UsersSection";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Hero />
        <UsersSection />
        <FormSection />
      </Container>
    </>
  );
}

export default App;
