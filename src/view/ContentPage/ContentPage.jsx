import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Fade } from '@mui/material';
import TabNavigation from '../../components/TabNavigation/TabNavigation';
import Header from '../../components/Header/Header';

function ContentPage() {
  const { currentUser, isUserDataLoading, isAuthorized } = useSelector(
    (state) => state.currentUser
  );

  if (!currentUser && !isUserDataLoading) {
    document.location.href = '/';
  }

  return (
    <Container>
      <Header />
      <Fade
        in={!isUserDataLoading}
        style={{ transitionDelay: isUserDataLoading ? '0ms' : '300ms' }}
      >
        <div>
          <TabNavigation
            user={{ ...currentUser, is_authorized: isAuthorized }}
          />
        </div>
      </Fade>
    </Container>
  );
}

export default ContentPage;
