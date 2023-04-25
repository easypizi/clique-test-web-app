import React, { useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  Fade,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Divider,
  Chip
} from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import Person4Icon from '@mui/icons-material/Person4';

import {
  tinderMatchAction,
  updateSpaceUserAction
} from '../../../store/actions/userActions';

function TinderCard({
  userImage,
  userName,
  userDescription,
  userBadges,
  userLastName,
  userId,
  likes,
  bans,
  connected
}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);
  const { currentSpace } = useSelector(({ spaces }) => spaces);
  const currentUserId = currentUser?.user_id;
  const currentUserLikedBy = currentUser?.liked_by;
  const currentUserConnections = currentUser?.connected;

  const [imageUrl, setImageUrl] = useState(userImage);

  const [isLiked, setIsLiked] = useState(likes?.includes(currentUserId));
  const [isBanned, setIsBanned] = useState(bans?.includes(currentUserId));

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, [setImageLoaded]);

  const isConnected = useMemo(
    () => connected.includes(currentUser.user_id),
    [connected, currentUser.user_id]
  );

  const handleImageError = useCallback(() => {
    setImageUrl(null);
  }, []);

  const handleBanUser = useCallback(
    (event) => {
      event.stopPropagation();

      setIsLiked(false);
      setIsBanned(true);

      const updatedData = {
        user_id: userId,
        liked_by: likes?.filter((id) => id !== currentUserId),
        banned_by: [...new Set([...bans, currentUserId])]
      };

      dispatch(updateSpaceUserAction(updatedData, currentSpace?.spaceId));
    },
    [bans, currentSpace?.spaceId, currentUserId, dispatch, likes, userId]
  );

  const handleLikeUser = useCallback(
    (event) => {
      event.stopPropagation();

      setIsLiked(true);
      setIsBanned(false);

      const updatedData = {
        user_id: userId,
        liked_by: [...new Set([...likes, currentUserId])],
        banned_by: bans.filter((id) => id !== currentUserId)
      };

      if (
        currentUserLikedBy &&
        currentUserLikedBy.includes(userId) &&
        !connected.includes(currentUserId)
      ) {
        const updateForCurrentUser = {
          user_id: currentUserId,
          connected: [...new Set([...currentUserConnections, userId])]
        };
        dispatch(
          updateSpaceUserAction(updateForCurrentUser, currentSpace?.spaceId)
        );

        const tinderMatchData = {
          data: [userId, currentUserId]
        };

        dispatch(tinderMatchAction(tinderMatchData));
        updatedData.connected = [...new Set([...connected, currentUserId])];
      }

      dispatch(updateSpaceUserAction(updatedData, currentSpace?.spaceId));
    },
    [
      userId,
      likes,
      currentUserId,
      bans,
      dispatch,
      currentSpace?.spaceId,
      currentUserLikedBy,
      connected,
      currentUserConnections
    ]
  );

  const renderBadges = useCallback(
    () => (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexWrap: 'wrap',
          gap: '10px',
          flexShrink: 0
        }}
      >
        {userBadges &&
          userBadges.map((item) => (
            <Chip key={item} label={item} size="small" variant="outlined" />
          ))}
      </Box>
    ),
    [userBadges]
  );

  return (
    // TODO: probably we need much more detailed photo for tinder image
    <Card
      sx={{
        width: '100%',
        height: '100%',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {imageUrl ? (
        <Fade
          in={imageLoaded}
          style={{ transitionDelay: imageLoaded ? '300ms' : '0ms' }}
        >
          <CardMedia
            onLoad={handleImageLoad}
            sx={{ background: 'lightGrey' }}
            component="img"
            height="400px"
            image={imageUrl}
            onError={handleImageError}
          />
        </Fade>
      ) : (
        <Fade in style={{ transitionDelay: '300ms' }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              height: '60%',
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}
          >
            <Person4Icon
              sx={{ width: '100%', height: '100%', opacity: '0.5' }}
            />
          </Box>
        </Fade>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        <CardHeader
          sx={{ marginRight: 'auto' }}
          title={`${userName || 'Anonymous'} ${userLastName || ''}`}
        />
        {isConnected && (
          <Box sx={{ marginRight: '10px' }}>
            <ConnectWithoutContactIcon
              sx={{ width: 30, height: 30 }}
              color="warning"
              fontSize="40px"
            />
          </Box>
        )}
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
            flexShrink: 0,
            paddingRight: '30px'
          }}
        >
          <IconButton
            component="div"
            sx={{
              border: '2px solid #d32f2f',
              backgroundColor: isBanned
                ? '#d32f2f !important'
                : 'transparent !important'
            }}
            size="medium"
            color="error"
            onClick={handleBanUser}
          >
            <NotInterestedIcon className={isBanned ? 'filled' : ''} />
          </IconButton>
          <IconButton
            component="div"
            sx={{
              border: '2px solid #2e7d32',
              backgroundColor: isLiked
                ? '#2e7d32 !important'
                : 'transparent !important'
            }}
            size="medium"
            color="success"
            onClick={handleLikeUser}
          >
            <FavoriteBorderIcon className={isLiked ? 'filled' : ''} />
          </IconButton>
        </CardActions>
      </Box>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          height: '100%',
          maxHeight: '30%'
        }}
      >
        <Typography
          sx={{
            marginBottom: 'auto',
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 6,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.2em !important',
            maxHeight: 'calc(1.2em * 6)'
          }}
          variant="body2"
          color="text.secondary"
        >
          {userDescription}
        </Typography>
        {userBadges?.length > 0 && <Divider sx={{ margin: '10px 0' }} />}
        {userBadges?.length > 0 && renderBadges()}
      </CardContent>
    </Card>
  );
}

TinderCard.propTypes = {
  userImage: PropTypes.string,
  userName: PropTypes.string,
  userLastName: PropTypes.string,
  userDescription: PropTypes.string,
  userBadges: PropTypes.arrayOf(PropTypes.string),
  connected: PropTypes.arrayOf(PropTypes.string),
  bans: PropTypes.arrayOf(PropTypes.string),
  likes: PropTypes.arrayOf(PropTypes.string),
  userId: PropTypes.string
};

export default TinderCard;
