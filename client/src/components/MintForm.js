import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { createCollectionContract } from "../providers/Web3Provider";

async function mintContract(setLoading) {
    try {
        let collectionName = document.getElementById("name-input").value;
        let collectionSymbol = document.getElementById("symbol-input").value;
        let collectionMintPrice = document.getElementById("price-input").value;

        setLoading(true);
        console.log("setting")
        // set loading circle here and clear inputs
        let res = await createCollectionContract(collectionName, collectionSymbol, collectionMintPrice);

        console.log(res);
    }
    catch (e) {
        alert("broke")
    }
    finally {
        document.getElementById("name-input").value = "";
        document.getElementById("symbol-input").value = "";
        document.getElementById("price-input").value = "";
        setLoading(false);
    }
}

function MintForm() {
    const [loading, setLoading] = useState(false);
    return (
        <Grid container rowSpacing={{ xs: 5, sm: 5, md: 10, lg: 15 }}>
            <Grid item xs={12} sm={12} md={12}>
                <TextField id="name-input" label="NAME" variant="standard" fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <TextField id="symbol-input" label="SYMBOL" variant="standard" fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <TextField id="price-input" label="MINT PRICE (ETH)" variant="standard" fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <LoadingButton id="mint-button" variant="contained" loading={loading} onClick={async () => { await mintContract(setLoading); }} fullWidth>Mint</LoadingButton>
            </Grid>
        </Grid>
    )
}

export default MintForm;