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

export default function SelectCountry (props) {

    return (
        <ThemeProvider theme={theme}>
            <FormControl fullWidth variant="outlined">
                <InputLabel id="select-label">Country</InputLabel>
                <Select
                    label="Country"
                    required
                    id="Country"
                    disabled={props.disabled}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    error={props.error}
                >
                    <MenuItem value={'Nigeria'}>Nigeria</MenuItem>
                    <MenuItem value={'Ghana'}>Ghana</MenuItem>
                    <MenuItem value={'Kenya'}>Kenya</MenuItem>
                    <MenuItem value={'United Kingdom'}>United Kingdom</MenuItem>
                </Select>
            </FormControl>  
        </ThemeProvider>
    )

}