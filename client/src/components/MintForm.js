import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'

function MintForm() {
    return (
        <Grid container rowSpacing={{ xs: 5, sm: 5, md: 10, lg: 15 }}>
            <Grid item xs={12} sm={12} md={12}>
                <TextField id="standard-basic" label="NAME" variant="standard" fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <TextField id="standard-basic" label="SYMBOL" variant="standard" fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <TextField id="standard-basic" label="MINT PRICE" variant="standard" fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Button variant="contained" fullWidth>Mint</Button>
            </Grid>
        </Grid>
    )
}

export default MintForm;