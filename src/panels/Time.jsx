import React, {Component} from 'react';
import ReactSlider from 'react-slider';
import dayjs from 'dayjs';


class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayjs: this.getCurrentDayjs(props)
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      dayjs: this.getCurrentDayjs(props)
    });
  }

  getCurrentDayjs = (props) => {
    const {range, rangeAt} = props;
    let result = props.dayjs;

    if (result) {
      if (range) {
        result = result[rangeAt] || dayjs().hour(0).minute(0);
      }
    } else {
      result = dayjs().hour(0).minute(0);
    }
    
    return result;
  }

  handleChange = (type, value) => {
    const {onChange, range, rangeAt} = this.props;
    let _dayjs = this.state.dayjs.clone();
    let selected = this.props.dayjs;

    _dayjs = _dayjs[type](value);

    if (range) {  
      const copyed = selected ? Object.assign(selected, {}) : {};

      copyed[rangeAt] = _dayjs;
    } else {
      selected = _dayjs;
    }


    this.setState({
      dayjs: _dayjs
    });
    
    onChange && onChange(selected);
  }

  render() {
    const _dayjs = this.state.dayjs;
    const {style} = this.props;

    return (
      <div style={style}>
        <div className="time">
          <div className="show-time">
            <span className="text">{_dayjs.format('HH')}</span>
            <span className="separater">:</span>
            <span className="text">{_dayjs.format('mm')}</span>
          </div>
          <div className="sliders">
            <span className="slider-text">Hours:</span>
            <ReactSlider min={0} max={23} value={_dayjs.hour()} onChange={this.handleChange.bind(this, 'hour')} withBars />
            <span className="slider-text">Minutes:</span>
            <ReactSlider min={0} max={59} value={_dayjs.minute()} onChange={this.handleChange.bind(this, 'minute')} withBars />
          </div>
        </div>
      </div>
    );
  }
}


export default Time;
