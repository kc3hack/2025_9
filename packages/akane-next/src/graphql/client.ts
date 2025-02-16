import { NormalizedCacheObject } from "@apollo/client";
import { ApolloClient as NextApolloClient, InMemoryCache as NextInMemoryCache } from "@apollo/experimental-nextjs-app-support";


let ssrApolloClient: NextApolloClient<NormalizedCacheObject> | null = null;

const getURI = () => {
  // TODO: 後で実際のエンドポイントに環境変数で切り替える
  const isSSR = typeof window === "undefined";
  return isSSR ? "http://localhost:3000/api/graphql" : "/api/graphql";
}

const createApolloClient = (initialState: NormalizedCacheObject|null = null) => {
  const cache = new NextInMemoryCache();
  if (initialState) {
    cache.restore(initialState);
  }

  return new NextApolloClient({
    uri: getURI(),
    cache: cache,
  });
}

const initApolloClient = (initialState: NormalizedCacheObject|null = null) => {
  const _client = ssrApolloClient ?? createApolloClient();
  if (initialState) {
    _client.cache.restore(initialState);
  }
  if (typeof window === "undefined") return _client;
  if (!ssrApolloClient) ssrApolloClient = _client;

  return _client;
}

export const getSSRApolloClient = () => initApolloClient();
