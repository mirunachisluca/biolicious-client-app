import { convertToUrl } from './convertToUrl';

function createNameIdMap(data) {
  return data.reduce(
    (acc, cur) => ({ ...acc, [convertToUrl(cur.name)]: cur.id }),
    {}
  );
}

export { createNameIdMap };
