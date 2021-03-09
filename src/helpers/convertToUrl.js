const convertName = (name) =>
  name.toLowerCase().replace('&', '').replace(/\s\s/g, '-').replace(/\s/g, '-');

export { convertName };
