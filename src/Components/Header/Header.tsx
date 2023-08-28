import React, { Component } from "react";
import "./Header.css";
import { connect } from "react-redux";
import _Watch from "../Watch";
import logo from "../../Img/icon.svg";



class Header extends Component<{props: any, dispatch: any}, never>{
        render(){
        let {props, dispatch} = this.props;
        return  <div className="header">
                    <div className="header_img"><img src={logo} alt="" /></div>
                    <div className="header_watch"><_Watch/></div>
                    <div className="header_lang">
                        <select onChange={() => dispatch({type: "CHANGE_LANG"})} name="" id="">
                            <option value="ru">Ru</option>
                            <option value="en">En</option>
                        </select>
                    </div>
                </div>
    }
}

function mapStateToProps(props: any){
    return {
        props,
    }
}
function mapDispatchToProps(dispatch: any){
    return {
        dispatch
    }
};
let _Header = connect(mapStateToProps, mapDispatchToProps)(Header);
export default _Header;