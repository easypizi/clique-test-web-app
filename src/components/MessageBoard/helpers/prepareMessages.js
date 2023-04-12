const prepareMessages = (messages, isSpaceOwner) => {
  if (!messages || !messages.length) {
    return null;
  }

  return messages.map((message) => ({
    ...message,
    groupId: message.group_id,
    canBeDeleted: isSpaceOwner
  }));
};

export default prepareMessages;
