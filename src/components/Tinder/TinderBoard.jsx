/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Slider from 'react-slick';
import { CircularProgress, Box, Typography } from '@mui/material';

import TinderCard from './elements/TinderCard';
import sortTinderUsers from './helpers/sortTinderUsers';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './TinderBoard.css';

const settings = {
  className: 'slider',
  centerMode: true,
  infinite: true,
  centerPadding: '20px',
  lazyLoad: true,
  speed: 500,
  cssEase: 'ease-out',
  slidesToShow: 1,
  touchThreshold: 20
};

function TinderBoard() {
  const { currentSpace, isSpaceLoading } = useSelector(({ spaces }) => spaces);
  const { currentUser, isUserDataLoading } = useSelector(({ user }) => user);

  const isLoading = useMemo(
    () => isSpaceLoading || isUserDataLoading,
    [isSpaceLoading, isUserDataLoading]
  );

  const tinderUsers = currentSpace?.spaceUsers;

  const filteredUsers = useMemo(() => {
    const filtered =
      tinderUsers &&
      tinderUsers.filter(
        ({ userId, userHiddenSpaces, isVisible }) =>
          userId !== currentUser?.user_id &&
          !userHiddenSpaces.includes(currentSpace.spaceId) &&
          isVisible
      );

    return sortTinderUsers(filtered);
  }, [currentSpace.spaceId, currentUser?.user_id, tinderUsers]);

  const renderCards = useMemo(
    () =>
      filteredUsers.map((user) => <TinderCard key={user.userId} {...user} />),
    [filteredUsers]
  );

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {isLoading && !currentSpace ? (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: 'calc(50% - 20px)',
            left: 'calc(50% - 20px)'
          }}
        />
      ) : (
        <Box
          sx={{
            height: '100%',
            width: '100%',
            padding: '0 2px'
          }}
        >
          {tinderUsers && tinderUsers.length ? (
            <Slider {...settings}>{renderCards}</Slider>
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Typography>No users for networking</Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default TinderBoard;
