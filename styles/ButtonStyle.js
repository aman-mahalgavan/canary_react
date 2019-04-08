import styled from "styled-components";

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



