import styled, { css } from "styled-components";
import colors from "./colors";

const authForm = css`
	position: relative;
	width:400px;
	margin: 105px auto;
	background: #fff;
	padding: 75px 15px 15px;
	box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
	
`;

export const SignInForm = styled.form`
	${authForm}
	& .form-group {
		margin: 10px 0px;
	}
	
`;

export const InputStyle = styled.input`
	
	width: 100%;
	padding: 15px;
	background: #f5f5f5;
	border: none;
	box-shadow: inset 0 1px 4px rgba(115, 143, 147, 0.25), 0 0 0 transparent;
	font-size:18px;
	color:${colors.Dark_2};
	&:focus {
		outline: none;
		box-shadow: inset 0 1px 4px rgba(115, 143, 147, 0.25), 0 0 0 transparent;
	}
	
`;

export const StyledLabel = styled.label`
color:${props => (props.color ? props.color : "red")}`;




export const SwitchTab = styled.div`
	position: absolute;
	width: 100%;
	display: flex;
	top: 0;
	left: 0;
	background: #f5f5f5;
	align-items: center;
	box-shadow: inset 0 1px 4px rgba(115, 143, 147, 0.2);
	cursor:pointer;
	a {
		flex: 1;
		padding: 15px;
		text-align: center;
		color:${colors.Light_Grey_1};
		font-size: 1.4em;
		&.active {
			background: #fff;
			color:${colors.Dark_1};
		}
	}
`;
