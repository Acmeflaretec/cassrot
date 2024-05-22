import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ totalImages, imagesPerPage, paginate }) => {
  const pageCount = Math.ceil(totalImages / imagesPerPage);
  
  const handleChange = (event, value) => {
    paginate(value);
  };

  return (
    <MuiPagination
      count={pageCount}
      onChange={handleChange}
      sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
    />
  );
};

export default Pagination;
