import dayjs from 'dayjs';
import { FilterType } from '../const.js';

const filter = {
  [FilterType.EVERYTHING] : (points) => points.filter(() => true),
  [FilterType.FUTURE] : (points) => points.filter((point) => dayjs().isBefore(dayjs(point.dateFrom))),
  [FilterType.PAST] : (points) => points.filter((point) => dayjs().isAfter(dayjs(point.dateTo))),
  [FilterType.PRESENT] : (points) => points.filter((point) => dayjs().isAfter(dayjs(point.dateFrom)) && dayjs().isBefore(dayjs(point.dateTo)))
};

export {filter};

