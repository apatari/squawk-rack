import React from "react";
import { ProgressBar } from "react-bootstrap";

function ReviewBar({ avg, ht }) {
    
    let color = "success"
    if (avg <= 1.5) {color = 'danger'}
    if (1.5<avg && avg<=3) {color = 'warning'}
    if (3<avg && avg<=4) {color = 'primary'}

    return (
        <div  className=" text-warning my-auto">
            <ProgressBar   variant={color} now={avg * 20} label={avg} style={{height: ht}}/>
        </div>
        
    )
}

export default ReviewBar