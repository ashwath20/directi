import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link } from 'react-router-dom';
import { Row, Col,Image } from 'react-bootstrap';

import {Button} from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: 500,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function TitlebarGridList(props) {
  const classes = useStyles();
  console.log(props.images);
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={8}>
        {
          props.images.map((tile) => (

            <GridListTile key={tile.src} cols={tile.cols || 1} onClick={() => {
              console.log("clecked")
              // window.open("/item/" + tile.media_type + "/" + tile.id, "_blank");
            }}>
              <Link to={"/item/" + tile.media_type + "/" + tile.id}>
                <Image style={{width:180,height:180}}src={"https://image.tmdb.org/t/p/w500/" + tile.poster_path} alt={tile.title} />
              </Link>
              <GridListTileBar

                title={tile.title ? tile.title : tile.original_name}

              />
            </GridListTile>
          ))}
        <Row style={{ width: "100%", marginTop:10 ,marginLeft:500 }}>
          <Col style={{ width: "100%", alignItems: 'center' }}>
            <Button style={{ marginLeft: 10, alignItems: 'center',justifyContent:'center'  }} onClick={() => {
              console.log(props);
              props.cbHandleMovieClick();
            }}>Load more</Button>
          </Col>
        </Row>
      </GridList>
    </div>

  );
}