import React,{Component} from "react";





export default (Page)=>{
	return class HOC2 extends Component{


		static async getInitialProps(ctx){
			let user={};
			console.log(ctx.testVar?ctx.testVar:"OOps Wrong Order");
				ctx.store.dispatch({
				type:"SETCURRENTUSER",
				user
			})
			 if (Page.getInitialProps) {
                    return { ...await Page.getInitialProps(ctx) };
                }else{
                	return {};
                }

		}

		render(){
			return <Page {...this.props}/>
			
				
				
		}
	}
}