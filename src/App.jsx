import { Container, Typography } from "@mui/material";
import FormSignUp from "./assets/components/FormSignUp";
import "./App.css";

function App() {
  return (
    /* component="elementType" -> The component used for the root node. Either a string to use a HTML element or a component. */
    <Container component="section" maxWidth="sm">
      <Typography variant="h3" align="center" component="h1">
        Personal Details
      </Typography>
      <FormSignUp />
    </Container>
  );
}

export default App;
