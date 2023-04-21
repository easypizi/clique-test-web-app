import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { Box } from '@mui/material';
import { setActiveFileFiltersAction } from '../../../store/actions/filesActions';
import getFileType from '../helpers/getFileType';
import getIconByType from '../helpers/getIconByFileType';
import compareFilterArrays from '../../MessageBoard/helpers/compareFilters';

function FileFilters() {
  const dispatch = useDispatch();
  const { currentSpace, isSpaceLoading } = useSelector((state) => state?.spaces);
  const { activeFileFilters } = useSelector((state) => state?.files);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const files = useMemo(() => currentSpace?.spaceFiles, [currentSpace]);

  const filtersList = useMemo(() => {
    if (!files || !files.length) {
      return [];
    }
    const result = [...new Set(files.map((item) => getFileType(item.type)))];
    return result;
  }, [files]);

  const renderFiltersGroups = useCallback(() => {
    if (!filtersList?.length || filtersList.length < 2) {
      return null;
    }

    return filtersList.map((value) => (
      <ToggleButton key={value} value={value} aria-label={value}>
        {getIconByType(value)}
      </ToggleButton>
    ));
  }, [filtersList]);

  const handleToggle = (event, newFilters) => {
    setSelectedFilters(newFilters);
  };

  useEffect(() => {
    if (!compareFilterArrays(selectedFilters, activeFileFilters)) {
      dispatch(setActiveFileFiltersAction(selectedFilters));
    }
  }, [activeFileFilters, dispatch, selectedFilters]);

  return (
    <Box sx={{ paddingTop: '5px' }}>
      <ToggleButtonGroup
        fullWidth
        disabled={isSpaceLoading}
        size="small"
        value={selectedFilters}
        onChange={handleToggle}
        aria-label="text formatting"
      >
        {renderFiltersGroups()}
      </ToggleButtonGroup>
    </Box>
  );
}

export default FileFilters;
