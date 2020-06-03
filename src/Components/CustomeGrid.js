import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { OverlayTrigger,Popover, Button ,Nav,Image,Form,FormControl,Card,Badge} from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  root: {
      width:'100%',
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

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TitlebarGridList(props) {
  const classes = useStyles();
console.log(props.images);
  return (
    <div className={classes.root}>
    <GridList cellHeight={180} className={classes.gridList} cols={8}>
      {props.images.map((tile) => (
        <GridListTile key={tile.src} cols={tile.cols || 1} onClick={()=>{console.log("clecked")
      window.open("/item/"+tile.media_type+"/"+tile.id, "_blank");        }}>
          <img src={"https://image.tmdb.org/t/p/w500/"+tile.poster_path} alt={tile.title} />
          <GridListTileBar
          
              title={tile.title?tile.title:tile.original_name}
             
              actionIcon={
                <OverlayTrigger trigger="click" placement="right" overlay={ <Popover id="popover-basic">
                <Popover.Title as="h3">Details</Popover.Title>
                <Popover.Content>
              desc
                </Popover.Content>
              </Popover>}>
    <InfoIcon/>
  </OverlayTrigger>
              }
            />
        </GridListTile>
       
      ))}
    </GridList>
  </div>

  );
}
const popover = e=>(
    <Popover id="popover-basic">
      <Popover.Title as="h3">Popover right</Popover.Title>
      <Popover.Content>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Content>
    </Popover>
  );