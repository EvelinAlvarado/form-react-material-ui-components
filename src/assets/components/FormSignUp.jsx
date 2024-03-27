import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  Dialog,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

function FormSignUp() {
  // State variables to manage form interactions and submission
  const [showPassword, setShowPassword] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const {
    register, // Function to register inputs with React Hook Form, allowing validation and data retrieval
    handleSubmit, // Function to handle form submission, automatically triggers validation
    formState: { errors }, // Object containing form state, including validation errors
    control, // Object providing a way to control inputs registered with React Hook Form, useful for integrating with external components like MUI's Select
    watch, // Function to watch form values, useful for conditionally rendering components or performing actions based on form state
    reset, // Function to reset the form fields to their default values
  } = useForm();

  /* console.log(errors); */
  // Function to toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePrivacyChange = (event) => {
    /* console.log(event.target.checked); */
    setPrivacyChecked(event.target.checked);
  };

  // Function to handle form submission
  const handleSubmitForm = handleSubmit((data) => {
    console.log(data);

    setFormSubmitted(true);
    reset();
    setOpenDialog(true);
  });

  // Effect hook to control dialog visibility based on form submission
  useEffect(() => {
    if (formSubmitted) {
      setOpenDialog(true);
      const timerDialog = setTimeout(() => {
        setFormSubmitted(false);
        setOpenDialog(false);
      }, 5000);
      return () => clearTimeout(timerDialog);
    }
  }, [formSubmitted]);

  return (
    <form onSubmit={handleSubmitForm}>
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        fullWidth={true}
        margin="normal"
        {...register("name", { required: true, minLength: 2, maxLength: 20 })}
        error={Boolean(errors.name)}
        helperText={
          (errors.name &&
            errors.name.type === "required" &&
            "Name is required") ||
          (errors.name &&
            errors.name.type === "minLength" &&
            "Name must be between 2 and 20 characters") ||
          (errors.name &&
            errors.name.type === "maxLength" &&
            "Name must be between 2 and 20 characters")
        }
      />
      <TextField
        id="lastName"
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("lastName", {
          required: true,
          minLength: 2,
          maxLength: 30,
        })}
        error={Boolean(errors.lastName)}
        helperText={
          (errors.lastName &&
            errors.lastName.type === "required" &&
            "Last Name is required") ||
          (errors.lastName &&
            errors.lastName.type === "minLength" &&
            "Last Name must be between 2 and 30 characters") ||
          (errors.lastName &&
            errors.lastName.type === "maxLength" &&
            "Last Name must be between 2 and 30 characters")
        }
      />
      <TextField
        id="email"
        label="E-mail"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("email", {
          required: true,
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          },
        })}
        error={Boolean(errors.email)}
        helperText={
          (errors.email?.type === "required" && "E-mail is required") ||
          (errors.email?.type === "pattern" && "Email address must be valid.")
        }
      />
      <FormControl
        variant="outlined"
        fullWidth
        margin="normal"
        error={Boolean(errors.password)}
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="password"
          {...register("password", {
            required: true,
            pattern: {
              value:
                /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
            },
          })}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        {(errors.password?.type === "required" && (
          <FormHelperText>Password is required.</FormHelperText>
        )) ||
          (errors.password?.type === "pattern" && (
            <FormHelperText>
              The password must be 8-16 characters long with no spaces, include
              at least one uppercase letter, one lowercase letter, one number
              from 0 to 9, and one non-alphanumeric character.
            </FormHelperText>
          ))}
      </FormControl>
      <FormControl
        variant="outlined"
        fullWidth
        margin="normal"
        error={Boolean(errors.confirmPassword)}
      >
        <InputLabel htmlFor="outlined-adornment-password">
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="confirmPassword"
          {...register("confirmPassword", {
            required: true,
            validate: (value) =>
              value === watch("password") || "Passwords do not match.",
          })}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
        />
        {errors.confirmPassword?.type === "required" && (
          <FormHelperText>Confirm password is required.</FormHelperText>
        )}
        {errors.confirmPassword?.message && (
          <FormHelperText>{errors.confirmPassword.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth margin="normal" error={Boolean(errors.country)}>
        <InputLabel id="country">Country</InputLabel>
        <Controller
          name="country"
          control={control}
          rules={{ required: true }}
          defaultValue="" // Assign a default value
          render={({ field }) => (
            <Select {...field} labelId="country" label="Country">
              <MenuItem value="portugal">Portugal</MenuItem>
              <MenuItem value="spain">Spain</MenuItem>
              <MenuItem value="italy">Italy</MenuItem>
              <MenuItem value="norway">Norway</MenuItem>
              <MenuItem value="england">England</MenuItem>
              <MenuItem value="france">France</MenuItem>
            </Select>
          )}
        />
        {errors.country && (
          <FormHelperText>Must select a country</FormHelperText>
        )}
      </FormControl>
      <FormGroup style={{ margin: "15px 0" }}>
        <FormControlLabel
          control={<Switch color="warning" />}
          label="I want to receive personalized commercial communications by email."
          labelPlacement="end"
          {...register("personalizedEmails")}
        />
        <FormControlLabel
          control={
            <Switch
              checked={privacyChecked}
              onChange={handlePrivacyChange}
              color="warning"
            />
          }
          label="I agree to the Privacy Terms"
          labelPlacement="end"
          {...register("privacyPolicy", { required: true })}
        />
        {errors.privacyPolicy?.type === "required" && !privacyChecked && (
          <span className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root">
            Please accept the terms and conditions
          </span>
        )}
      </FormGroup>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        style={{
          marginBottom: "10px",
          background: "#f8b656",
          fontWeight: "bold",
        }}
      >
        Create Account
      </Button>
      <Dialog
        open={formSubmitted && openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <Alert
          variant="outlined"
          color="warning"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
            height: "40vh",
            width: "40vh",
            fontSize: "1.5rem",
          }}
          icon={<TaskAltIcon style={{ fontSize: "4rem" }} />}
        >
          Thanks for signing up.
        </Alert>
      </Dialog>
    </form>
  );
}

/* function FormSignUp({ handleSubmit }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [personalizedEmails, setPersonalizedEmails] = useState(true);
  const [privacyPolicy, setPrivacyPolicy] = useState(true);
  const [errors, setErrors] = useState({
    name: {
      error: false,
      helperText: "Please enter at least 3 characters.",
    },
    lastName: {
      error: false,
      helperText: "The last name is required.",
    },
    email: {
      error: false,
      helperText: "Please enter a valid email address",
    },
  });

  const handleNameState = (e) => {
    setName(e.target.value);
  };

  const nameValidation = (name) => {
    if (name.length >= 3) {
      return {
        ...errors,
        name: {
          error: false,
          helperText: "",
        },
      };
    } else {
      return {
        ...errors,
        name: {
          error: true,
          helperText: "Please enter at least 3 characters.",
        },
      };
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({
          name,
          lastName,
          email,
          personalizedEmails,
          privacyPolicy,
        });
      }}
    >
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        fullWidth={true}
        margin="normal"
        onChange={handleNameState}
        value={name}
        error={errors.name.error}
        helperText={errors.name.error && errors.name.helperText}
        onBlur={(e) => {
          setErrors(nameValidation(e.target.value));
        }}
      />
      <TextField
        id="lastName"
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        error={errors.lastName.error}
        helperText={errors.lastName.error && errors.lastName.helperText}
      />
      <TextField
        id="email"
        label="E-mail"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        error={errors.email.error}
        helperText={errors.email.error && errors.email.helperText}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={personalizedEmails}
              onChange={(e) => setPersonalizedEmails(e.target.checked)}
            />
          }
          label="I want to receive personalized commercial communications by email."
          labelPlacement="end"
        />
        <FormControlLabel
          control={
            <Switch
              checked={privacyPolicy}
              onChange={(e) => setPrivacyPolicy(e.target.checked)}
            />
          }
          label="I have read and understand the Privacy and Cookies Policy."
          labelPlacement="end"
        />
      </FormGroup>

      <Button type="submit" variant="contained" color="success">
        Create Account
      </Button>
    </form>
  );
} */

export default FormSignUp;
