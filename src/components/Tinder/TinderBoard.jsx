/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation } from 'swiper';

import { CircularProgress, Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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
  const filteredUsers = useMemo(
    () => tinderUsers.filter(({ userId }) => userId !== currentUser?.user_id),
    [currentUser?.user_id, tinderUsers]
  );

  const preventPropagation = useCallback((event) => {
    event.stopPropagation();
  }, []);

  const renderCards = useMemo(
    () =>
      filteredUsers.map((user) => (
        <SwiperSlide key={user.userId}>
          <TinderCard {...user} />
        </SwiperSlide>
      )),
    [filteredUsers]
  );

  const handleBeforeInit = useCallback((swiper) => {
    swiper.params.touchStartPreventDefault = false;
    swiper.params.loop = true;
    swiper.params.navigation = {
      ...swiper.params.navigation,
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next'
    };
  }, []);

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
        <Box
          sx={{
            height: '100%',
            width: '100%',
            position: 'relative',
            padding: '0 2px'
          }}
        >
          <Swiper
            effect="cards"
            longSwipes={false}
            cardsEffect={{
              perSlideOffset: 50,
              perSlideRotate: 10,
              rotate: false,
              slideShadows: false
            }}
            onBeforeInit={handleBeforeInit}
            modules={[EffectCards, Navigation]}
            onTouchStart={(swiper, event) => preventPropagation(event)}
            onTouchMove={(swiper, event) => preventPropagation(event)}
            onTouchEnd={(swiper, event) => preventPropagation(event)}
            onTouchCancel={(swiper, event) => preventPropagation(event)}
          >
            {renderCards}
          </Swiper>
          <Box
            sx={{
              cursor: 'pointer',
              width: '35px',
              height: '100px',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              position: 'absolute',
              bottom: '100px',
              left: '-16px',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)',
              justifyContent: 'flex-end',
              borderRadius: '0 50% 50% 0',
              zIndex: 2
            }}
            className="swiper-button-prev"
          >
            <ArrowBackIosNewIcon color="info" fontSize="large" />
          </Box>
          <Box
            sx={{
              cursor: 'pointer',
              width: '35px',
              height: '100px',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              position: 'absolute',
              bottom: '100px',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)',
              right: '-16px',
              justifyContent: 'flex-start',
              borderRadius: '50% 0 0  50%',
              zIndex: 2
            }}
            className="swiper-button-next"
          >
            <ArrowForwardIosIcon color="info" fontSize="large" />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default TinderBoard;
