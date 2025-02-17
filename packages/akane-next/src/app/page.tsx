import { getSSRApolloClient } from "@/graphql/client";
import { gql } from "../../apollo/__generated__/client";

const query = gql(`
  query GetUser($id: ID!){
    user(id: $id) {
      id
      name
    }
  }

`)

export default async function Home() {
  const { data } = await getSSRApolloClient().query({
    query,
    variables: { id: '1' },
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  })

  return (
    <main>
      <h1>Hello, world!</h1>
      <div>
        {data?.user?.name}
      </div>
    </main>
  );
}
