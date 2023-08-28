import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import './App.css';
import _Header from './Components/Header';
import _Main from './Components/Main';
import {connect} from 'react-redux';


class App extends React.Component<any, any>{
  request(dispatch: (arg: {type: string, [key: string] : any}) => void){
    dispatch({
      type: "LOADING_START"
    });
    fetch("data.json")
      .then(res => {
        return res.json();
      })
      .then(comments => {
        let {lang} = this.props.props;
        let {limit} = this.props.props;
        setTimeout(() => {
          dispatch({
            type: "LOADING_DATA",
            payload: comments[lang],
            countPage: Math.ceil(Object.keys(comments[lang]).length / limit),
            currentPage: 0,
          })
        }, 2000)
      })
      .catch(err => {
        dispatch({
          type: "LOADING_ERROR"
        })
      })
  }
  componentDidMount(): void {
    this.request(this.props.dispatch);
    setInterval(() => {
      let timer = this.props.dispatch({
        type: "CHANGE_TIME",
      });
    }, 1000);
  }
  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
    if(this.props.props.lang !== prevProps.props.lang){
      this.request(this.props.dispatch);
    }
    
  }
  render(){
    const {props, dispatch} = this.props;
    return (
      <div className="app">
        <_Header/>
        {props.loading && <div className="app_loading">Загрузка началась.....</div>}
        {props.error && <div className="app_error">Возникла ошибка</div>}
        {props.comments && <_Main/>}
      </div>
    );
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
const _App = connect(mapStateToProps, mapDispatchToProps)(App);

export default _App;
