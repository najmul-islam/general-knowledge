import { Box, Skeleton, Stack } from "@mui/material";

const ProfileSkeleton = () => {
  return (
    <Stack
      spacing={2}
      sx={{
        borderRadius: "10px",
        paddingY: "20px",
        paddingX: "30px",
      }}
    >
      <Skeleton variant="text" sx={{ fontSize: "20px", width: "150px" }} />
      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: "16px", width: "100px" }} />
        <Skeleton variant="rounded" sx={{ height: "45px" }} />
      </Stack>
      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: "16px", width: "120px" }} />
        <Skeleton variant="rounded" sx={{ height: "45px" }} />
      </Stack>
      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: "16px", width: "300px" }} />
        <Skeleton variant="rounded" sx={{ height: "45px" }} />
      </Stack>
      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: "16px", width: "250px" }} />
        <Skeleton variant="rounded" sx={{ height: "45px" }} />
      </Stack>

      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: "16px", width: "150px" }} />
        <Skeleton variant="rounded" sx={{ height: "45px" }} />
      </Stack>

      <Skeleton variant="rounded" sx={{ height: "40px" }} />
    </Stack>
  );
};
export default ProfileSkeleton;
