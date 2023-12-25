import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { useGetUserGkQuery } from "../../redux/features/user/userApi";

const UserAllGk = () => {
  const { data: allGk, isLoading, isError, error } = useGetUserGkQuery();

  return (
    <Box>
      <Typography textAlign="center" variant="h6">
        My Gk
      </Typography>
      {isLoading ? (
        [...Array(13)].map((book, i) => (
          <Stack
            key={i}
            spacing={1}
            boxShadow={1}
            marginY={2}
            padding={1}
            borderRadius={1}
          >
            <Skeleton
              variant="rounded"
              sx={{
                width: `${Math.floor(Math.random() * (400 - 200 + 1)) + 200}px`,
              }}
            />
            <Skeleton
              variant="rounded"
              sx={{
                width: `${Math.floor(Math.random() * (300 - 150 + 1)) + 150}px`,
              }}
            />
          </Stack>
        ))
      ) : (
        <Box>
          {allGk.map((gk) => (
            <Box
              key={gk._id}
              boxShadow={1}
              marginY={2}
              padding={1}
              borderRadius={1}
            >
              <Typography variant="subtitle1">প্রঃ {gk?.question}</Typography>
              <Typography variant="subtitle1">উঃ {gk?.answer}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
export default UserAllGk;
