export const inRange = (val, min, max) => val >= min && val <= max;

export const byDate = (refTs, valTs, maxDiff) => {
  const diff = Math.abs(refTs - Date.parse(valTs));
  return diff < maxDiff;
};

export const searchBy = (query, content) => {
  const searchBody = content.reduce((res, entry) => {
    if (!entry) return res;

    return res.concat(entry.toLowerCase());
  }, '');
  return searchBody.indexOf(query.toLowerCase()) > -1;
};

export const uniqueByKey = (list, key) =>
  list.map(d => d[key])
    .reduce((res, item) => {
      if (res.indexOf(item) === -1 && item !== null && item) res.push(item);
      return res;
    }, []);

export default {
  inRange,
  byDate,
  searchBy,
  uniqueByKey,
};
