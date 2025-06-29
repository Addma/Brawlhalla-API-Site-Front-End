/*
<div className="flex items-center gap-2" ><img src={checkCommentVoted(comment, voteType[0]) === undefined ? weaponImgs.bow : weaponImgs.bow_inverted} 
onClick={e => handleUpvote(comment.id)} alt="upvote" className="rotate-45 h-[40px] opacity-75"/>{getVotes(comment.commentVote, voteType[0])}</div>
<div className="flex items-center gap-2" ><img src={checkCommentVoted(comment, voteType[1]) === undefined ? weaponImgs.bow : weaponImgs.bow_inverted} 
onClick={e => handleDownvote(comment.id)} alt="downvote" className="-rotate-[135deg] h-[40px] opacity-75"/>{getVotes(comment.commentVote, voteType[1]) * -1}</div>
*/

import { useState } from "react";

const VoteComponent = (  {commentId, 
  voteType, 
  isVoted, 
  normalImg, 
  inverseImg, 
  onClick, 
  className,
  children}) => {
    
      const [isHovered, setIsHovered] = useState(false);
  
  const getImageSrc = () => {
    console.log("SRC");
    if (isHovered || isVoted) return inverseImg;
    return normalImg
  };

  return (
    <div className="flex items-center gap-2">
      <img 
        src={isHovered || isVoted ? inverseImg : normalImg}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        alt={voteType}
        className={className}
      />
      {children}
    </div>
  );

}

export default VoteComponent;