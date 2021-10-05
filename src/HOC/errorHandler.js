import React, {Component} from "react";
import Backdrop from "../Component/Bakcdrop/Backdrop";
import Modal from "../Component/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) =>{
    return class extends Component{
      state = {
          error: null
      }
        componentWillMount () {
          axios.interceptors.response.use(res=>res, err=>{
            this.setState({
                 error: err             })
          });
          axios.interceptors.request.use(req=>{
            this.setState({
                error: null
            })
            return req;
         });
       }
       dataHider = () =>{
           this.setState({error: null});
       }
        // let message = null;

        render(){
        let message = null;
        
        if(this.state.error){
            message = 
            <div>
                <Modal show={this.state.error}>
            <p>{this.state.error.message}</p>
            </Modal>
            <Backdrop show={this.state.error} clicked={this.dataHider}/>
            </div>
        }
            return(
               <div>
                {message}
        <WrappedComponent {...this.props}/>
                </div>
            )
        }
    }
}

export default withErrorHandler;