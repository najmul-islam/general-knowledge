import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Container,
  Autocomplete,
  Checkbox,
  TextField,
  Skeleton,
} from "@mui/material";
import { usePostGkMutation } from "../../redux/features/gk/gkApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useGetAllSubjectQuery } from "../../redux/features/subject/subjectApi";
// import SelectSubject from "./SelectSubject";
// import SelectSubject2 from "./SelectSubject2";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

const CreateGk = () => {
  const navigate = useNavigate();

  // rtk
  const [postGk, { isError, isSuccess, error }] = usePostGkMutation();
  const { data, isLoading } = useGetAllSubjectQuery();

  console.log("allSubject", data);
  // form value
  const initialValues = {
    question: "",
    answer: "",
    subjects: [],
  };

  // validate shema
  const validationSchema = Yup.object().shape({
    question: Yup.string().max(255).required("question is required"),
    answer: Yup.string().max(255).required("answer is required"),
    subjects: Yup.array()
      .of(Yup.string())
      .min(1, "Select at least one subject")
      .max(3, "Select at most three subjects"),
  });

  // handle submit
  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      setStatus({ success: false });
      setSubmitting(false);
      console.log("values", values);
      postGk(values);
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
      toast.error(error.error);
    }
    if (isSuccess) {
      toast.success("GK create successfully");
      formik.setFieldValue("question", "");
      formik.setFieldValue("answer", "");
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
    setFieldValue,
  } = formik;

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 6 }}>
      {isLoading ? (
        <Box
          sx={{
            borderRadius: "10px",
            paddingY: "20px",
            paddingX: "30px",
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Stack marginBottom={3}>
            <Skeleton
              variant="text"
              sx={{ width: "100px", fontSize: "25px" }}
            />
          </Stack>
          <Stack marginBottom={3}>
            <Skeleton variant="rounded" height={40} />
          </Stack>
          <Stack marginBottom={3}>
            <Skeleton variant="rounded" height={40} />
          </Stack>
          <Stack marginBottom={3}>
            <Skeleton variant="rounded" height={40} />
          </Stack>

          <Stack marginBottom={3}>
            <Skeleton variant="rounded" height={30} />
          </Stack>
        </Box>
      ) : (
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
              Create GK
            </Typography>
          </Stack>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Stack spacing={1} marginBottom={3}>
              <InputLabel htmlFor="question">Question*</InputLabel>
              <OutlinedInput
                id="question"
                type="question"
                value={values.question}
                name="question"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Write gk question"
                fullWidth
                error={Boolean(touched.question && errors.question)}
                sx={{ height: "45px" }}
              />
              {touched.question && errors.question && (
                <FormHelperText error id="question">
                  {errors.question}
                </FormHelperText>
              )}
            </Stack>
            <Stack spacing={1} marginBottom={3}>
              <InputLabel htmlFor="answer">Answer*</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(touched.answer && errors.answer)}
                id="answer"
                type="answer"
                value={values.answer}
                name="answer"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Write gk answer"
                sx={{ height: "45px" }}
              />
              {touched.answer && errors.answer && (
                <FormHelperText error id="answer">
                  {errors.answer}
                </FormHelperText>
              )}
            </Stack>

            <Stack spacing={1} marginBottom={3}>
              <InputLabel htmlFor="subjects">Select Subjects*</InputLabel>
              <Autocomplete
                multiple
                freeSolo
                id="checkboxes-tags-demo"
                loading={isLoading}
                options={data?.subjects || []}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.title
                }
                filterSelectedOptions
                value={(data?.subjects || [])
                  .filter((subject) => values.subjects.includes(subject._id))
                  .concat(
                    // Add any custom strings (new subjects) that are not in the list
                    values.subjects.filter(
                      (idOrTitle) =>
                        typeof idOrTitle === "string" &&
                        !(data?.subjects || []).some(
                          (subject) => subject._id === idOrTitle
                        )
                    )
                  )}
                onChange={(event, newValues) => {
                  // Map to IDs for existing, or keep string for new
                  const selectedIds = newValues.map(
                    (item) =>
                      typeof item === "string"
                        ? item // new subject as string
                        : item._id // existing subject
                  );
                  setFieldValue("subjects", selectedIds);
                }}
                disableCloseOnSelect
                isOptionEqualToValue={(option, value) =>
                  (typeof option === "string" ? option : option._id) ===
                  (typeof value === "string" ? value : value._id)
                }
                noOptionsText={"No available subjects"}
                renderOption={(props, option, { selected }) => (
                  <Box
                    component="li"
                    {...props}
                    key={typeof option === "string" ? option : option._id}
                  >
                    <Checkbox
                      icon={<CheckBoxOutlineBlank fontSize="small" />}
                      checkedIcon={<CheckBox fontSize="small" />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      name="subjects"
                    />
                    {typeof option === "string" ? option : option.title}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="All subject" />
                )}
              />
              {touched.subjects && errors.subjects && (
                <FormHelperText error id="subjects">
                  {errors.subjects}
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
              Create GK
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};
export default CreateGk;
