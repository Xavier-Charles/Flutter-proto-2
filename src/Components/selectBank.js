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

export default function SelectBank (props) {

    return (
        <ThemeProvider theme={theme}>
            <FormControl fullWidth variant="outlined">
                <InputLabel id="select-label">Bank</InputLabel>
                <Select
                    label="Bank"
                    required
                    id="Bank"
                    banks={props.banks}
                    disabled={props.disabled}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    error={props.error}
                >
                    {props.banks.map((e, i) => {
                        return(
                            <MenuItem key={i} value={e.name}>{e.name}</MenuItem>
                        )})}
                </Select>
            </FormControl>
        </ThemeProvider>
    )

}