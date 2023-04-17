import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, CircularProgress, Box, Checkbox } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ScrollableContainer from '../ScrollableContainer/ScrollableContainer';
import ChatCard from './elements/ChatCard';
import Search from '../Search/Search';
import prepareGroupData from './helpers';

function ChatList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { currentSpace, isSpacesLoading } = useSelector((state) => state.spaces);
  const { currentUser } = useSelector((state) => state.user);
  const { user_id: currentUserId } = currentUser ?? {};
  const [isVisibleGroups, setGroupsVisibility] = useState(true);
  const [isVisibilityChanged, setIsVisibilityChanged] = useState(false);
  const groups = currentSpace?.spaceGroups;

  const isLoading = useMemo(
    () => isSpacesLoading || isVisibilityChanged,
    [isSpacesLoading, isVisibilityChanged]
  );

  const isAdmin = useMemo(
    () => currentUserId === currentSpace?.spaceOwner,
    [currentSpace?.spaceOwner, currentUserId]
  );

  const handleToggleVisibility = useCallback(() => {
    setGroupsVisibility((value) => !value);
  }, []);

  const onDeleteLoadingStart = useCallback(() => {
    setIsVisibilityChanged(true);
  }, []);

  const hiddenGroups = useMemo(() => {
    if (!currentSpace || !groups) {
      return [];
    }
    return groups?.filter((group) =>
      group?.hiddenSpaces?.some((space) => space === currentSpace?.spaceId)
    );
  }, [currentSpace, groups]);

  const visibleGroups = useMemo(() => {
    if (!currentSpace || !groups) {
      return [];
    }

    return groups?.filter((group) => {
      if (!group.hiddenSpaces) {
        return true;
      }

      return group.hiddenSpaces.every((space) => space !== currentSpace.spaceId);
    });
  }, [currentSpace, groups]);

  const formattedData = useMemo(() => {
    const dataGroups = isVisibleGroups ? visibleGroups : hiddenGroups;

    return prepareGroupData(dataGroups, isAdmin, currentSpace?.spaceId);
  }, [
    currentSpace?.spaceId,
    hiddenGroups,
    isAdmin,
    isVisibleGroups,
    visibleGroups
  ]);

  const filteredGroups = useMemo(() => {
    if (!formattedData || !formattedData.length) return [];
    return formattedData?.filter(({ name: groupName, type: groupType }) =>
      [groupName, groupType].some((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [formattedData, searchTerm]);

  useEffect(() => {
    setGroupsVisibility(true);
    return () => {
      setIsVisibilityChanged(false);
    };
  }, [isSpacesLoading]);

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {isLoading ? (
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
            paddingBottom: '10px'
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Search onSearch={setSearchTerm} />
            {isAdmin && (
              <Checkbox
                onChange={handleToggleVisibility}
                icon={<VisibilityIcon />}
                checkedIcon={<VisibilityOffIcon />}
              />
            )}
          </Box>
          {filteredGroups && filteredGroups.length ? (
            <ScrollableContainer
              style={{
                padding: '10px 2px 0 2px',
                height: 'calc(100% - 40px)',
                gap: '10px',
                marginTop: '5px'
              }}
            >
              {filteredGroups.map((group) => (
                <ChatCard
                  key={group.id}
                  {...group}
                  onDelete={onDeleteLoadingStart}
                />
              ))}
              {filteredGroups && filteredGroups.length > 5 && (
                <div
                  style={{ width: '100%', height: '300px', flexShrink: 0 }}
                />
              )}
            </ScrollableContainer>
          ) : (
            <Typography
              variant="body1"
              sx={{ marginTop: '20px', textAlign: 'center' }}
            >
              No groups or channels has been found. Please try to choose other
              space
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default ChatList;
