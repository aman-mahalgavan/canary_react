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
	.dropdown-wrapper{
		position:relative;
	}
	.navigation {
		img{
			width:40px;
			height:40px;
			border-radius:50%;
			margin-left:20px;
			cursor:pointer;
		
		}
		& .logout{
			transform:translateY(-20px);
		}
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




export const StyledDropdown = styled.div`
z-index:200;
position:absolute;
transform:translateX(-50%);
width:100px;
padding:10px 40px 50px 3px;
background:#fff;
box-shadow:3px 3px 7px rgba(0,0,0,0.4);
border-radius:5px;
`