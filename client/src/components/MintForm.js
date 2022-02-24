import { useState } from "react";
import { createCollectionContract, getEvents } from "../providers/Web3Provider";

import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


async function mintContract(setLoading) {
    try {
        let collectionName = document.getElementById("name-input").value;
        let collectionSymbol = document.getElementById("symbol-input").value;
        let collectionMintPrice = document.getElementById("price-input").value;
        setLoading(true);

        let tx = await createCollectionContract(collectionName, collectionSymbol, collectionMintPrice);
        let lastEvent = await getEvents();

        console.log(tx);
        window.open("https://rinkeby.etherscan.io/address/" + lastEvent.returnValues["0"])
    }
    catch (e) {
        console.log(e);
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