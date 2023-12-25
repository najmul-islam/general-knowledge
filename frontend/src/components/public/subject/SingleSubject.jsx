import { useParams } from "react-router-dom";
import { useGetSingleSubjectQuery } from "../../../redux/features/subject/subjectApi";
import { Box, Pagination, Skeleton, Stack, Typography } from "@mui/material";
import { useState } from "react";

const SingleSubject = () => {
  const [page, setPage] = useState(1);
  const { subjectId } = useParams();

  const { data, isLoading, isError, error } = useGetSingleSubjectQuery({
    subjectId,
    page,
  });

  console.log(data);
  return (
    <Box>
      <Stack marginBottom={2}>
        <Typography variant="h6" textAlign="center">
          {isLoading ? (
            <Skeleton
              variant="text"
              sx={{ fontSize: "30px", width: "300px", margin: "0 auto" }}
            />
          ) : (
            data?.subject?.title
          )}
        </Typography>
      </Stack>

      <Stack>
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
                  width: `${
                    Math.floor(Math.random() * (400 - 200 + 1)) + 200
                  }px`,
                }}
              />
              <Skeleton
                variant="rounded"
                sx={{
                  width: `${
                    Math.floor(Math.random() * (300 - 150 + 1)) + 150
                  }px`,
                }}
              />
            </Stack>
          ))
        ) : (
          <Stack>
            <Box>
              {data?.gks?.map((gk) => (
                <Box
                  key={gk._id}
                  boxShadow={1}
                  marginY={2}
                  padding={1}
                  borderRadius={1}
                >
                  <Typography variant="subtitle1">
                    প্রঃ {gk?.question}
                  </Typography>
                  <Typography variant="subtitle1">উঃ {gk?.answer}</Typography>
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
      </Stack>
    </Box>
  );
};
export default SingleSubject;
