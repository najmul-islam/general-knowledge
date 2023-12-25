import { useSearchParams } from "react-router-dom";
import { useSearchGkQuery } from "../../../redux/features/gk/gkApi";
import { Box, Pagination, Skeleton, Stack, Typography } from "@mui/material";
import { useState } from "react";

const Search = () => {
  const [page, setPage] = useState(1);
  const [searchParams, serSearchParams] = useSearchParams();

  const { data, isLoading, isError, error } = useSearchGkQuery({
    page,
    searchQuery: searchParams.get("search").split("-").join(" "),
  });

  let content;

  if (isLoading)
    content = [...Array(13)].map((book, i) => (
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
    ));

  if (!isLoading && isError)
    content = (
      <Box>
        <Typography>{error}</Typography>
      </Box>
    );

  if (!isLoading && !isError && data?.gks.length === 0)
    content = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" textAlign="center">
          No Gk Found
        </Typography>
      </Box>
    );

  if (!isLoading && !isError && data?.gks.length > 0)
    content = (
      <Stack spacing={2}>
        <Box>
          {data?.gks.map((gk) => (
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
    );

  return <>{content}</>;
};
export default Search;
