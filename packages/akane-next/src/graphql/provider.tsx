"use client";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";
import { getSSRApolloClient } from "./client";

export const WithApolloProvider = ({ children }: React.PropsWithChildren) => {
	const apolloClient = getSSRApolloClient();

	return (
		<ApolloNextAppProvider makeClient={() => apolloClient}>
			{children}
		</ApolloNextAppProvider>
	);
};
