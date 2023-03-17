import React from "react"


export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#15616d" : "white"
    }
    return (
        <div style={styles} onClick={props.holdDie} className="die-container">
            <h2>{props.number}</h2>
        </div>
    )
}