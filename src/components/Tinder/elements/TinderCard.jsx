import React, { useCallback, useState } from 'react';
import { PropTypes } from 'prop-types';
import {
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

function TinderCard({
  userImage,
  userName,
  userDescription,
  //   userId,
  userBadges,
  userLastName
}) {
  const [imageUrl, setImageUrl] = useState(
    userImage ?? 'http://placekitten.com/g/500/500'
  );

  //   TODO: parse data from currentUser model

  const [isLiked, setIsLiked] = useState();
  const [isBanned, setIsBanned] = useState();

  const preventPropagation = useCallback((event) => {
    event.stopPropagation();
  }, []);

  const handleImageError = useCallback(() => {
    setImageUrl('http://placekitten.com/g/500/500');
  }, []);

  const handleBanUser = useCallback(() => {
    setIsLiked(false);
    setIsBanned(true);
  }, []);

  const handleLikeUser = useCallback(() => {
    setIsLiked(true);
    setIsBanned(false);
  }, []);

  const renderBadges = useCallback(
    () => (
      <>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          {userBadges.map((item) => (
            <Chip key={item} label={item} size="small" variant="outlined" />
          ))}
        </Box>
        <Divider sx={{ margin: '10px 0' }} />
      </>
    ),
    [userBadges]
  );

  return (
    // TODO: probably we need much more detailed photo for tinder image
    <Card
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'scroll',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)'
      }}
    >
      <CardMedia
        sx={{ background: 'lightGrey' }}
        component="img"
        height="50%"
        image={imageUrl}
        alt={userName}
        onError={handleImageError}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardHeader
          title={`${userName || 'Anonymous'} ${userLastName || ''}`}
        />
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
            color={isBanned ? 'default' : 'error'}
            onClick={handleBanUser}
          >
            <NotInterestedIcon />
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
            color={isLiked ? 'default' : 'success'}
            onClick={handleLikeUser}
          >
            <FavoriteBorderIcon />
          </IconButton>
        </CardActions>
      </Box>
      <CardContent
        onTouchStart={preventPropagation}
        onTouchMove={preventPropagation}
        onTouchEnd={preventPropagation}
        onTouchCancel={preventPropagation}
        onWheel={preventPropagation}
        sx={{
          overflow: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        {userBadges?.length > 0 && renderBadges()}
        <Typography
          sx={{ padding: '0 10px !important' }}
          variant="body2"
          color="text.secondary"
        >
          {userDescription}
        </Typography>
      </CardContent>
    </Card>
  );
}

TinderCard.propTypes = {
  userImage: PropTypes.string,
  userName: PropTypes.string,
  userLastName: PropTypes.string,
  userDescription: PropTypes.string,
  userBadges: PropTypes.arrayOf(PropTypes.string)
  //   userId: PropTypes.string
};

export default TinderCard;
