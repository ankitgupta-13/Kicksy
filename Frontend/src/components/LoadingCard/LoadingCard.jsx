import Skeleton from "@mui/material/Skeleton";
import MediaQuery from "react-responsive";

const LoadingCard = () => {
  return (
    <div>
      <div>
        <MediaQuery minWidth={430}>
          <Skeleton variant="wave" width={400} height={400} />
        </MediaQuery>
        <MediaQuery maxWidth={430}>
          <Skeleton variant="wave" width={100} height={100} />
        </MediaQuery>
      </div>
    </div>
  );
};

export default LoadingCard;
