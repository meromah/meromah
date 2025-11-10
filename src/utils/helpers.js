export const toQueryString = ( params ) => {
  if (!params || Object.keys(params).length === 0 ) {
    return '';
  }
  return `?${new URLSearchParams(params).toString()}`;
};