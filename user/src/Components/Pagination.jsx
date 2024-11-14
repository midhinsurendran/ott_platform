import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function CustomIcons({count,page,onChange}) {
  return (
    
    <Stack spacing={2}>
      <Pagination
        count={count} size='large'
        page={page}
        onChange={onChange}
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            sx={{
              color: 'brown',               
              '&.Mui-selected': {
                backgroundColor: 'rgba(182, 187, 197, 0.3)',    
                color: 'blue',           
              },
              '& .MuiPaginationItem-icon': {
                color: 'darkblue',            
              },
            }}
            {...item}
          />
        )}
      />
    </Stack>
   
  );
}
