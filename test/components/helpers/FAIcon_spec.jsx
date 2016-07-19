import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import FAIcon from '../../../src/components/helpers/FAIcon';

// TODO: Test: it is able to pass a different tagName;
// TODO: Test: it changes icon when setIcon(newIcon) is called;

describe('Font Awesome icon helper', function() {

	beforeEach(function() {
		this.renderer = TestUtils.createRenderer();
	});

	describe('in a simple format', function() {

		beforeEach(function () {
			const renderer = this.renderer;
			renderer.render(
				<FAIcon icon="plus" title="Add more" />
			);

			this.renderedDOM = renderer.getRenderOutput();
		});

		it('renders a FontAwesome icon element', function() {
			const icon = this.renderedDOM;

			expect(icon.type).to.equal('i');
			expect(icon.props.className.indexOf('fa') > -1).to.be.true;
			expect(icon.props.className.indexOf('fa-plus') > -1).to.be.true;
		});

		it('renders a decorative icon by default', function() {
			const icon = this.renderedDOM;

			expect(icon.props['aria-hidden']).to.equal('true');
		});

		it('renders additional attributes that are passed', function() {
			const icon = this.renderedDOM;

			expect(icon.props.title).to.equal('Add more');
		});
	});

	describe('in a complex format', function() {

		beforeEach(function() {
			const renderer = this.renderer;
			renderer.render(
				<FAIcon icon="plus" nonDecorative className="fa-fw fa-2x" />
			);

			this.renderedDOM = renderer.getRenderOutput();
		});

		it('can override the default aria-hidden state', function() {
			const icon = this.renderedDOM;

			expect(icon.props['aria-hidden']).to.be.undefined;
		});

		it('accepts additional classNames', function() {
			const icon = this.renderedDOM;

			expect(icon.props.className.indexOf('fa-fw') > -1).to.be.true;
		});

	});
});
