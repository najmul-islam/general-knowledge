import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import * as Yup from "yup";

// material-ui
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Link,
  Box,
  CircularProgress,
  Container,
} from "@mui/material";
import { useLoginMutation } from "../../redux/features/auth/authApi";
// assets

const Login = () => {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state and mutation
  const { user } = useSelector((state) => state.auth);
  const [login, { isLoading, isError, isSuccess, error }] = useLoginMutation();

  // show password
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // mouse dowon
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // init form state
  const initialValues = {
    email: "",
    password: "",
  };

  // valid schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // handle submit
  const onSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      setStatus({ success: false });
      setSubmitting(false);
      login(values);
    } catch (err) {
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess || user) {
      navigate("/");
      if (isSuccess && user) {
        toast.success("login successfully");
      }
    }
  }, [user, isError, isSuccess, navigate, dispatch, error]);

  // useEffect(() => {
  //   toast.success("Login Successfully");
  // }, [isSuccess]);
  // destructior formik value
  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    isValid,
  } = formik;

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 6 }}>
      <Box
        sx={{
          borderRadius: "10px",
          paddingY: "20px",
          paddingX: "30px",
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack
          direction="row"
          marginBottom={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight="800">
            Login
          </Typography>
          <Typography
            component={RouterLink}
            to="/register"
            variant="subtitle2"
            sx={{ textDecoration: "none" }}
            color="primary"
          >
            Don&apos;t have an account?
          </Typography>
        </Stack>
        <form noValidate onSubmit={handleSubmit}>
          <Stack spacing={1} marginBottom={3}>
            <InputLabel htmlFor="email-login">Email Address</InputLabel>
            <OutlinedInput
              id="email-login"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter email address"
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ height: "45px" }}
            />
            {touched.email && errors.email && (
              <FormHelperText
                error
                id="standard-weight-helper-text-email-login"
              >
                {errors.email}
              </FormHelperText>
            )}
          </Stack>

          <Stack spacing={1} marginBottom={3}>
            <InputLabel htmlFor="password-login">Password</InputLabel>
            <OutlinedInput
              fullWidth
              error={Boolean(touched.password && errors.password)}
              id="password-login"
              type={showPassword ? "text" : "password"}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Enter password"
              sx={{ height: "45px" }}
            />
            {touched.password && errors.password && (
              <FormHelperText
                error
                id="standard-weight-helper-text-password-login"
              >
                {errors.password}
              </FormHelperText>
            )}
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            marginBottom={3}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                  name="checked"
                  color="primary"
                  size="small"
                />
              }
              label={<Typography variant="body2">Keep me sign in</Typography>}
            />
            <Link
              variant="body2"
              component={RouterLink}
              to=""
              color="primary"
              sx={{ textDecoration: "none" }}
            >
              Forgot Password?
            </Link>
          </Stack>

          {errors.submit && (
            <FormHelperText error>{errors.submit}</FormHelperText>
          )}

          <Button
            disableElevation
            disabled={
              isLoading ||
              !isValid ||
              values.email === "" ||
              values.password === ""
            }
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
          >
            {isLoading ? <CircularProgress size={25} /> : " Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
