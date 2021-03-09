function getUrlSerachParams(urlParams) {
  const urlSearchParams = new URLSearchParams();

  Object.entries(urlParams).forEach(([key, value]) => {
    if (value.length !== 0) {
      urlSearchParams.append(key, value);
    }
  });

  return urlSearchParams;
}

export { getUrlSerachParams };
