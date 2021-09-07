import { useEffect, useState } from "react";
import { storage } from "../../utils/Firebase/config";
import { useVideosLazyQuery } from "../../utils/graphql/generated";

export const useVideoListFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const [fetch, { data: apolloVideosData, error: ApolloError }] =
    useVideosLazyQuery();

  useEffect(() => {}, [apolloVideosData]);
};
