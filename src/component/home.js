import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import PublicFeedService from '../service/PublicFeedService.js';
import { CardActionArea } from '@mui/material';
import CustomizedInputBase from './searchBox.js';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Album() {
  let [feeds, setFeeds] = useState([]);

  useEffect(() => {
    PublicFeedService.get().then((response) => {
      if (response) {
        setFeeds(response);

      } else {
        console.log("rsponse", response)
      }
    });
  }, []);

  const onSearch = (value) => {
    const filter = "&tags=" + value.replaceAll(' ', ',');
    PublicFeedService.get(filter).then((response) => {
      if (response) {
        setFeeds(response);

      } else {
        console.log("rsponse", response)
      }
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <CustomizedInputBase 
              callback={onSearch}/>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {feeds.map((feed, index) => (
              <Grid item key={feed.title + feed.author_id + index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardActionArea
                    href={feed.link}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        maxHeight: '10em'
                      }}
                      image={feed.media.m}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <p><b>{feed.title}</b></p>
                      <p>by {feed.author}</p>
                    </CardContent>
                    <CardActions>
                      {/* <Button size="small">View</Button>
                      <Button size="small">Edit</Button> */}
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}