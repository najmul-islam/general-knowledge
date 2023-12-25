import {
  useUpdateProfileMutation,
  userApi,
} from "../../redux/features/user/userApi";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";

// material-ui
import {
  Box,
  Button,
  FormHelperText,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Container,
} from "@mui/material";
import ProfileSkeleton from "./ProfileSkeleton";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFormChanged, setFormChanged] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // rtk
  const { user } = useSelector((state) => state.auth);
  const [updateProfile, { isError, isSuccess, error }] =
    useUpdateProfileMutation();

  // form value
  const initialValues = {
    name: "",
    email: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  // validate shema
  const validationSchema = Yup.object().shape({
    name: Yup.string().max(255),
    password: Yup.string().max(255),
    newPassword: Yup.string().max(255),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // handle submit
  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    console.log("values: ", values);
    try {
      setStatus({ success: false });
      setSubmitting(false);
      updateProfile(values);
    } catch (err) {
      console.log(err);
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowNewPassword = () => {
    setNewShowPassword(!showNewPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    dispatch(userApi.endpoints.profile.initiate())
      .unwrap()
      .then((data) => setProfile(data));
    setIsLoading(false);
  }, [dispatch]);

  // Update form values when profile changes
  useEffect(() => {
    formik.setValues({
      name: profile?.name || "",
      email: profile?.email || "",
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  }, [profile]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Account update successfully");
    }
  }, [isError, isSuccess, error]);

  // useEffect(() => {
  //   // Check for changes in form values
  //   const hasFormChanged =
  //     Object.keys(formik.values).some(
  //       (key) => formik.values[key] !== formik.initialValues[key]
  //     ) || formik.dirty;

  //   setFormChanged(hasFormChanged);
  // }, [formik.values, formik.initialValues, formik.dirty]);

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    isValid,
  } = formik;

  // if (isLoading) return <h6>Loading...</h6>;
  return (
    <Container maxWidth="sm" sx={{ paddingTop: 6 }}>
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <Box
          sx={{
            borderRadius: "10px",
            paddingY: "20px",
            paddingX: "30px",
          }}
        >
          <Stack direction="row" marginBottom={3} textAlign="center">
            <Typography variant="h6" fontWeight="800">
              Account details
            </Typography>
          </Stack>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Stack spacing={1} marginBottom={3}>
              <InputLabel htmlFor="name-signup">Name</InputLabel>
              <OutlinedInput
                id="name-login"
                type="name"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                fullWidth
                error={Boolean(touched.name && errors.name)}
                sx={{ height: "45px" }}
              />
              {touched.name && errors.name && (
                <FormHelperText error id="helper-text-name-signup">
                  {errors.name}
                </FormHelperText>
              )}
            </Stack>

            <Stack spacing={1} marginBottom={3}>
              <InputLabel htmlFor="email-signup">
                Email (email can&apos;t be change)
              </InputLabel>
              <OutlinedInput
                fullWidth
                disabled
                error={Boolean(touched.email && errors.email)}
                id="email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Email"
                sx={{ height: "45px" }}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="helper-text-email-signup">
                  {errors.email}
                </FormHelperText>
              )}
            </Stack>

            <Stack spacing={1} marginBottom={3}>
              <InputLabel htmlFor="password-signup">
                Current password (leave blank to unchanged)
              </InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(touched.password && errors.password)}
                id="password-signup"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
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
                sx={{ height: "45px" }}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="helper-text-password-signup">
                  {errors.password}
                </FormHelperText>
              )}
            </Stack>

            <Stack spacing={1} marginBottom={3}>
              <InputLabel htmlFor="newPassword-signup">
                New password (leave blank to unchanged)
              </InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(touched.newPassword && errors.newPassword)}
                id="newPassword-signup"
                type={showNewPassword ? "text" : "password"}
                value={values.newPassword}
                name="newPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowNewPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showNewPassword ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{ height: "45px" }}
              />
              {touched.newPassword && errors.newPassword && (
                <FormHelperText error id="helper-text-password-signup">
                  {errors.newPassword}
                </FormHelperText>
              )}
            </Stack>

            <Stack spacing={1} marginBottom={3}>
              <InputLabel htmlFor="confirmNewPassword-signup">
                Confirm new password
              </InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(
                  touched.confirmNewPassword && errors.confirmNewPassword
                )}
                id="confirmNewPassword-signup"
                type={showConfirmPassword ? "text" : "password"}
                value={values.confirmNewPassword}
                name="confirmNewPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{ height: "45px" }}
              />
              {touched.confirmNewPassword && errors.confirmNewPassword && (
                <FormHelperText error id="helper-text-password-signup">
                  {errors.confirmNewPassword}
                </FormHelperText>
              )}
            </Stack>
            {/* 
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            marginBottom={3}
          >
            <Typography variant="caption">
              By Signing up, you agree to our &nbsp;
              <Link
                variant="caption"
                fontWeight="bold"
                component={RouterLink}
                to="#"
              >
                Terms of Service
              </Link>
              &nbsp; and &nbsp;
              <Link
                variant="caption"
                fontWeight="bold"
                component={RouterLink}
                to="#"
              >
                Privacy Policy
              </Link>
            </Typography>
          </Stack> */}
            {errors.submit && (
              <FormHelperText error>{errors.submit}</FormHelperText>
            )}

            <Button
              disableElevation
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};
export default Profile;
