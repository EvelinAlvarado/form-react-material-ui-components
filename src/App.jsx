import { Container, Typography, styled } from "@mui/material";
import FormSignUp from "./assets/components/FormSignUp";
import "./App.css";

function App() {
  // Using styled from Material-UI to customize Container component
  const CustomizedContainer = styled(Container)`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;

  return (
    /* 
      Using Container component as the root node with customized styles
      maxWidth="sm" restricts the width to a standard size
    */
    <CustomizedContainer component="section" maxWidth="sm">
      <Typography
        variant="h3"
        align="center"
        component="h1"
        style={{
          color: "#f8b656",
          marginBottom: "15px",
          fontWeight: "bold",
        }}
      >
        Sign up
      </Typography>
      <FormSignUp />
    </CustomizedContainer>
  );
}

export default App;
