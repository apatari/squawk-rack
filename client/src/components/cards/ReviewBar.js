import React from "react";
import { ProgressBar } from "react-bootstrap";

function ReviewBar({ avg }) {
    
    let color = "success"
    if (avg <= 1.5) {color = 'danger'}
    if (1.5<avg && avg<=3) {color = 'warning'}
    if (3<avg && avg<=4) {color = 'primary'}

    return (
        <div  className="mb-3 text-warning">
            <ProgressBar   variant={color} now={avg * 20} label={avg} style={{height: '11px'}}/>
        </div>
        
    )
}

export default ReviewBar