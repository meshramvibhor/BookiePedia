import React from 'react'

const Sample = () => {
    const childStyle = {
        height: "10vh",
        width: "20vw",
        border: "2px solid grey",
        flex: "0 0 33.333333%"
        
    }
    return (
        <div style={{ display: "flex", flexWrap: "wrap", paddingLeft: "0", border: "2px solid blue", width: "80vw", height: "60vh" }}>
            <div className="child" style={childStyle}> ff</div>
            <div className="child" style={childStyle}></div>
            <div className="child" style={childStyle}></div>
            <div className="child" style={childStyle}></div>
            <div className="child" style={childStyle}></div>
            <div className="child" style={childStyle}></div>
            <div className="child" style={childStyle}></div>
            <div className="child" style={childStyle}></div></div>
    )
}

export default Sample