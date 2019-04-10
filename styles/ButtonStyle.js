import styled from "styled-components";
import colors from "./colors";

export const ButtonStyle = styled.button`
	width: ${props => (props.width ? props.width : "100%")};
	padding: 15px;
	border: ${props => (props.border ? props.border : "none")};
	font-size:16px;
	font-weight:800;
	background: ${props => (props.bg ? props.bg : "#dcdcdc")};
	color: ${props => (props.color ? props.color : "#222")};
	box-shadow: ${props => (props.bs ? props.bs : "0 4px 12px 0 rgba(27,169,76,.5)")};
	margin:${props => (props.mg ? props.mg : "0")};
	cursor:pointer;
	
`;


export const AnchorButton = styled.a`
	text-align: center;
	width: ${props => (props.width ? props.width : "100%")};
	display: ${props => (props.display ? props.display : "inline-block")};
	border: 1px solid ${colors.Theme_green};
	padding: 5px 10px;
	color: ${props => (props.color ? props.color : "#dcdcdc")};
	border-radius: ${prop => (prop.radius ? prop.radius : "25px")};
	margin: 0 auto;
`;




