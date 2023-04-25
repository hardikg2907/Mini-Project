import React from "react";
import ReactLoading from 'react-loading';

export const LoadingScreen=()=>{
    return (
        <div className="loadingScreen">
            <ReactLoading type={'spin'} color={"#fdb120"} height={'5%'} width={'5%'} className="loadIcon"/>
            <h2> Loading...</h2>
        </div>
    );
}