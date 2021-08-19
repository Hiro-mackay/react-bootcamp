import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Divider,
} from "@material-ui/core";
import { UploadForm } from "./UploadForm";
import { VideoSelect } from "./VideoSelector";
import useStyles from "./style";

export const Upload = () => {
  const styles = useStyles();
  return (
    // ダイアログコンポーネント
    // fullWidth: trueの場合、画面いっぱいにダイアログを表示
    // maxWidth: ダイアログの横幅の最大値を指定。指定できるプロパティはこちら(https://material-ui.com/api/dialog/)
    // open: ダイアログを表示するか。今回はURLを開いている際は、表示し続けるのでtrueを指定
    <Dialog fullWidth={true} maxWidth="md" open={true}>
      {/* タイトル用コンポーネント */}
      <DialogTitle>動画のアップロード</DialogTitle>

      <Divider />

      {/* 
        コンテント用
        2カラムのレイアウトを実装する  
      */}
      <DialogContent className={styles.body}>
        <Grid container spacing={4}>
          <Grid xs item>
            <VideoSelect />
          </Grid>

          {/* 
            真ん中に縦線を挿入
          */}
          <Divider orientation="vertical" flexItem />
          <Grid xs item>
            <UploadForm />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
