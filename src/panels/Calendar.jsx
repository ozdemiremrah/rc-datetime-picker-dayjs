import React, {Component} from 'react';
const dayjs = require('dayjs');

import Day from './Day.jsx';
import Month from './Month.jsx';
import Year from './Year.jsx';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayjs: this.getCurrentDayjs(props),
      panel: props.minPanel || 'day'
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      dayjs: this.getCurrentDayjs(props)
    });

    if (!props.isOpen) {
      this.setState({
        panel: props.minPanel || 'day'
      });
    }
  }

  getCurrentDayjs = (props) => {
    const {range, rangeAt} = props;
    const now = this.state ? this.state.dayjs || dayjs() : dayjs();
    let result = props.dayjs;

    if (result) {
      if (range) {
        result = result[rangeAt] || now;
      }
    } else {
      result = now;
    }

    return result;
  }

  handleSelect = (selected) => {
    const {panel} = this.state;
    const {onChange, range, rangeAt, minPanel} = this.props;
    const nextPanel = (panel === 'year' ? 'month' : 'day') === 'month' 
      ? minPanel === 'year' ? 'year' : 'month'
      : minPanel === 'month' ? 'month' : 'day';
    let _selected = this.props.dayjs;
    let shouldChange = panel === minPanel;

    if (_selected && !shouldChange) {
      if (range) {
        shouldChange = rangeAt === 'start' ? _selected.start : _selected.end;
      } else {
        shouldChange = true;
      }
    }

    if (range) {
      const copyed = _selected ? {..._selected} : {};

      copyed[rangeAt] = selected;
      _selected = copyed;
    } else {
      _selected = selected;
    }
    
    this.changePanel(nextPanel, selected);

    if (shouldChange) {
      onChange && onChange(_selected, panel);
    }
  }

  changePanel = (panel, dayjs = this.state.dayjs) => {
    this.setState({
      dayjs,
      panel
    });
  }

  render() {
    const {weeks, months, dayFormat, style, maxDate, minDate, dateLimit, range, rangeAt} = this.props;
    const props = {
      dayjs: this.state.dayjs,
      selected: this.props.dayjs,
      onSelect: this.handleSelect,
      changePanel: this.changePanel,
      weeks,
      months,
      dayFormat,
      maxDate,
      minDate,
      dateLimit,
      range,
      rangeAt
    };
    const {panel} = this.state;
    const isDayPanel = panel === 'day';
    const isMonthPanel = panel === 'month';
    const isYearPanel = panel === 'year';

    return (
      <div style={style}>
        <div className="calendar">
          <Day 
            {...props}
            style={{display: isDayPanel ? 'block' : 'none'}} />
          <Month 
            {...props}
            style={{display: isMonthPanel ? 'block' : 'none'}} />
          <Year 
            {...props}
            style={{display: isYearPanel ? 'block' : 'none'}} />
        </div>
      </div>
    );
  }
}


export default Calendar;
