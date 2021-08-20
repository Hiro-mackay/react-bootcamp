import { Typography } from "@material-ui/core";
import useStyles from "./style";

export const HeaderTitle = () => {
  const styles = useStyles();
  
  return (
    <Typography className={styles.root} variant="subtitle1" component="h3">
      Organization Admin Settings: Dashboard overview [1/7]
    </Typography>
  );
};
