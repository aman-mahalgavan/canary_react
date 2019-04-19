import styled from "styled-components";
import colors from "./colors";


export const CampaignFormImageContainer = styled.div`
margin 0 auto;
position:relative;
background-image:url(${props => (props.bg ? props.bg : "https://smartagripost.com/wp-content/themes/smartagripost/assets/images/placeholder.png")});
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





export const CampaignContainer = styled.div`
	width:1200px;
	background: #fff;
	margin: 20px auto;
	padding: 15px;
`;
export const CampaignHeader = styled.div`
	display: flex;
	.user-meta {
    flex-basis:300px;
		img {
			width: 90px;
			height: 75px;
      border: 1px solid #dcdcdc;
      border-radius:10px;
			padding: 3px;
		}
		span,
		b {
      font-size: 13px;
      
			display: block;
		}
		span {
			color: ${colors.Light_Grey_2};
		}
	}
	.agenda {
		margin-left: 55px;
		h2 {
      margin-bottom: 15px;
      color:${colors.Dark_3}
		}
		p {
			width: 90%;
			color: ${colors.Light_Grey_1};
		}
	}
`;

export const CampaignMiddleContent = styled.div`
	margin-top: 25px;
	#main-content {
		display: flex;
		img {
			flex-basis: 800px;
			height: 500px;
		}
		#info {
			margin-left: 50px;
			
			color: #a9a9a9;
			
			span {
				display: block;
        margin-bottom: 15px;
        color:${colors.Theme_green_2};
        font-weight:400;
        font-size:30px;
				> b {
          display: block;
          font-size:12px;
          color:${colors.Light_Grey_1};
				}
			}
		}
	}
	
	
`;

export const CampaignBottomContent = styled.div`
nav {
  margin-top: 25px;
  border-top: 1px solid #dcdcdc;
  border-bottom: 1px solid #dcdcdc;
  a {
    display: inline-block;
    padding: 15px;
    color: #222;
    margin: 0 5px;
    &.active {
      font-weight: bold;
      border-bottom: 5px solid #009E74;
    }
  }
}

.campaign-about {
display: flex;
justify-content: space-between;
width:95%;

form {
  flex-basis: 400px;
  height:160px;
  margin-top: 25px;
  
  border: 1px solid #dcdcdc;
  padding: 10px;
  label {
    display: block;
    text-align: center;
    padding: 10px;
  }
  .input-group {
    position: relative;
    margin-bottom: 10px;
    input {
      width: 100%;
      padding: 10px;
      padding-right: 55px;
      border: 1px solid #dcdcdc;
      &:focus {
        outline: none;
      }
    }
    span {
      position: absolute;
      background: #dcdcdc;
      top: 0;
      right: 0;
      height: 100%;
      padding: 10px;
    }
  }
}
}


.campaign-comment{
  
  .logged-out{
    background:#f5f5f5;
    width:80%;
    padding:15px;
    margin:20px auto;
    color:${colors.Dark_3};
  }
  .comment-form{
    margin:40px auto;
    width:80%;
    
  }
  .comments-display{
    background: #f5f5f5;
    width:80%;
    margin:0 auto;
    padding:20px;
  }

}


.campaign-update{
  
  width:40%;
  margin:0 auto;
  margin-top:40px;
  .bottom{
    
    height:150px;
    background:#034752;
    margin:20px auto;
    color:#fff;
    position:relative;
    h4{
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      font-weight:400;
      font-size:20px;
    }
  }
}

.campaign-faq{
  display:flex;

  .faq-left{
    flex:2;
    h4{
      font-size:20px;
      margin:15px 5px 30px 5px;
    }
    
  }

  .faq-right{
    flex:1;
    display:flex;
    .logged-out{
      background:#f5f5f5;
    height:50px;
    padding:15px;
    margin:20px auto;
    color:${colors.Dark_3};
    }
  }
}
`


export const CommentCardStyle = styled.div`
min-height:100px;
border:1px solid ${colors.Light_Grey_1};
padding:15px;
background:#fff;
margin-bottom:20px;
border-radius:5px;


img{
  float:left;
  height:40px;
  border-radius:50%
}
h4{
  font-size:14px;
  margin:5px 0 0 50px;
  color:${colors.Light_Grey_1};
}
p{
  font-size:18px;
  margin-top:25px;
  color:${colors.Dark_3};
}
`;

export const CampaignInfo = styled.div`
	margin: 25px 15px;
	color:${colors.Light_Grey_1};
  flex-basis: 600px;
  line-height: 1.5;
	h3 {
    margin-bottom: 15px;
    
	}
`;


export const FaqCard = styled.div`

padding:15px;
margin:20px 0;
border:1px solid ${colors.Light_Grey_1};
cursor:pointer;

.faq-container{
  display:flex;
  justify-content:space-between;
}
h3{
  font-weight:200;
}
i{
  margin-top:5px;
  color:${colors.Theme_green_2};
}
:hover{
  background:rgba(220,220,220,0.4);
}
`;


export const UpdateCardStyle = styled.div`
text-align:center;
padding:15px;
margin:20px 0;
border:1px solid ${colors.Light_Grey_1};
cursor:pointer;
a{
  color:${colors.Dark_3};
}
:hover{
  background:rgba(27,169,76,0.4);
}
span{
  font-weight:200;
  font-size:12px;
  :hover{
    background:${colors.Theme_green};
  }
}
h4{
  font-weight:200;
  
  
}

`;


export const VerticalDivider = styled.div`
border-left: 4px solid ${colors.Light_Grey_2};
border-radius:5px;
  height: 180px;
  width:20px;
  display:inline-block;
  margin:25px 0 0 30px;
`;


export const UpdateContainer = styled.div`
width:60%;
margin:50px auto;
box-sizing:border-box;
text-align:center;
h2{
  color:${colors.Dark_3};
  font-size:50px;
  margin-bottom:30px;
}
span{
  display:block;
  color:${colors.Light_Grey_1};
  margin-bottom:10px;
}
img{
  
  width:60%;
  margin:0 auto;
  object-fit:contain;
}
p{
  color:${colors.Light_Grey_1};
  margin-top:30px;
  line-height:30px;
}
`