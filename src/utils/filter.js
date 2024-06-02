import dayjs from 'dayjs';
import { FILTER_TYPE } from '../const.js';

const filter = {
  [FILTER_TYPE.EVERYTHING] : (points) => points.filter(() => true),
  [FILTER_TYPE.FUTURE] : (points) => points.filter((point) => dayjs().isBefore(dayjs(point.dateFrom))),
  [FILTER_TYPE.PAST] : (points) => points.filter((point) => dayjs().isAfter(dayjs(point.dateTo))),
  [FILTER_TYPE.PRESENT] : (points) => points.filter((point) => dayjs().isAfter(dayjs(point.dateFrom)) && dayjs().isBefore(dayjs(point.dateTo)))
};

export {filter};

