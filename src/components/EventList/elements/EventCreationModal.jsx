/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  useMemo
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment-timezone';
import { useSelector, useDispatch } from 'react-redux';

import {
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Dialog,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Box
} from '@mui/material';

import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CloseIcon from '@mui/icons-material/Close';

import {
  togglePopupVisibilityAction,
  createNewEventAction,
  sendEventToVerificationAction
} from '../../../store/actions/eventsActions';
import ScrollableContainer from '../../ScrollableContainer/ScrollableContainer';

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

function EventCreationModal() {
  const dispatch = useDispatch();
  const { isPopupOpened } = useSelector(({ events }) => events);
  const { currentSpace } = useSelector(({ spaces }) => spaces);
  const { currentUser } = useSelector(({ user }) => user);

  const { user_id: currentUserId } = currentUser ?? { user_id: null };

  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(null);
  const [eventLocationType, setEventLocationType] = useState('online');
  const [eventCountry, setEventCountry] = useState('');
  const [eventTags, setEventTags] = useState('');
  const [eventCity, setEventCity] = useState('');
  const [eventAddress, setEventAddress] = useState('');
  const [eventGeoLocation, setEventGeoLocation] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [formValid, setFormValid] = useState(false);

  const [open, setOpen] = useState(isPopupOpened);

  const isAdmin = useMemo(
    () => currentUserId === currentSpace?.spaceOwner,
    [currentSpace?.spaceOwner, currentUserId]
  );

  const resetFormData = useCallback(() => {
    setEventName('');
    setEventDescription('');
    setEventDate(null);
    setEventLocationType('online');
    setEventCountry('');
    setEventTags('');
    setEventCity('');
    setEventAddress('');
    setEventGeoLocation('');
    setEventLink('');
    setFormValid('');
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    dispatch(togglePopupVisibilityAction(false));
  }, [dispatch]);

  const handleEventNameChange = useCallback((event) => {
    setEventName(event.target.value);
  }, []);

  const handleEventDescriptionChange = useCallback((event) => {
    setEventDescription(event.target.value);
  }, []);

  const handleEventDateChange = useCallback((date) => {
    setEventDate(date);
  }, []);

  const handleEventLocationTypeChange = useCallback((event) => {
    setEventLocationType(event.target.value);
  }, []);

  const handleEventCountryChange = useCallback((event) => {
    setEventCountry(event.target.value);
  }, []);

  const handleEventCityChange = useCallback((event) => {
    setEventCity(event.target.value);
  }, []);

  const handleEventAddressChange = useCallback((event) => {
    setEventAddress(event.target.value);
  }, []);

  const handleEventGeoLocationChange = useCallback((event) => {
    setEventGeoLocation(event.target.value);
  }, []);

  const handleEventLinkChange = useCallback((event) => {
    setEventLink(event.target.value);
  }, []);

  const handleEventTagsChange = useCallback((event) => {
    setEventTags(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const eventData = {
        event_id: uuidv4(),
        event_space_id: currentSpace.spaceId,
        event_name: eventName,
        event_description: eventDescription,
        event_date: moment(eventDate).format('DD.MM.YYYY, HH:mm'),
        event_timestamp: moment(eventDate).valueOf(),
        event_is_offline: eventLocationType === 'offline',
        event_is_verified: isAdmin,
        event_organizer_id: currentUserId,
        event_organizer_telegram_link: `@${currentUser.user_telegram_link}`,
        event_organizer_credentials: `${currentUser.user_name ?? ''} ${
          currentUser.user_last_name ?? ''
        }`,
        event_tags: eventTags,
        event_location: {
          country: eventCountry,
          city: eventCity,
          address: eventAddress,
          geo: eventGeoLocation
        },
        event_link: eventLink
      };

      dispatch(createNewEventAction(eventData));

      if (!isAdmin) {
        dispatch(sendEventToVerificationAction(eventData));
      }

      handleClose();
      resetFormData();
    },
    [
      currentSpace.spaceId,
      currentUser.user_last_name,
      currentUser.user_name,
      currentUser.user_telegram_link,
      currentUserId,
      dispatch,
      eventAddress,
      eventCity,
      eventCountry,
      eventDate,
      eventDescription,
      eventGeoLocation,
      eventLink,
      eventLocationType,
      eventName,
      eventTags,
      handleClose,
      isAdmin,
      resetFormData
    ]
  );

  const validateForm = useCallback(() => {
    if (eventName && eventDescription && eventDate && eventLocationType) {
      if (eventLocationType === 'offline') {
        if (eventCountry && eventCity && eventAddress) {
          setFormValid(true);
        } else {
          setFormValid(false);
        }
      } else {
        setFormValid(true);
      }
    } else {
      setFormValid(false);
    }
  }, [
    eventAddress,
    eventCity,
    eventCountry,
    eventDate,
    eventDescription,
    eventLocationType,
    eventName
  ]);

  useEffect(() => {
    validateForm();
  }, [
    eventName,
    eventDescription,
    eventDate,
    eventLocationType,
    eventCountry,
    eventCity,
    eventAddress,
    eventGeoLocation,
    eventLink,
    validateForm
  ]);

  useEffect(() => {
    if (open !== isPopupOpened && isPopupOpened) {
      setOpen(isPopupOpened);
    }
  }, [isPopupOpened, open]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Event details
          </Typography>
          <Button
            disabled={!formValid}
            autoFocus
            color="inherit"
            onClick={handleSubmit}
          >
            Send
          </Button>
        </Toolbar>
      </AppBar>
      <ScrollableContainer
        style={{
          padding: '20px 15px',
          height: '100%',
          boxShadow: 'none'
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}
        >
          <TextField
            fullWidth
            size="small"
            required
            id="event-name"
            label="Event Name"
            value={eventName}
            onChange={handleEventNameChange}
          />

          <TextField
            required
            fullWidth
            size="small"
            id="event-description"
            placeholder="This event about ..."
            label="Event description"
            multiline
            rows={10}
            value={eventDescription}
            onChange={handleEventDescriptionChange}
          />

          <TextField
            fullWidth
            size="small"
            id="event-description"
            label="Event tags"
            placeholder="Tag1, Tag2, Tag3 ...."
            value={eventTags}
            onChange={handleEventTagsChange}
          />

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <MobileDateTimePicker
              ampm={false}
              fullWidth
              size="small"
              required
              label="Event Date"
              value={eventDate}
              format="DD/MM/YYYY HH:mm"
              onChange={handleEventDateChange}
            >
              <TextField />
            </MobileDateTimePicker>
          </LocalizationProvider>

          <FormControl component="fieldset">
            <FormLabel component="legend">Event Type</FormLabel>
            <RadioGroup
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row'
              }}
              aria-label="event-location-type"
              name="event-location-type"
              value={eventLocationType}
              onChange={handleEventLocationTypeChange}
            >
              <FormControlLabel
                value="offline"
                control={<Radio />}
                label="Offline"
              />
              <FormControlLabel
                value="online"
                control={<Radio />}
                label="Online"
              />
            </RadioGroup>
          </FormControl>

          {eventLocationType === 'offline' && (
            <>
              <TextField
                fullWidth
                size="small"
                required
                id="event-country"
                label="Country"
                value={eventCountry}
                onChange={handleEventCountryChange}
              />

              <TextField
                fullWidth
                size="small"
                required
                id="event-city"
                label="City"
                value={eventCity}
                onChange={handleEventCityChange}
              />

              <TextField
                fullWidth
                size="small"
                required
                id="event-address"
                label="Address"
                value={eventAddress}
                onChange={handleEventAddressChange}
              />

              <TextField
                sx={{ marginBottom: '30px' }}
                fullWidth
                size="small"
                id="event-geo-location"
                label="Geo link"
                placeholder="http://...."
                value={eventGeoLocation}
                onChange={handleEventGeoLocationChange}
              />
            </>
          )}
          {eventLocationType === 'online' && (
            <TextField
              sx={{ marginBottom: '30px' }}
              fullWidth
              size="small"
              id="event-link"
              label="Link to event"
              placeholder="http://...."
              value={eventLink}
              onChange={handleEventLinkChange}
            />
          )}
          <Box sx={{ height: '50px', width: '100%', visibility: 'hidden' }}>
            Fake
          </Box>
        </Box>
      </ScrollableContainer>
    </Dialog>
  );
}

export default EventCreationModal;
