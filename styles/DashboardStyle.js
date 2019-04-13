import styled from "styled-components";
import colors from "./colors";


export const DefaultDashboard = styled.div`
width:500px;
margin:10px auto;
`;


export const FormContainer = styled.form`
margin:40px auto;
width:60%;
text-align:center;
& h1{
    color:${colors.Dark_1};
    margin:10px 0 10px 0;
}
& p{
    color:${colors.Light_Grey_1};
    font-size:22px;
    margin-bottom:30px;
}
& .form-group {
    margin: 20px 0px;
}
`;
export const ImageContainer = styled.div`
margin:0 auto;
position:relative;
background-image:url(${props => (props.bg ? props.bg : "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png")});
background-position:center;
background-size:cover;
background-repeat:no-repeat;
width:150px;
height:150px;
border-radius:50%;
border:1px solid #f5f5f5;
& #file-input{
    visibility:hidden;
  width:0;
  height:0
}
label{
    cursor:pointer;
}
`;

export const ImageIcon = styled.i`
position:absolute;
top:50%;
right:-4%;
transform:translateX(10px);
font-size:20px;
color:${colors.Theme_green}
`

export const StyledIcon = styled.i`
padding: 18px;
background: ${colors.Theme_green};
color: white;
min-width: 50px;
text-align: center;
`;



export const SocialContainer = styled.div`
& .icon-input{
    margin: 20px 0px;
}

`

export const DashboardContainerStyle = styled.div`
	margin: 75px 20px;
	display: flex;
	flex-wrap: no-wrap;
	justify-content: space-evenly;
	flex:1;
`;

export const DashboardLeftContent = styled.div`
    
	.profile-box,
	.extra-info {
		padding: 15px 10px;
		border-radius: 20px;
        border: 1px solid ${colors.Light_Grey_2};
		background: #fff;
		font-size: 14px;
		span {
			display: inline-block;
			color: #a9a9a9;
		}
	}

	.profile-box {
        
		text-align: center;
		white-space:nowrap;
		img {
			width: 100px;
			height: 100px;
			border: 1px solid #f5f5f5;
			padding: 5px;
			margin-bottom: 5px;
		}
		span {
			margin-bottom: 25px;
			
		}
	}

	.extra-info {
		margin-top: 15px;
		white-space:no-wrap;
        text-align:center;
        h2{
            margin:0 0 20px 0;
        }
		span {
			overflow-wrap: break-word;
			margin-top: 10px;
			width:230px;	
			
			
		}
	}
`;


export const DashboardMainContent = styled.div`
;`

export const RequestMainContent = styled.div`
	.request-box {
		width: 500px;
		background: #fff;
		padding: 15px;
		margin: 15px 0;
		&:first-child {
			margin-top: 0;
		}
		hr {
			display: block;
			background: #a9a9a9;
			margin: 15px 0;
		}
		p {
			margin-top: 10px;
			color: #a9a9a9;

			b {
				color: green;
			}
		}
	}
`;


export const DashboardSwitchTab = styled.div`
	
	width: 100%;
	display: flex;
	margin-bottom:70px;
	background: #fff;
	align-items: center;
	
	cursor:pointer;
	a {
		flex: 1;
		padding: 15px;
		text-align: center;
		color:${colors.Light_Grey_1};
		font-size: 1.4em;
		&.active {
			background: ${colors.Theme_green_2};
			color:#fff;
		}
	}
`;


export const DashboardCampaignCardContainer = styled.div`
display:flex;
justify-content:space-between;
margin-bottom:40px;
img{
	width:170px;
	height:150px;
	flex:1;	
	margin-right:30px;
}
& .content{
	flex:2;
	h2{
		color:${colors.Dark_3};
		font-size:20px;
	}
}

`

export const DashboardRightStyle = styled.div`
width:${props => (props.space ? props.space : "0px")};

`;

