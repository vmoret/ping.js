import moment from 'moment';

export const DateService = {
  parse(input, format) {
    if (typeof input === 'string') {
      return typeof format === 'string'
        ? moment(input, format)
        : moment(new Date(input));
    }
    if (input instanceof Date) {
      return moment(input);
    }
    if (input instanceof moment) {
      return input;
    }
    throw Error(
      `Unexpected input type for ${input}`
    );
  },
  format(date, format = 'YYYY-MM-DD HH:mm') {
    return date instanceof moment
      ? date.format(format)
      : this.parse(date).format(format);
  },
  now() {
    return this.parse(new Date());
  }
};