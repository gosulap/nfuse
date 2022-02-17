import { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MintForm from './MintForm';
import HowItWorks from './HowItWorks';

import { checkLoggedInStatus, loginWithMetaMask } from "../providers/Web3Provider";

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#05050a',
    },
    secondary: {
      main: '#b388ff',
    },
    info: {
      main: '#2196f3',
    },
    metamask: {
      main: '#ffa500'
    },
  },
});

function ButtonStack(props) {
  if (props.address) {
    return (
      <Stack
        sx={{ pt: 4 }}
        direction="row"
        spacing={2}
        justifyContent="center"
      >
        {!props.creating && <Button id="main-button" variant="contained" onClick={() => props.flipBool(true)}>Create Contract</Button>}
        {props.creating && <Button id="hiw-button" variant="contained" onClick={() => props.flipBool(false)}>How it works</Button>}
      </Stack>
    )
  }
  else {
    return <div></div>
  }
}

function App() {
  const [address, setAddress] = useState(null);
  const [creating, setCreating] = useState(true);

  window.ethereum.on("accountsChanged", function (accounts) {
    if (accounts) {
      setAddress(accounts[0]);
    }
    else {
      setAddress(null);
    }
  });


  useEffect(async () => {
    setAddress(await checkLoggedInStatus())
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            nfuse - Logo
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Own the contracts that create them
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Mint your NFT contract and use it to power your collections
            </Typography>
            <ButtonStack address={address} creating={creating} flipBool={setCreating} />
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {address && creating && <MintForm />}
          {address && !creating && <HowItWorks />}
          {!address && <Button id="hiw-button" variant="contained" onClick={async () => setAddress(await loginWithMetaMask())} fullWidth>Login with Metamask</Button>}
        </Container>
      </main>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: theme.palette.primary.main,
        }}

        style={{
          position: "fixed",
          bottom: 0,
          textAlign: "center",
          paddingBottom: 10,
          width: '100vw',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="white" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://google.com">
              Nfuse
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Container>
      </Box>
    </ThemeProvider >
  );
}

export default App;
