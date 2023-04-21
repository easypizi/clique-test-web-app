/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';

import { CircularProgress, Box } from '@mui/material';

import TinderCard from './elements/TinderCard';

import 'swiper/css';
import 'swiper/css/effect-cards';
import './TinderBoard.css';

function TinderBoard() {
  const { currentSpace, isSpaceLoading } = useSelector(({ spaces }) => spaces);
  const { currentUser, isUserDataLoading } = useSelector(({ user }) => user);

  const isLoading = useMemo(
    () => isSpaceLoading || isUserDataLoading,
    [isSpaceLoading, isUserDataLoading]
  );

  const tinderUsers = currentSpace?.spaceUsers;

  // const filteredUsers = useMemo(
  //   () => tinderUsers.filter(({ userId }) => userId !== currentUser?.user_id),
  //   [currentUser?.user_id, tinderUsers]
  // );

  const renderCards = useMemo(
    () =>
      tinderUsers.map((user) => (
        <SwiperSlide key={user.userId}>
          <TinderCard {...user} />
        </SwiperSlide>
      )),
    [tinderUsers]
  );

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {isLoading ? (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: 'calc(50% - 20px)',
            left: 'calc(50% - 20px)'
          }}
        />
      ) : (
        <Box sx={{ height: '100%', width: '100%' }}>
          <Swiper grabCursor effect="cards" modules={[EffectCards]}>
            {renderCards}
          </Swiper>
        </Box>
      )}
    </Box>
  );
}

export default TinderBoard;
