const parseQueryString = (string) =>
  string
    .slice(1)
    .split('&')
    .map((queryParam) => {
      const kvp = queryParam.split('=');
      return { key: kvp[0], value: kvp[1] };
    })
    .reduce((query, kvp) => {
      // eslint-disable-next-line no-param-reassign
      query[kvp.key] = kvp.value;
      return query;
    }, {});

export { parseQueryString };
