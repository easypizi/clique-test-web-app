import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Snackbar,
  Alert,
  Slide
} from '@mui/material';

import AddBoxIcon from '@mui/icons-material/AddBox';

import ScrollableContainer from '../ScrollableContainer/ScrollableContainer';

import {
  resetEventPublishingAction,
  togglePopupVisibilityAction,
  resetEventSendToVerificationSendingAction
} from '../../store/actions/eventsActions';
import EventFilters from './elements/EventFilters';
import EventCreationModal from './elements/EventCreationModal';
import EventCard from './elements/EventCard';
import filterEvents from './helpers';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function EventList() {
  const dispatch = useDispatch();
  const [alertVisible, setAlertVisibility] = useState(false);

  const { currentSpace, isSpaceLoading } = useSelector(({ spaces }) => spaces);
  const { currentUser } = useSelector(({ user }) => user);
  const { eventFilters, isEventVeryficationSent, isEventsPublished } =
    useSelector(({ events }) => events);
  const { user_id: currentUserId } = currentUser ?? { user_id: null };

  const events = useMemo(
    () => currentSpace?.spaceEvents,
    [currentSpace?.spaceEvents]
  );

  const filteredEvents = useMemo(() => {
    if (!events || !events.length) {
      return [];
    }
    return filterEvents(events, eventFilters);
  }, [eventFilters, events]);

  const alertMessage = useMemo(() => {
    if (isEventVeryficationSent) {
      return 'Event has been sent to verification';
    }

    if (isEventsPublished) {
      return 'Event has been shared to community';
    }

    return '';
  }, [isEventVeryficationSent, isEventsPublished]);

  const isAdmin = useMemo(
    () => currentUserId === currentSpace?.spaceOwner,
    [currentSpace?.spaceOwner, currentUserId]
  );

  const handlePopupVisibility = useCallback(() => {
    dispatch(togglePopupVisibilityAction(true));
  }, [dispatch]);

  const handleCloseAlert = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertVisibility(false);
  }, []);

  useEffect(() => {
    if (isEventVeryficationSent || isEventsPublished) {
      setAlertVisibility(true);

      setTimeout(() => {
        dispatch(resetEventPublishingAction());
        dispatch(resetEventSendToVerificationSendingAction());
      }, 6000);
    }
  }, [dispatch, isEventVeryficationSent, isEventsPublished]);

  return (
    <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
      {isSpaceLoading && !currentSpace ? (
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
            paddingBottom: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <EventFilters />
          <EventCreationModal />
          {filteredEvents && filteredEvents.length ? (
            <ScrollableContainer
              style={{
                boxShadow: 'none',
                padding: '10px 2px 0 2px',
                height: 'calc(100% - 100px)',
                marginTop: '5px',
                marginBottom: '10px'
              }}
            >
              {filteredEvents &&
                filteredEvents.map((event) => (
                  <EventCard
                    key={event.eventId}
                    isAdmin={isAdmin}
                    spaceId={currentSpace.spaceId}
                    {...event}
                  />
                ))}

              <Snackbar
                open={alertVisible}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                TransitionComponent={SlideTransition}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <Alert
                  onClose={handleCloseAlert}
                  severity="success"
                  elevation={6}
                  variant="filled"
                >
                  {alertMessage}
                </Alert>
              </Snackbar>
            </ScrollableContainer>
          ) : (
            <Typography
              variant="body1"
              sx={{
                marginTop: '80px',
                textAlign: 'center',
                marginBottom: 'auto'
              }}
            >
              No events matching current filters
            </Typography>
          )}
          <Button
            onClick={handlePopupVisibility}
            fullWidth
            variant="contained"
            startIcon={<AddBoxIcon />}
          >
            {isAdmin ? 'Create event' : 'Suggest Event'}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default EventList;
