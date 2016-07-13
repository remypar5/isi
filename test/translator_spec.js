import translate from '../src/translator';
import {expect} from 'chai';

describe('translator', function() {
	const timeFormat = 'HH:mm';

	it('fails on invalid input', function() {
		function translateInvalid() {
			return translate('some invalid input');
		};

		expect(translateInvalid).to.throw(SyntaxError);
	});

	it('translates from a simple format', function() {
		const shift = 'A8';
		const state = translate(shift);

		expect(state.get('start')).to.equal('07:00');
		expect(state.get('end')).to.equal('15:00');
		expect(state.get('duration')).to.equal(8);
	});

	it('translates from a complex format', function() {
		const shift = 'Hb72';
		const state = translate(shift);

		expect(state.get('start')).to.equal('14:30');
		expect(state.get('end')).to.equal('22:00');
		expect(state.get('duration')).to.equal(7.5);
	});

	it('translates from a night shift format', function() {
		const shift = 'Hbs0';
		const state = translate(shift);

		expect(state.get('start')).to.equal('14:30');
		expect(state.get('end')).to.equal('07:30');
		expect(state.get('duration')).to.equal(17);
	});
});
