import React from 'react';
import * as PropTypes from 'prop-types';
import MUISlider from '@mui/material/Slider';
import { Field } from 'react-final-form';

const renderSliderField = ({
  input,
  step,
  min,
  max,
  onSliderChange,
  disabled,
}) => (
  <MUISlider
    step={step}
    min={min}
    max={max}
    {...input}
    onDragStart={() => {
      /* disable the dragging propagation */
    }}
    onChange={(event, newValue) => {
      if (onSliderChange) {
        onSliderChange(event, newValue);
      }
      input.onChange(newValue);
    }}
    valueLabelDisplay="auto"
    marks={true}
    disabled={disabled}
  />
);

renderSliderField.propTypes = {
  input: PropTypes.object,
  name: PropTypes.string,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  meta: PropTypes.object,
  onSliderChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export const SliderField = (props) => (
  <Field component={renderSliderField} {...props} />
);
