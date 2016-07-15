import {Map} from 'immutable';
import moment from 'moment';
import _ from 'lodash';

const timeFormat = 'HH:mm';
const shiftParserRegex = /^([A-W])([abc])?(s|\d)([0-3])?$/;
const startingHoursMap = _.zipObject('ABCDEFGHIJKLMNOPQRSTUVW'.split(''), _.range(7, 33));
const startingQuartersMap = _.zipObject('abc'.split(''), _.range(1, 4));

/**
 * Translate a <code>shift</code> to an immutable <code>Map</code> containing a start, end, and duration
 *
 * Usage: <code>const shift = translate('Hbs0');</code>
 *
 * @param  {string}
 * @return {object}
 */
export default function translate(shift) {
	const parsed = shift.match(shiftParserRegex);

	if (! parsed) {
		throw new SyntaxError(`Invalid shift pattern: ${shift}`);
	}

	const start = parseStart(...parsed.slice(1, 3));
	const end = parseEnd(start, ...parsed.slice(3));
	const duration = parseDuration(start, end);

	return Map({
		start: start.format(timeFormat),
		end: end.format(timeFormat),
		duration,
	});
}

function parseStart(hour, quarter = '') {
	return moment(startingHoursMap[hour], timeFormat)
		.add((startingQuartersMap[quarter] || 0) * 15, 'm');
};

function parseEnd(start, hour, quarter = 0) {
	if (hour === 's') {
		start = '07:30';
		hour = quarter;
	}

	return moment(start, timeFormat)
		.add(hour, 'h')
		.add(quarter * 15, 'm');
}

function parseDuration(start, end) {
	let isNightshift = false;
	if (end.isBefore(start)) {
		const tmp = end;
		end = start;
		start = tmp;

		isNightshift = true;
	}
	let duration = end.diff(start, 'h', true);

	if (isNightshift) {
		duration = 24 - duration;
	}

	return duration;
}
