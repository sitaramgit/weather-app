import { memo, useState } from "react"
import { Box, TextField, Typography, Button, CircularProgress } from '@mui/material';
import Grid from "@mui/material/Grid2";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
interface ISearchWeather {
    updateCity: (search: string) => any,
    isLoading: boolean
}
const SearchWeather = ({ updateCity, isLoading }:ISearchWeather) => {
    const [city, setCity] = useState('London');
    return(
        <Grid sx={{mb:'10px'}} container >
                <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5 }} >
                    <Typography variant="h6" gutterBottom align="center">
                        Weather in your city
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7 }} >
                    <Box sx={{display: 'flex'}}>
                        <TextField
                            label="Enter City"
                            variant="outlined"
                            value={city}
                            size="small"
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <Button sx={{ml:'5px', mr: '5px', height: '40px'}} onClick={() => updateCity(city)} variant="outlined" startIcon={<HelpOutlineIcon />}>
                            search
                        </Button>
                        {isLoading && <CircularProgress />}
                    </Box>
                </Grid>
            </Grid>
    )
}

export default memo(SearchWeather)