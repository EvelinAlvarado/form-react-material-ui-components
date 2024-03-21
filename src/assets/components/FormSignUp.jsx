import {
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";

function FormSignUp() {
  return (
    <form>
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        fullWidth={true}
        margin="normal"
      />
      <TextField
        id="lastName"
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        id="email"
        label="E-mail"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <FormGroup>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="I want to receive personalized commercial communications by email."
          labelPlacement="end"
        />
        <FormControlLabel
          control={<Switch />}
          label="I have read and understand the Privacy and Cookies Policy."
          labelPlacement="end"
        />
      </FormGroup>

      <Button variant="contained" color="success">
        Create Account
      </Button>
    </form>
  );
}

export default FormSignUp;
