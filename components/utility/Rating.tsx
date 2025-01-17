import React from "react";
import { FaStar } from "react-icons/fa";


function Rating({rating}:{rating:any}) {
    
  return (
    <div className="flex mt-2">
      {Array(parseInt(rating[0]))
        .fill(1)
        .map((_,index) => (
          <FaStar className="text-orange-400" key={index} />
        ))}
        {rating && <span className="ml-2 text-sm">{`(${rating[1]})`}</span>}
    </div>
  );
}

export default Rating;
