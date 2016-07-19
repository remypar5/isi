import React from 'react';
import _ from 'lodash';

import FAIcon from './helpers/FAIcon';

export default React.createClass({

	setShift: function(shift) {
		this.shift = shift;
	},

	getShiftOutput: function() {
		if (! this.shift) return 'foo';

		return _.values(_.filter(this.shift, ['start', 'end'])).join(' - ');
	},

	showAddButton: function() {
		return !! this.shift;
	},

	render: function() {
		return <form className="form-inline" noValidate>
			<label className="form-group">
				<span className="label">Shift</span>
				<div className="input-group">
					<div className="input-group-addon"><FAIcon icon="clock-o" /></div>
					<input type="text" value={this.props.shiftInput} className="form-control" placeholder="Shift" onInput={this.onInput} />
				</div>
				<div className="input-group-addon">{this.getShiftOutput()}</div>
			</label>
			{this.showAddButton() ?
				<button className="btn btn-default">
					<FAIcon icon="plus-circle" />
				</button>
			 : null}
		</form>;
	},

	onInput: function(event) {
		const value = event.target.value;

		try {
			const shift = translate(value);
			this.setShift(shift);
		}
		catch (e) {
			//
		}
	}
});
