import Head from "next/head";
import Header from "../Header";
import { GlobalStyle } from "../../styles/GlobalStyle";

const BaseLayout = props => (
	<>
		<GlobalStyle />
		<Head>
			<link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" />
			<title>Canary</title>
		</Head>
		<Header />
		{props.children}
	</>
);

export default BaseLayout;
