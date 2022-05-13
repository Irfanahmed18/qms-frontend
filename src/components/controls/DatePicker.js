import React from 'react';
import {DatePicker as MUIDatePicker} from '@mui/x-date-pickers';

export default function DadtePicker(props) {

    const {name, label, value, onChange} = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MUIDatePicker disableToolbar variant="inline" inputVariant="outlined"
                       label={label}
                       format="MMM/dd/yyyy"
                       name={name}
                       value={value}
                       onChange={date => onChange(convertToDefEventPara(name, date))}>
        </MUIDatePicker>
    )
}
