import { useFormik } from "formik";
import toast from "react-hot-toast";
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
  Select,
  MenuItem,
} from "@mui/material";
import { usePostGkMutation } from "../../redux/features/gk/gkApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { usePostSubjectMutation } from "../../redux/features/subject/subjectApi";
import { LockOutlined, Public } from "@mui/icons-material";
const CreateSubject = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // rtk
  const { user } = useSelector((state) => state.auth);
  const [postSubject, { isError, isSuccess, error }] = usePostSubjectMutation();

  // form value
  const initialValues = {
    title: "",
    privacy: "public",
  };

  // validate shema
  const validationSchema = Yup.object().shape({
    title: Yup.string().max(255).required("Title is required"),
    privacy: Yup.string().oneOf(["private", "public"], "Invalid privacy value"),
  });

  // handle submit
  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      setStatus({ success: false });
      setSubmitting(false);
      postSubject(values);
    } catch (err) {
      console.error(err);
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
      toast.error(error.data.message);
      console.log(error);
    }
    if (isSuccess) {
      navigate("/all-subject");
      toast.success("Subject created successfully");
    }
  }, [isError, isSuccess, navigate, error]);

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
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
            Create Subject
          </Typography>
        </Stack>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Stack spacing={1} marginBottom={3}>
            <InputLabel htmlFor="title">Title*</InputLabel>
            <OutlinedInput
              id="title"
              type="title"
              value={values.title}
              name="title"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Write a title"
              fullWidth
              error={Boolean(touched.title && errors.title)}
              sx={{ height: "45px" }}
            />
            {touched.title && errors.title && (
              <FormHelperText error id="question">
                {errors.title}
              </FormHelperText>
            )}
          </Stack>
          <Stack spacing={1} marginBottom={3}>
            <InputLabel htmlFor="privacy">Privacy</InputLabel>
            <Select
              id="privacy"
              name="privacy"
              value={values.privacy}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              error={Boolean(touched.privacy && errors.privacy)}
              sx={{ height: "45px" }}
            >
              <MenuItem
                value="public"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Public sx={{ fontSize: "16px", marginRight: "5px" }} />
                  Public
                </Typography>
              </MenuItem>
              <MenuItem value="private">
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LockOutlined sx={{ fontSize: "18px", marginRight: "5px" }} />
                  Private
                </Typography>
              </MenuItem>
            </Select>
            {touched.privacy && errors.privacy && (
              <FormHelperText error id="question">
                {errors.privacy}
              </FormHelperText>
            )}
          </Stack>

          <Button
            disableElevation
            disabled={isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
          >
            Create Subject
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default CreateSubject;
