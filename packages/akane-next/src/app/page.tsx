import { getSSRApolloClient } from "@/graphql/client";
import { gql } from "../../apollo/__generated__/client";

export const dynamic = "force-dynamic";

const query = gql(`
  query GetUser($id: ID!){
    user(id: $id) {
      id
      name
    }
  }
`);

const greetQuery = gql(`
  query Greet($name: String!){
    greet(name: $name) {
      text
      name
    }
  }
`);
export default async function Home() {
  const client = getSSRApolloClient();
  const { data, loading } = await client.query({
    query,
    variables: { id: "1" },
  });

  const { data: greetData } = await client.query({
    query: greetQuery,
    variables: { name: "John" },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>Hello, world!</h1>
      <div>{data?.user?.name}</div>
      <div>{greetData?.greet?.text}</div>
    </main>
  );
}
