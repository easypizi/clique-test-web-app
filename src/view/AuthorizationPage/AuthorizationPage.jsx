/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Typography, Button, CircularProgress } from '@mui/material';

import './AuthorizationPage.css';

function AuthorizationPage({ onLogin }) {
  // const { loading, data } = useSelector((state) => state.auth);

  const mock = {
    isLoading: false,
    data: [{ community_name: 'Clique', community_description: 'Cool guys with big guns' }]
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('user_id');
  const privateId = queryParams.get('private_id');

  useEffect(() => {
    // TODO: делавем запрос на сервер и ещем, есть ли спейсы которые можно отрендерить.
    // Если есть - выводим приветственный заголово и кнопки для перехода в спейс.
    // Если нет, то показываем текст с тем, что надо сделать. И какие варианты сщуествуют
    // Варианты - для отсутствующих спейсов: создать своё или добавиться в существующее.
  }, [privateId, userId]);

  return (
    <div className="container">
      {mock.isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h4">Добро пожаловать</Typography>
          <Typography variant="subtitle1">Выберите сообщество в которое хотите зайти</Typography>
          {mock.data &&
            mock.data.map((item, index) => (
              <Button
                key={`${item.community_name}`}
                variant="contained"
                color="primary"
                href="/space"
              >
                {item.community_name}
              </Button>
            ))}
        </>
      )}
    </div>
  );
}

AuthorizationPage.propTypes = {
  onLogin: PropTypes.func
};

export default AuthorizationPage;
