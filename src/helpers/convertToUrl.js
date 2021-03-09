const convertToUrl = (name) =>
  name.toLowerCase().replace('&', '').replace(/\s\s/g, '-').replace(/\s/g, '-');

const convertFromUrl = (name) => name.replace('-', ' ');

export { convertToUrl, convertFromUrl };
