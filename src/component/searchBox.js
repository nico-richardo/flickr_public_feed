import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function CustomizedInputBase(props) {

    let { onChange } = props;
    let [value, setValue] = React.useState("");

    let onSearch = () => {
        onChange && onChange(value)
    }
    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Image By Tags"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                inputProps={{ 'aria-label': 'search image by tags' }}
            />
            <IconButton sx={{ p: '10px' }} aria-label="search" onClick={onSearch}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}