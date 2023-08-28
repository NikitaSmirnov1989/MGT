import React, { Component } from "react";
import {connect} from 'react-redux';

class Watch extends React.Component<any, any>{
    render(){
        console.log(this.props);
        return  <div className="watch">
                    {this.props.props.time}
                </div>
    }
}


function mapStateToProps(props: any){
    return {
      props,
    };
  }
  function mapDispatchToProps(dispatch: any){
    return {
      dispatch,
    };
  }
const _Watch = connect(mapStateToProps, mapDispatchToProps)(Watch);
export default _Watch;