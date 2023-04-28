import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { useDispatch } from 'react-redux';
import { AddToCalendarButton } from 'add-to-calendar-button-react';

import { common } from '@mui/material/colors';
import {
  Avatar,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
  Link,
  Button
} from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DevicesIcon from '@mui/icons-material/Devices';
import CloseIcon from '@mui/icons-material/Close';
import { deleteEventAction } from '../../../store/actions/eventsActions';
import EventShareModal from './EventShareModal';

function EventCard({
  date,
  title,
  description,
  timestamp,
  eventId,
  isReal,
  link,
  location,
  organizerName,
  tags,
  isAdmin,
  spaceId
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const preparedTags = useMemo(() => {
    if (!tags || !tags.length) {
      return [];
    }

    return tags
      .replaceAll(' ', '')
      .split(',')
      .map((tag) => `#${tag}`);
  }, [tags]);

  const preparedLink = useMemo(() => {
    let url = null;

    if (!/^https?:\/\//i.test(link)) {
      url = `http://${link}`;
    }
    return url ?? link;
  }, [link]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleDeleteEvent = useCallback(() => {
    dispatch(deleteEventAction(eventId, spaceId));
    setOpen(false);
  }, [dispatch, eventId, spaceId]);

  const renderCalendarButton = useCallback(() => {
    const dateFormatted = moment(timestamp).format('YYYY-MM-DD');
    const locationFormatted = isReal
      ? `${location.country}, ${location.city}, ${location.address}`
      : link;

    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          margin: '10px 0'
        }}
      >
        <AddToCalendarButton
          label="Add to Calendar"
          name={title}
          description={description}
          startDate={dateFormatted}
          location={locationFormatted}
          options={['Apple', 'Google', 'iCal']}
          listStyle="modal"
          lightMode="bodyScheme"
          inline
        />
      </Box>
    );
  }, [
    timestamp,
    isReal,
    location.country,
    location.city,
    location.address,
    link,
    title,
    description
  ]);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          padding: '20px 10px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: 'inset 0 -1px 0 0 rgba(0,0,0,0.12)'
        }}
        onClick={handleOpen}
      >
        <Avatar
          variant="rounded"
          sx={{ marginRight: '15px', background: common.white }}
        >
          {isReal ? (
            <LocationCityIcon color="primary" />
          ) : (
            <DevicesIcon color="primary" />
          )}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography variant="body1">{title}</Typography>
          {preparedTags && preparedTags.length > 0 && (
            <Typography color="CaptionText" variant="caption">
              {preparedTags.join(', ')}
            </Typography>
          )}
          <Typography color="gray" variant="caption">
            {date}
          </Typography>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ maxWidth: '90%' }}>{title}</DialogTitle>
        {!isReal && preparedLink && preparedLink !== 'http://' && (
          <Link
            sx={{
              fontSize: '12px',
              textAlign: 'center',
              paddingBottom: '15px',
              display: 'block'
            }}
            rel="noopener noreferrer"
            underline="none"
            color="hotpink"
            variant="button"
            href={preparedLink}
            target="_blank"
          >
            Event link
          </Link>
        )}
        {isReal && location?.geo && location.geo.length && (
          <Link
            sx={{
              fontSize: '12px',
              textAlign: 'center',
              paddingBottom: '15px',
              display: 'block'
            }}
            rel="noopener noreferrer"
            underline="none"
            color="hotpink"
            variant="button"
            href={location?.geo}
            target="_blank"
          >
            Get location
          </Link>
        )}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 5,
            top: 5,
            color: 'lightGray'
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ paddingTop: 0 }}>
          <Divider sx={{ margin: '10px 0' }} />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Typography variant="body1">Created by </Typography>
              <Typography variant="body2">{organizerName}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}
            >
              <Typography variant="body1">Date</Typography>
              <Typography variant="body2">{date}</Typography>
            </Box>
          </Box>
          <Divider sx={{ margin: '10px 0' }} />
          <Typography variant="body1">Agenda</Typography>
          <Typography variant="body2">{description}</Typography>
          <Box
            sx={{
              marginTop: '10px',
              display: 'flex',
              flexWrap: 'wrap',
              width: '100%',
              gap: '10px'
            }}
          >
            {preparedTags.map((tag) => (
              <Typography key={tag} variant="caption">
                {tag}
              </Typography>
            ))}
          </Box>
          <Divider sx={{ margin: '10px 0' }} />
          {isReal && (
            <>
              <Typography variant="body1">Address</Typography>
              <Typography variant="body2">
                {`${location.country}, ${location.city}, ${location.address}`}
              </Typography>
            </>
          )}
          {renderCalendarButton()}
          {isAdmin && (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                gap: '10px',
                marginTop: '20px'
              }}
            >
              <EventShareModal eventId={eventId} />
              <Button
                fullWidth
                variant="outlined"
                startIcon={<DeleteForeverIcon />}
                onClick={handleDeleteEvent}
              >
                Delete
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

EventCard.propTypes = {
  spaceId: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  eventId: PropTypes.string,
  isReal: PropTypes.bool,
  isAdmin: PropTypes.bool,
  link: PropTypes.string,
  timestamp: PropTypes.number,
  location: PropTypes.shape({
    country: PropTypes.string,
    city: PropTypes.string,
    address: PropTypes.string,
    geo: PropTypes.string
  }),
  organizerName: PropTypes.string,
  tags: PropTypes.string
};

export default EventCard;
