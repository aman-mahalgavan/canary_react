import styled from "styled-components";
import colors from "./colors";

export const ButtonStyle = styled.button`
	width: ${props => (props.width ? props.width : "100%")};
	padding: 15px;
	border: ${props => (props.border ? props.border : "2px solid transparent")};
	font-size:16px;
	font-weight:800;
	background: ${props => (props.bg ? props.bg : "#dcdcdc")};
	color: ${props => (props.color ? props.color : "#222")};
	box-shadow: ${props => (props.bs ? props.bs : "0 4px 12px 0 rgba(27,169,76,.5)")};
	margin:${props => (props.mg ? props.mg : "0")};
	cursor:pointer;
	:hover{
		color:${props => (props.bg ? props.bg : "#dcdcdc")};
		background: ${props => (props.color ? props.color : "#222")};
		border:2px solid ${colors.Theme_green_1};
		box-shadow:none;
	}
	:disabled{
		background:#dcdcdc;
		box-shadow:none;
		color:#fff;
		border:1px solid #dcdcdc;
	}
`;


export const AnchorButton = styled.button`
	text-align: center;
	width: ${props => (props.width ? props.width : "100%")};
	display: ${props => (props.display ? props.display : "inline-block")};
	border: ${props => (props.border ? props.border : "1px solid #009E74")};
	padding: 5px 10px;
	color: ${props => (props.color ? props.color : "#dcdcdc")};
	border-radius: ${prop => (prop.radius ? prop.radius : "25px")};
	margin: ${props => (props.mg ? props.mg : "0 auto")};
	background:${props => (props.bg ? props.bg : "#fff")};
	font-size:${props => (props.font ? props.font : "15px")};
	cursor:pointer;
	:hover{
		color:${props => (props.bg ? props.bg : "#fff")};
		background: ${props => (props.color ? props.color : "#222")};
		border: ${props => (props.border ? props.border : "1px solid #009E74")};
	}
	:focus{
		outline:red auto 0px;
	}
	:disabled{
		background:#dcdcdc;
		box-shadow:none;
		color:#fff;
		border:1px solid #dcdcdc;
	}
`;




