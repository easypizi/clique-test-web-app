export default function prepareGroupData(groupData, canBeDeleted, spaceId) {
  if (!groupData) {
    return null;
  }

  return groupData.map((group) => ({
    isHiddenByAdmin: group?.hiddenSpaces?.some((space) => space === spaceId),
    id: group.groupId,
    type: group.groupType,
    name: group.groupName,
    link: group.groupLink,
    groupHiddenSpaces: group.hiddenSpaces,
    canBeDeleted,
    spaceId
  }));
}
