import { Container } from "@mui/material";

const LoginPage = () => {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="center"
        paddingY={5}
        sx={{
          // width: isLgOrUp ? `calc(100% - ${drawerWidth}px)` : "100%",
          width: {
            lg: `calc(100% - ${drawerWidth}px)`,
            xs: "100%",
          },
        }}
      >
        <Box
          sx={{
            borderRadius: "10px",
            paddingY: "20px",
            paddingX: "30px",
            // maxWidth: "500px",
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
              Don't have an account?
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
              disabled={isLoading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              {isLoading ? <CircularProgress size={25} /> : " Login"}
            </Button>

            <Stack marginY={3}>
              <Divider>
                <Typography variant="caption"> Login with</Typography>
              </Divider>
            </Stack>

            <SocialLogin />
          </form>
        </Box>
      </Box>
    </Container>
  );
};
export default LoginPage;