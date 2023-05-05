/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  TextField,
  Divider,
  Button
} from '@mui/material';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  resetEventsFiltersAction,
  setEventsFiltersAction
} from '../../../store/actions/eventsActions';

function EventFilters() {
  const dispatch = useDispatch();
  const [isOpen, setFiltersOpen] = useState(false);
  const [timingView, setTimingView] = useState('all');
  const [placeView, setPlaceView] = useState('all');
  const [tagsFilters, setFiltersTags] = useState('');

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleInputChange = (e) => {
    setFiltersTags(e.target.value);
  };

  const handleStartTimeChange = useCallback((date) => {
    setStartTime(date);
    setTimingView('all');
  }, []);

  const handleEndTimeChange = useCallback((date) => {
    setEndTime(date);
    setTimingView('all');
  }, []);

  const handleOpen = useCallback(() => {
    setFiltersOpen((value) => !value);
  }, []);

  const handleTimingViewChange = useCallback((event, newValue) => {
    setTimingView(newValue);
    setEndTime(null);
    setStartTime(null);
  }, []);

  const handlePlaceView = useCallback((event, newValue) => {
    setPlaceView(newValue);
  }, []);

  const handleApplyFilters = useCallback(() => {
    const preparedTags =
      tagsFilters && tagsFilters.length && tagsFilters.split(',');

    let isUpcomingValue = timingView === 'future';
    let isOfflineValue = placeView === 'offline';

    if (placeView === 'all') {
      isOfflineValue = null;
    }

    if (timingView === 'all') {
      isUpcomingValue = null;
    }

    const filtersGroup = {
      isUpcoming: isUpcomingValue,
      timeFrom: startTime && startTime.valueOf(),
      timeTo: endTime && endTime.valueOf(),
      isOffline: isOfflineValue,
      tags: preparedTags.length ? preparedTags : []
    };
    dispatch(setEventsFiltersAction(filtersGroup));
    setFiltersOpen(false);
  }, [dispatch, endTime, placeView, startTime, tagsFilters, timingView]);

  const handleClearFilters = useCallback(() => {
    setTimingView('all');
    setPlaceView('all');
    setFiltersTags('');
    setStartTime(null);
    setEndTime(null);
    dispatch(resetEventsFiltersAction());
    setFiltersOpen(false);
  }, [dispatch]);

  return (
    <Box sx={{ position: 'absolute', top: '0', zIndex: '10', width: '100%' }}>
      <Accordion
        sx={{ width: '100%', boxShadow: '0 0 0 1px rgba(0,0,0,0.12)' }}
        expanded={isOpen}
        onChange={handleOpen}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="body1" align="center">
            Фильтровать события
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="GrayText" variant="body2">
            Время мероприятия:
          </Typography>
          <ToggleButtonGroup
            sx={{ marginTop: '5px' }}
            size="small"
            fullWidth
            exclusive
            color="primary"
            value={timingView}
            onChange={handleTimingViewChange}
            aria-label="Timing view"
          >
            <ToggleButton
              sx={{
                border: 'none !important',
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)'
              }}
              value="past"
            >
              Прошедшие
            </ToggleButton>
            <ToggleButton
              sx={{
                border: 'none !important',
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)'
              }}
              value="all"
            >
              Все
            </ToggleButton>
            <ToggleButton
              sx={{
                border: 'none !important',
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)'
              }}
              value="future"
            >
              Будущие
            </ToggleButton>
          </ToggleButtonGroup>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '10px'
            }}
          >
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MobileDateTimePicker
                ampm={false}
                fullWidth
                size="small"
                label="Дата начала"
                disableFuture
                value={startTime}
                format="DD/MM/YYYY HH:mm"
                onChange={handleStartTimeChange}
                sx={{
                  '& input': {
                    padding: '14px 10px !important'
                  }
                }}
              >
                <TextField size="small" />
              </MobileDateTimePicker>
            </LocalizationProvider>
            <Typography
              color="GrayText"
              variant="body2"
              sx={{ margin: '0 5px' }}
            >
              –
            </Typography>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MobileDateTimePicker
                ampm={false}
                fullWidth
                size="small"
                label="Дата окончания"
                value={endTime}
                disablePast
                format="DD/MM/YYYY HH:mm"
                onChange={handleEndTimeChange}
                sx={{
                  '& input': {
                    padding: '14px 10px !important'
                  }
                }}
              >
                <TextField size="small" />
              </MobileDateTimePicker>
            </LocalizationProvider>
          </Box>
          <Divider sx={{ margin: '10px 0 ' }} />
          <Box>
            <Typography color="GrayText" variant="body2">
              Тип мероприятия:
            </Typography>
            <ToggleButtonGroup
              sx={{ marginTop: '5px' }}
              size="small"
              fullWidth
              exclusive
              color="primary"
              value={placeView}
              onChange={handlePlaceView}
              aria-label="Place view"
            >
              <ToggleButton
                sx={{
                  border: 'none !important',
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)'
                }}
                value="online"
              >
                Онлайн
              </ToggleButton>
              <ToggleButton
                sx={{
                  border: 'none !important',
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)'
                }}
                value="all"
              >
                Все
              </ToggleButton>
              <ToggleButton
                sx={{
                  border: 'none !important',
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)'
                }}
                value="offline"
              >
                Оффлайн
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Divider sx={{ margin: '10px 0 ' }} />
          <Box>
            <TextField
              sx={{ marginTop: '5px' }}
              fullWidth
              id="tagsBox"
              label="Теги"
              placeholder="Тег1, Тег2, Тег3..."
              type="text"
              size="small"
              variant="outlined"
              value={tagsFilters}
              onChange={handleInputChange}
            />
          </Box>
          <Button
            onClick={handleApplyFilters}
            sx={{ marginTop: '20px' }}
            fullWidth
            variant="contained"
          >
            Применить
          </Button>
          <Button
            onClick={handleClearFilters}
            color="error"
            sx={{ marginTop: '20px' }}
            fullWidth
            variant="outlined"
          >
            Сбросить фильтры
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default EventFilters;
