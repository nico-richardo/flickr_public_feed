import AppBar from '@mui/material/AppBar';
import CollectionsIcon from '@mui/icons-material/Collections';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Fragment, useEffect, useState } from 'react';
import PublicFeedService from '../service/PublicFeedService.js';
import { CardActionArea, Chip, Divider, Pagination } from '@mui/material';
import CustomizedInputBase from './searchBox.js';
import styled from '@emotion/styled';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Nico's Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#FBE7C6',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const theme = createTheme();

export default function Album() {
  const itemCount = 10;

  let [feeds, setFeeds] = useState([]);
  let [filter, setFilter] = useState({});
  let [itemPage, setItemPage] = useState([1]);
  let [maxPage, setMaxPage] = useState(0);
  let [itemIndex, setItemIndex] = useState({
    min: itemPage * itemCount - itemCount,
    max: itemPage * itemCount
  })

  useEffect(() => {
    setItemIndex({
      min: itemPage * itemCount - itemCount,
      max: itemPage * itemCount
    })
  }, [itemPage])

  useEffect(() => {
    PublicFeedService.get().then((response) => {
      if (response) {
        setFeeds(response);
        setMaxPage(Math.ceil(response.length / itemCount));
      } else {
        console.log("rsponse", response)
      }
    });
  }, []);


  const onSearch = (value) => {
    setFilter(prevState => ({
      ...prevState,
      tags: value.replaceAll(' ', ',')
    }));
    PublicFeedService.get(filter).then((response) => {
      if (response) {
        setFeeds(response);
      } else {
        console.log("rsponse", response)
      }
    });
  }

  const handlePagination = (event, value) => {
    setItemPage(value);
  };

  const renderTags = (tags) => (
    tags.split(" ").map((tag) =>
      <Chip label={tag} />)
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" style={{ background: '#FFAEBC' }}>
        <Toolbar>
          <CollectionsIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Gallery
          </Typography>
        </Toolbar>
      </AppBar>
      <main style={{ background: '#A0E7E5' }}>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: '#EDFFFF',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="#216866"
              gutterBottom
            >
              Gallery
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <CustomizedInputBase
                onChange={onSearch} />
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {feeds.filter((item, index) => index >= itemIndex.min && index < itemIndex.max)
              .map((feed, index) => (
                <Grid item key={feed.title + feed.author_id + index} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardActionArea
                      href={feed.link}
                      sx={{ height: '100%' }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          // 16:9
                          height: '10em'
                        }}
                        image={feed.media.m}
                        alt="random"
                      />
                      <CardContent sx={{ flexGrow: 1, bgcolor: '#B4F8C8', height: '100%' }}>
                        <HtmlTooltip
                          title={
                            <Fragment>
                              <Typography color="inherit" fontWeight="bold">{feed.title}</Typography>
                              <Typography>by {feed.author}</Typography>
                              {feed.tags && <Fragment>
                                <Typography>Tags:
                                </Typography>
                                <Stack direction="row" spacing={1} maxWidth={220} overflow="auto" className='tagsContainer'>
                                  {renderTags(feed.tags)}
                                </Stack>
                              </Fragment>}
                            </Fragment>
                          }
                        >
                          <Stack direction="column">
                            <Typography style={{
                              width: '250px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              fontWeight: 'bold'
                            }}>{feed.title}</Typography>
                            <Typography>by {feed.author}</Typography>
                          </Stack>
                        </HtmlTooltip>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>

          <Box
            sx={{
              bgcolor: 'inherit',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm"  >
              <Pagination
                count={maxPage} sx={{ justifyContent: 'center', display: 'flex' }}
                page={itemPage} onChange={handlePagination}
                variant="outlined" shape="rounded" size="large" />
            </Container>
          </Box>

        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 3 }} component="footer">
        <Divider>
        </Divider>
        <Typography variant="h6" align="center" gutterBottom>
          Gallery
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Using the Flickr's API, and here we are~
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider >
  );
}