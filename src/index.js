import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
	ApolloClient,
	ApolloProvider,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";

import "./index.css";
import App from "./App";
<<<<<<< HEAD
const link = new HttpLink({
	uri: String(process.env.REACT_APP_GRAPHQL_ENDPOINT),
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	},
});
const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: link,
});
=======

const link = new HttpLink({
	uri: String(process.env.REACT_APP_GRAPHQL_ENDPOINT),
	headers: {
	  "Access-Control-Allow-Origin": "*",
	  "Content-Type": "application/json"
	}
  });
  const client = new ApolloClient({
	link: link,
	cache: new InMemoryCache({
	  addTypename: false,
	}),
  });
>>>>>>> 369dde3b8efd65faebe7ad816a55419a29f7790c
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ApolloProvider client={client}>
		<BrowserRouter>
			<Routes>
				<Route path='/*' element={<App />} />
			</Routes>
		</BrowserRouter>
	</ApolloProvider>
);
