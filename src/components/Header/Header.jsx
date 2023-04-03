import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import './Header.css';
import LinkButton from '../LinkButton/LinkButton';

function Header() {
  const { currentUser, isUserDataLoading } = useSelector(
    (state) => state.currentUser
  );

  const backToMainLink = useMemo(
    () =>
      currentUser
        ? `/?user_id=${currentUser.user_id}&private_id=${currentUser.user_bot_chat_id}`
        : '/',
    [currentUser]
  );

  return (
    <div>
      {!isUserDataLoading && (
        <div className=".header">
          <LinkButton to={backToMainLink}>Back</LinkButton>
        </div>
      )}
    </div>
  );
}

export default Header;
