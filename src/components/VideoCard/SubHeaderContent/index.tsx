import { Typography } from "@material-ui/core";

export type SubHeaderContentProps = {
  owner: string;
  views: number;
  created: Date;
};

export const SubHeaderContent = ({
  owner,
  views,
  created,
}: SubHeaderContentProps) => {
  return (
    <>
      <Typography variant="body2">{owner}</Typography>
      <Typography variant="body2">
        {views} views {new Date(created).toLocaleDateString()}
      </Typography>
    </>
  );
};
