import React from "react";

const AlertMessage = ({message,error}) => {
    const alertStyle = {
        color:'green',
        fontStyle:'italic',
        fontSize:16,
        borderRadius:5,
        borderStyle:'solid',
        borderColor:'green',
        padding:10,
        margin:10
    }

    if (error){
        alertStyle.color='red'
        alertStyle.borderColor='red'
    }

    if (message){
        return(
            <div style={alertStyle}>
                {message}
            </div>
        )
    }

    else{
        return(
            <>
            </>
        )
    }
}

export default AlertMessage