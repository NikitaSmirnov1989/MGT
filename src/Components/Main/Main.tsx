import React, { Component } from "react";
import {connect} from 'react-redux';
import "./Main.css"

class Main extends Component<any, any>{
    changeCurrentPage(param: React.MouseEvent){
        let currentPage = (param.target as HTMLLIElement).getAttribute("data-count") as unknown as number;     
        this.props.dispatch({
            type: "CHANGE_PAGE",
            currentPage: +currentPage,
        });
    }
    renderPagimnationPage(count: number) : JSX.Element{
        return  <ul className="main_pagination_pages">
                    {Array(count).fill(null).map((value, i) => {
                        return <li 
                                    className="main_pagination_page" 
                                    key={i}
                                    data-count = {i}
                                    onClick = {(e) => this.changeCurrentPage(e)}
                                    style={{border: this.props.props.currentPage === i ? "1px solid #d9d9d9" : ""}}
                                    >{i + 1}</li>
                    })}
                </ul>
    }
    renderAlternativePagination(count: number) : JSX.Element{
        if(count < 6){
            return  <ul className="main_pagination_pages">
                        {Array(count).fill(null).map((value, i) => {
                            return <li 
                                        className="main_pagination_page" 
                                        key={i}
                                        data-count = {i}
                                        onClick = {(e) => this.changeCurrentPage(e)}
                                        style={{border: this.props.props.currentPage === i ? "1px solid #d9d9d9" : ""}}
                                        >{i + 1}</li>
                        })}
                    </ul>
        }
        let min: number = 0;
        let max = count - 1;
        let current = this.props.props.currentPage;
        let prevCurrent: number = current - 1;
        let nextCurren: number = current + 1;
        let renderingPagesArr: number[] = [];
        if(current === min){
            renderingPagesArr = [current, nextCurren, null, max];
        }else if(current === max){
            renderingPagesArr = [min, null, prevCurrent, current];
        }else if(current === min + 1){
            renderingPagesArr = [prevCurrent, current, nextCurren, null, max];
        }else if(current === max - 1){
            renderingPagesArr = [min, null, prevCurrent, current, nextCurren];
        }else{
            renderingPagesArr = [min, null, prevCurrent, current, nextCurren, null,  max];
        };
        return  <ul className="main_pagination_pages">
                        {renderingPagesArr.map((value, i) => {
                            return <li 
                                        className="main_pagination_page" 
                                        key={i}
                                        data-count = {value}
                                        onClick = {(e) => value !== null ? this.changeCurrentPage(e) : null}
                                        style={{border: this.props.props.currentPage === value ? "1px solid #d9d9d9" : ""}}
                                        >{value !== null ? value + 1 : "..."}</li>
                        })}
                    </ul>
        

        
        

    }
    renderComments(comments: {[key: string] : any}, currentPage: number) : any{
        let {limit} = this.props.props; 
        let startIndex: number = currentPage *limit;
        let endIndex: number = startIndex + limit;
        let keys = Object.keys(comments);
        return  <div className="main_comments">
                    {keys.slice(startIndex, endIndex).map((com, i) => {
                        const {name, date, review} = comments[com];
                        let [firstName, secondName] = name.split(" ");
                        return  <div className="main_comment" key={i}>
                                    <div className="main_comment_name">{firstName} {secondName === undefined ? "" : `${secondName[0]}.`}</div>
                                    <div className="main_comment_review">{review}</div>
                                    <div className="main_comment_date">{date}</div>
                                </div>
                    })}
                </div>;
    }
    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
        if(this.props.props.currentPage === nextProps.props.currentPage){
            return false;
        };
        return true;
        
    }
    render(){
        console.log("MAIN");
        return  <div className="main">
                    {this.renderAlternativePagination(this.props.props.countPage)}
                    {this.renderComments(this.props.props.comments, this.props.props.currentPage)}
                    
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

const _Main = connect(mapStateToProps, mapDispatchToProps)(Main);

export default _Main;
