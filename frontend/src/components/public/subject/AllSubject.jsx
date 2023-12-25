import { Box, Pagination, Skeleton, Stack, Typography } from "@mui/material";
import { useGetAllSubjectQuery } from "../../../redux/features/subject/subjectApi";
import { Link } from "react-router-dom";
import { useState } from "react";

const AllSubject = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useGetAllSubjectQuery(page);
  console.log(data);
  return (
    <>
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
        <Stack>
          <Box>
            {data.subjects.map((subject) => (
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

          {data.totalPage > 1 ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={data?.totalPage}
                onChange={(event, page) => setPage(page)}
                variant="outlined"
                shape="rounded"
              />
            </Box>
          ) : null}
        </Stack>
      )}
    </>
  );
};
export default AllSubject;
