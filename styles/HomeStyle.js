import colors from "./colors";
import styled from "styled-components";


export const HomePage = styled.section`
height:100vh;
width:100%;
background:url("/images/Home2.jpg");
background-size:cover;
background-repeat:no-repeat;
background-position:center;
position:relative;

top:-100px;
overflow:hidden;
.content{
    width:900px;
    position:absolute;
    
    top:30%;
    left:5%;
    h1{
        color:#515151;
        font-size:60px;
        font-weight:200;
        margin-bottom:20px;
    }
    p{
        display:block;
        width:600px;
        color:${colors.Light_Grey_1};
    }
}
`



