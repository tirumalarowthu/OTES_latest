import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const ScrollToggle = () => {
  const [isNearTop, setIsNearTop] = useState(true);

  const toggleScroll = () => {
    if (isNearTop) {
      // Scroll to the bottom
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    } else {
      // Scroll to the top
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const nearTop = window.scrollY < window.innerHeight / 2;
      setIsNearTop(nearTop);
    };

    // Register the event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <IconButton
      onClick={toggleScroll}
      sx={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 1200, // Ensure it's above other elements
        backgroundColor: 'secondary.main',
        color: 'white',
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
      }}
    >
      {isNearTop ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>}
    </IconButton>
  );
};

export default ScrollToggle;