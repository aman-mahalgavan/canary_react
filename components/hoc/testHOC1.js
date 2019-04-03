import React,{Component} from "react";





export default (Page)=>{
	return class HOC1 extends Component{


		static async getInitialProps(ctx){
			let testVar = "This is from the first HOC";
			ctx.testVar=testVar;
		
			 if (Page.getInitialProps) {
                    return { ...await Page.getInitialProps(ctx) };
                }else{
                	return {}
                }

		}

		render(){
			return <Page {...this.props}/>
				
				
			
		}
	}
}