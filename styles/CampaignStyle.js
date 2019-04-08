import styled from "styled-components";


export const CampaignImageContainer = styled.div`
margin 0 auto;
position:relative;
background-image:url(${props => (props.bg ? props.bg : "https://static.thenounproject.com/png/1269202-200.png")});
background-position:center;
background-size:cover;
background-repeat:no-repeat;
width:100%;
height:400px;
& #file-input{
    visibility:hidden;
  width:0;
  height:0
}
label{
    cursor:pointer;
}
`;