import type { ConfigType } from 'dayjs';

import { dayjs } from '@/lib/dayjs';

export function extractDateStringFromDate(date: ConfigType) {
  return date ? dayjs(date).format('DD.MM.YYYY') : '--.--.----';
}

export function extractHourStringFromDate(date: ConfigType) {
  return date ? dayjs(date).format('HH:mm') : '--:--';
}

export function displayDateWithHours(date: ConfigType) {
  return dayjs(date).format('DD.MM.YYYY HH:mm');
}

export function formatDateTime(date: ConfigType) {
  return dayjs(date).format('YYYY-MM-DDTHH:mm');
}

export function nextDay(date: ConfigType) {
  return dayjs(date).add(1, 'd').toDate();
}

export function advanceByMinutes(date: ConfigType, minutes: number) {
  return dayjs(date).add(minutes, 'm').toDate();
}

export function displayDatesAsTimeslot(
  startDate: ConfigType,
  endDate: ConfigType
) {
  return `${extractHourStringFromDate(startDate)} - ${extractHourStringFromDate(
    endDate
  )}`;
}

export function displayDatesAsFullTimeslot(
  startDate: ConfigType,
  endDate: ConfigType
) {
  return `${displayDateWithHours(startDate)} - ${extractHourStringFromDate(
    endDate
  )}`;
}

export function isAfter(firstDate: ConfigType, secondDate: ConfigType) {
  return dayjs(firstDate).isAfter(secondDate);
}

export function isBefore(firstDate: ConfigType, secondDate: ConfigType) {
  return dayjs(firstDate).isBefore(secondDate);
}

export function isAfterOrSame(firstDate: ConfigType, secondDate: ConfigType) {
  return (
    dayjs(firstDate).isAfter(secondDate) || dayjs(firstDate).isSame(secondDate)
  );
}

export const endOfDay = (date: ConfigType) => dayjs(date).endOf('day').toDate();
