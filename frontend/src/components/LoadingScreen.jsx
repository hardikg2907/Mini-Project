import React from "react";
import ReactLoading from 'react-loading';

export const LoadingScreen=()=>{
    return (
        <div className="loadingScreen">
            <ReactLoading type={'spin'} color={"#fdb120"} height={'3%'} width={'3%'} className="loadIcon"/>
            <h2> Loading...</h2>
        </div>
    );
}