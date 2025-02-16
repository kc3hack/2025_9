import { getSSRApolloClient } from "@/graphql/client";
import { gql } from "../../apollo/__generated__/client";

export const dynamic = 'force-dynamic'

const query = gql(`
  query GetUser($id: ID!){
    user(id: $id) {
      id
      name
    }
  }

`)


export default async function Home() {
  const { data, loading } = await getSSRApolloClient().query({
    query,
    variables: { id: '1' }
  })

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <main>
      <h1>Hello, world!</h1>
      <div>
        {data?.user?.name}
      </div>
    </main>
  );
}
