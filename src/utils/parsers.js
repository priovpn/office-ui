import "moment/locale/ru";
import * as moment from "moment/moment";
import parseUserAgent from "qiao-ua";
import { useLocale } from "vuetify/lib/framework.mjs";

export function parseDurationDate(date) {
  const { current } = useLocale();
  return moment
    .duration(moment(date).diff(moment()))
    .locale(current.value)
    .humanize(true);
}

export function parseUA(uaString) {
  const ua = parseUserAgent(uaString);
  return ua.browser?.name
    ? `${ua.browser.name} ${ua.browser.version}`
    : `${ua.os.name} ${ua.os.versionName} ${ua.os.version}`;
}

export function cutId(_id) {
  return _id.slice(0, _id.length - 16);
}

export function cutUserId(_id) {
  return _id.slice(0, _id.length - 12);
}
