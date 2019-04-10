import styled from "styled-components";
import colors from "./colors";


export const ExploreContainerStyle = styled.div`
    margin: 75px 50px;
	display: flex;
	flex-wrap:wrap;
	justify-content: space-between;
	flex:1;
`


export const CampaignCardStyle = styled.div`
flex-basis:400px;
box-shadow:1px 1px 7px rgba(0,0,0,0.2);

margin-bottom:30px;
cursor:pointer;
transition:transform 0.2s , box-shadow 0.2s;

&:hover{
    box-shadow:4px 4px 10px rgba(0,0,0,0.2);
    transform:translateY(-10px);
}
& img{
    height:200px;
    width:100%;
    object-fit: cover;
    overflow: hidden;
    margin-bottom:15px;
}


`

export const CampaignCardContent = styled.div`
padding:0 10px 30px 10px;


h3{
    color:${colors.Dark_3};
    margin-bottom:14px;
    }
    p{
        color:${colors.Light_Grey_1};
        margin-bottom:10px;
    }
    span{
        color:${colors.Light_Grey_2};
        display:block;
        font-size:12px;
    }
   
    & .goal{
        font-size:18px;
        color:${colors.Theme_green_2};
        
        margin:20px 0 10px 0;
    }
    & .raised{
        color:${colors.Light_Grey_1};
        font-size:14px;
    }
`

export const ProgressBar = styled.span`
width:${props => (props.width ? props.width : "50%")};
height: 1px;
background: ${colors.Theme_green_2};
margin-top:20px;
`