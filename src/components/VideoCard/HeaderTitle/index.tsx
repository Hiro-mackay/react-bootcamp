import { Typography } from "@material-ui/core";
import useStyles from "./style";

export type HeaderTitleProps = {
  title: string;
};

export const HeaderTitle = ({ title }: HeaderTitleProps) => {
  const styles = useStyles();

  return (
    <Typography className={styles.root} variant="subtitle1" component="h3">
      {
        // タイトルを表示
        title
      }
    </Typography>
  );
};
