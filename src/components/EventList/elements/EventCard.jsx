import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Divider,
  Link
} from '@mui/material';

import { common } from '@mui/material/colors';
import { ics } from 'calendar-link';

import LocationCityIcon from '@mui/icons-material/LocationCity';
import DevicesIcon from '@mui/icons-material/Devices';
import CloseIcon from '@mui/icons-material/Close';

function EventCard({
  date,
  title,
  description,
  timestamp,
  //   eventId,
  isReal,
  link,
  location,
  organizerName,
  tags
}) {
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

  const addToCalendar = useCallback(() => {
    const event = {
      title,
      description,
      start: timestamp,
      duration: [1, 'hour']
    };

    if (isReal) {
      const address = `${location.country}, ${location.city}, ${location.address}`;
      event.location = address;
      event.url = location.geo ?? '';
    } else {
      event.url = link;
    }

    const calendarLink = ics(event);
    const activeLink = document.createElement('a');
    activeLink.href = calendarLink;
    activeLink.download = `${title}.ics`;
    document.body.appendChild(activeLink);
    activeLink.click();
    document.body.removeChild(activeLink);
  }, [description, isReal, link, location, timestamp, title]);

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
          <Typography color="gray" variant="caption">
            {date}
          </Typography>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ maxWidth: '90%' }}>{title}</DialogTitle>
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
          {isReal ? (
            <>
              <Typography variant="body1">Address</Typography>
              <Typography variant="body2">
                {`${location.country}, ${location.city}, ${location.address}`}
              </Typography>
              <Box
                sx={{
                  marginTop: '10px',
                  width: '100%'
                }}
              >
                <Button fullWidth variant="outlined" onClick={addToCalendar}>
                  Add to calendar
                </Button>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <Link
                rel="noopener noreferrer"
                underline="none"
                color="hotpink"
                variant="button"
                href={preparedLink}
                target="_blank"
              >
                Go to event!
              </Link>
              <Button fullWidth variant="outlined" onClick={addToCalendar}>
                Add to calendar
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

EventCard.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  //   eventId: PropTypes.string,
  isReal: PropTypes.bool,
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
