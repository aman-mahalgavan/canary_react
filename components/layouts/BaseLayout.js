import Head from "next/head";
import Header from "../Header";
import { GlobalStyle } from "../../styles/GlobalStyle";

const BaseLayout = props => (
	<>
		<GlobalStyle bg="#fff" overflow={props.isHome ? "hidden" : undefined} />
		<Head>
			<link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" />
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous"></link>
			<title>Canary</title>
		</Head>
		<Header isHome={props.isHome} />
		{props.children}
	</>
);

export default BaseLayout;
