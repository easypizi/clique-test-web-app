export default function filterEvents(events, filters) {
  return events.filter((event) => {
    // Проверяем фильтр isOffline
    if (filters.isOffline !== null) {
      const { isReal } = event;
      if (filters.isOffline && !isReal) {
        return false;
      }
      if (!filters.isOffline && isReal) {
        return false;
      }
    }

    // Проверяем фильтр tags
    if (filters.tags.length > 0) {
      const tagsArray =
        event.tags.length && event.tags.replaceAll(' ', '').split(',');

      if (!tagsArray.length) {
        return false;
      }

      const lowerCaseTags = filters.tags.map((tag) =>
        tag.replace(' ', '').toLowerCase()
      );
      if (!tagsArray.some((tag) => lowerCaseTags.includes(tag.toLowerCase()))) {
        return false;
      }
    }

    // Проверяем фильтр isUpcoming
    if (filters.isUpcoming !== null) {
      const now = Date.now();
      if (filters.isUpcoming && event.timestamp < now) {
        return false;
      }
      if (!filters.isUpcoming && event.timestamp >= now) {
        return false;
      }
    }

    // Проверяем фильтр timeFrom
    if (filters.timeFrom !== null && event.timestamp < filters.timeFrom) {
      return false;
    }

    // Проверяем фильтр timeTo
    if (filters.timeTo !== null && event.timestamp > filters.timeTo) {
      return false;
    }

    // Если дошли до этой точки, значит объект прошел все фильтры
    return true;
  });
}
