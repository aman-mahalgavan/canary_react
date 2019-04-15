import styled from "styled-components";
import colors from "./colors";
import { FLX } from "./GlobalStyle";

export const StyledContainer = styled.div`
width:80%;
margin:0 auto;
box-sizing:border-box;
`;


export const TextAreaInputStyle = styled.textarea`
	width:100%;
	height:${props => (props.height ? props.height : "150px")};
    padding: 15px;
	background: #f5f5f5;
	border: none;
	border-radius:4px;
	resize:none;
	box-shadow: inset 0 1px 4px rgba(115, 143, 147, 0.25), 0 0 0 transparent;
	font-size:18px;
	color:${colors.Dark_2};
	&:focus {
		outline: none;
		box-shadow: inset 0 1px 4px rgba(115, 143, 147, 0.25), 0 0 0 transparent;
` 