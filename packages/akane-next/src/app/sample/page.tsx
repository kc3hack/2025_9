"use client";

import { useQuery } from "@apollo/client";
import { gql } from "../../../apollo/__generated__/client";

const query = gql(`
  query GetUser($id: ID!){
    user(id: $id) {
      id
      name
    }
  }
`);

export default function SamplePage() {
  const { data, loading } = useQuery(query, {
    variables: { id: '1' }
  });

  if (loading) {
    return <div>Loading...</div>;
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
