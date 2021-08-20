import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import useStyles from "./style";

export const Sidebar = () => {
  const styles = useStyles();

  return (
    <List className={styles.root} component="nav">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="ホーム" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <WhatshotIcon />
        </ListItemIcon>
        <ListItemText primary="トレンド" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SubscriptionsIcon />
        </ListItemIcon>
        <ListItemText primary="登録チャンネル" />
      </ListItem>
    </List>
  );
};
