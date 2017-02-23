export const firstLetterCaps = text => text.slice(0, 1).toUpperCase() + text.slice(1);

export const namify = text =>
  firstLetterCaps(
    text.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1').replace(/ +/g, ' ')
  );
