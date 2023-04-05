import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import TabNavigation from '../../components/TabNavigation/TabNavigation';
import Header from '../../components/Header/Header';

import './ContentPage.css';

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
      <TabNavigation user={{ ...currentUser, is_authorized: isAuthorized }} />
    </Container>
  );
}

export default ContentPage;
