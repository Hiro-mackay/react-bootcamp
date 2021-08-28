import { useNavigate } from "react-router-dom";
import { signout as fireSignout } from "../../../utils/Firebase/signout";
import { useAuthHelper } from "../useAuthHelper";

export const useSignout = () => {
  const navigate = useNavigate();

  const signout = async () => {
    await fireSignout();

    navigate("/");
  };

  return {
    signout,
  };
};
