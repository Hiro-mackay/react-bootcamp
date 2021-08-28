import { atom } from "recoil";
import { Users } from "../../utils/graphql/generated";

export type GlobalUserType =
  | Pick<
      Users,
      | "id"
      | "name"
      | "email"
      | "profile_photo_url"
      | "created_at"
      | "updated_at"
    >
  | undefined;

export const GlobalUser = atom<GlobalUserType>({
  key: "GlobalUser",
  default: undefined,
});
