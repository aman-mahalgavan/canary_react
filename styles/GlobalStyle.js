import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
	*{
		box-sizing:border-box;
		margin:0;
		padding:0;
	}

	body{
		background:${props => (props.bg ? props.bg : "#f3f7f7")};
		font-family: 'Roboto Slab', serif;
	}

	a{
		text-decoration:none;
	}

	li{
		list-style:none;
	}
`;

export const FLX = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin:${props => (props.mg ? props.mg : "0px 0px 0px 0px")}
`;
