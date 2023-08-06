const DATE_REGEX =
  /((\d{4})(\/|-|.)(\d{1,2})(\/|-|.)(\d{1,2}))?((\d{1,2})(\/|-|.)(\d{1,2})(\/|-|.)(\d{4}))?/gm;

export default function getDatesFromStr(contentStr: string) {
  const datesArray = contentStr.match(DATE_REGEX);

  return datesArray ? datesArray.filter((item: string) => !!item).join(', ') : '';
}
