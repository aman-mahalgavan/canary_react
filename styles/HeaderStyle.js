import styled from "styled-components";
import colors from "./colors";

export const HeaderStyle = styled.header`
	padding: 25px 35px;
	max-height: 75px;
	display: flex;
	align-items: center;
	background: #fff;
	justify-content: space-between;
	border-bottom: 1px solid #f5f5f5;
	box-shadow: 0px 2px 10px #888888;
	.logo {
		font-size: 1.7em;
		font-weight: 600;
		color: rgba(0, 0, 0, 0.7);
	}
	.navigation {
		a {
			margin: 0 15px;
			color: ${colors.Light_Grey_1};
			cursor:pointer;
			&.box {
				border: 1px solid ${colors.Light_Grey_1};
				padding: 5px 10px;
				&:hover{
					color:#b7c9cc;
					border:1px solid #b7c9cc;
				}
			}
			&:hover{
				color:#b7c9cc;
			}
		}
	}
`;
