import React from 'react';
import _ from 'lodash';

export default React.createClass({

	getAttributes: function(icon) {
		let baseAttributes = _.omit(this.props, ['icon', 'nonDecorative']);
		let className = baseAttributes.className || '';
		let defaults = {
			'aria-hidden': 'true'
		};

		className += `fa fa-${this.props.icon}`;

		if (this.props.nonDecorative) {
			delete defaults['aria-hidden'];
		}

		return _.assign({}, defaults, baseAttributes, {
			className
		});
	},

	render: function() {
		return <i {...this.getAttributes(this.props.icon)}></i>
	}
});

function buildClassName(icon) {
	const className = this.props.className;

	if (! className.indexOf(icon)) {
		return className + ` fa-${icon}`;
	}

	return className;

}
