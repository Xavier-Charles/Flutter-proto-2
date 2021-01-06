import React from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
	MuiSelect:{
		root:{
			textAlign:'left'
		}
	}
  }
});

export default function SelectCurrency (props) {

    return (
        <ThemeProvider theme={theme}>
            <FormControl fullWidth variant="outlined">
                <InputLabel id="select-label">Currency</InputLabel>
                <Select
                    label="Currency"
                    required
                    id="currency"
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    error={props.error}
                >
                    <MenuItem value={'Nigeria'}>Nigerian Naira (&#8358;) </MenuItem>
                    <MenuItem value={'Ghana'}>Ghana Cedis (GH&#8373;)</MenuItem>
                    <MenuItem value={'Kenya'}>Kenyan Shilling (Ksh)</MenuItem>
                    <MenuItem value={'United Kingdom'}>Pound Sterling (&#163;)</MenuItem>
                </Select>
            </FormControl>  
        </ThemeProvider>
    )

}