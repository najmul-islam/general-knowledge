import { Box, Skeleton, Typography } from "@mui/material";
import { useGetUserSubjectQuery } from "../../redux/features/user/userApi";
import { Link } from "react-router-dom";

const UserAllSubject = () => {
  const {
    data: allSubject,
    isLoading,
    isError,
    error,
  } = useGetUserSubjectQuery();

  return (
    <Box>
      <Typography textAlign="center" variant="h6">
        My Subjects
      </Typography>
      {isLoading ? (
        [...Array(13)].map((subject, i) => (
          <Box key={i} marginY={2} boxShadow={1} padding={2} borderRadius={1}>
            <Skeleton
              sx={{
                width: `${Math.floor(Math.random() * (400 - 200 + 1)) + 200}px`,
              }}
            />
          </Box>
        ))
      ) : (
        <Box>
          {allSubject.map((subject) => (
            <Box
              key={subject._id}
              marginY={2}
              boxShadow={1}
              padding={2}
              borderRadius={1}
            >
              <Typography
                component={Link}
                to={`/all-subject/${subject._id}`}
                sx={{ textDecoration: "none" }}
              >
                {subject.title}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
export default UserAllSubject;
