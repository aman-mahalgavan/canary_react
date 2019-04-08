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


