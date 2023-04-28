import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box, CircularProgress, Typography, Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

import ScrollableContainer from '../ScrollableContainer/ScrollableContainer';

import { togglePopupVisibilityAction } from '../../store/actions/eventsActions';
import EventFilters from './elements/EventFilters';
import EventCreationModal from './elements/EventCreationModal';
import EventCard from './elements/EventCard';
import filterEvents from './helpers';

function EventList() {
  const dispatch = useDispatch();
  const { currentSpace, isSpaceLoading } = useSelector(({ spaces }) => spaces);
  const { currentUser } = useSelector(({ user }) => user);
  const { eventFilters } = useSelector(({ events }) => events);
  const { user_id: currentUserId } = currentUser ?? { user_id: null };

  const events = useMemo(
    () => currentSpace?.spaceEvents,
    [currentSpace?.spaceEvents]
  );

  const filteredEvents = useMemo(
    () => filterEvents(events, eventFilters),
    [eventFilters, events]
  );

  const isAdmin = useMemo(
    () => currentUserId === currentSpace?.spaceOwner,
    [currentSpace?.spaceOwner, currentUserId]
  );

  const handlePopupVisibility = useCallback(() => {
    dispatch(togglePopupVisibilityAction(true));
  }, [dispatch]);

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
