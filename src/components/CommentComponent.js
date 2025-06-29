import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import apiIndex from "../resources/api-index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { weaponImgs } from "../resources/image-index";
import VoteComponent from "./VoteComponent";

const CommentComponent = ({brawlhallaId, token, playerData, onFocus}) => {
    const [receivedComments, setReceivedComments] = useState([]);
    const commentButtonRef = useRef(null);
    const {isAuthenticated, user} = useContext(AuthContext);
    const [commentText, setCommentText] = useState('');
    const navigate = useNavigate();
    const maxLength = 140;
    const voteType = ["UPVOTE", "DOWNVOTE"];
    useEffect(() => {
        getReceivedComments();
    }, [])
        const handleCommentChange = (e) => { 
          setCommentText(e.target.value);
        }
        console.log("comments", receivedComments);
    const  handleComment = async (e) => {
      if (!isAuthenticated) {
        return;
      }
      if ((e.key == "Enter" || e.target === commentButtonRef) && commentText) {
        e.preventDefault();

      try {
        let res = await axios.post(apiIndex.addComment(), 
          {
            userCommentedId: user.brawlhallaId,
            commentedToUserId:Number(brawlhallaId),
            text: commentText
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (res.status == 200) {
            console.log("comment made!");
            console.log(res.data);
        }
        setCommentText('');
        setReceivedComments([...receivedComments, res.data])


      } catch(err) {
        console.log(err);

      }
    }
    }

    const getReceivedComments = async () => {
      if (receivedComments.length > 0) return;

      try {
        const comments = (await axios.get(apiIndex.getReceivedComments(brawlhallaId)))
        setReceivedComments(comments.data);
      } catch(err) {
        console.log(err);
        setReceivedComments([]);
      }

    }
    const handleUpvote = async (commentId) => {
        if (!isAuthenticated) return;

        try {
            const upvoteRequest = await axios.post(apiIndex.upvoteComment(commentId), {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(upvoteRequest);
            if (upvoteRequest.data) {
                setReceivedComments(receivedComments.map(c =>  {
                  if (c.id === commentId)
                  c.commentVote = [...c.commentVote.filter(vote => vote.user.brawlhallaId !== user.brawlhallaId), upvoteRequest.data]
                return c;
                }))
            } else {
                setReceivedComments(receivedComments.map(c =>  {
                  if (c.id === commentId)
                  c.commentVote = c.commentVote.filter(vote => vote.user.brawlhallaId !== user.brawlhallaId)
                return c;
                }))              
              }
        } catch(err) {
            console.log(err);
            alert("Error upvoting comment");
        }
    }
    const checkCommentVoted = (comment, voteType) => {
      return comment.commentVote.find(c => c.user.brawlhallaId === user.brawlhallaId && c.voteType === voteType)
    }
    const handleDownvote = async (commentId) => {
                if (!isAuthenticated) return;

        try {
            const downvoteRequest = await axios.post(apiIndex.downvoteComment(commentId), {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(downvoteRequest);

            if (downvoteRequest.data) {
                setReceivedComments(receivedComments.map(c =>  {
                  if (c.id === commentId)
                  c.commentVote = [...c.commentVote.filter(vote => vote.user.brawlhallaId !== user.brawlhallaId), downvoteRequest.data]
                return c;
                }))
            } else {
                setReceivedComments(receivedComments.map(c =>  {
                  if (c.id === commentId)
                  c.commentVote = c.commentVote.filter(vote => vote.user.brawlhallaId !== user.brawlhallaId)
                return c;
                }))
              }
        } catch(err) {
            console.log(err);
            alert("Error downvoting comment");
        }
    }
    const getVotes = (votes, voteType) => {
      const filterVotes = votes.filter(v => v.voteType === voteType);
      return filterVotes.length;
    }

    return (
        <div className="">
            <div className="relative">
                <textarea onFocus={onFocus} type='' value={commentText} className="w-full h-full p-2" maxLength={140} rows={5} placeholder={`Write a comment about ${playerData.ranked.name}`} onKeyDown={e => handleComment(e)} onChange={e => handleCommentChange(e)}/>
                <p onClick={handleComment} ref={commentButtonRef} className="absolute bottom-[10px] right-[10px] hover:text-gray-400 font-[1000] cursor-pointer text-4xl">{'>'}</p>
                <p onClick={handleComment} ref={commentButtonRef} className="absolute bottom-[10px] left-[10px] font-[1000] text-sm text-4xl opacity-50">{maxLength - commentText.length} characters left...</p>

            </div>
            <div>
                {receivedComments.length > 0 && receivedComments.map(comment => {
                    return(
                     <div className="flex w-full" key={comment.id}>
                        <div className="cursor-pointer flex flex-col justify-around h-[100px]" onClick={() => navigate(`/profile/${comment.userCommentedId.brawlhallaId}`)}>
                            <img src={comment.userCommentedId.avatar} alt="profile pic"/>
                            {comment.userCommentedName}
                        </div>
                        <div className="w-full h-full">
                            <p className="pl-2 pt-2 pb-4">
                                {comment.text}
                            </p>
                            <div className="h-1/4 flex justify-start ml-2 w-1/4 gap-4">
                              <VoteComponent 
                              commentId={comment.id}
                              voteType={voteType[0]}
                              isVoted={checkCommentVoted(comment, voteType[0]) !== undefined}
                              normalImg={weaponImgs.bow}
                              inverseImg={weaponImgs.bow_inverted}
                              onClick={() => handleUpvote(comment.id)}
                              className="rotate-45 h-[40px] opacity-75"
                              >
                                {getVotes(comment.commentVote, voteType[0])}
                              </VoteComponent>
                                                            <VoteComponent 
                              commentId={comment.id}
                              voteType={voteType[1]}
                              isVoted={checkCommentVoted(comment, voteType[1]) !== undefined}
                              normalImg={weaponImgs.bow}
                              inverseImg={weaponImgs.bow_inverted}
                              onClick={() => handleDownvote(comment.id)}
                              className="rotate-45 h-[40px] opacity-75"
                              >
                                {getVotes(comment.commentVote, voteType[1])}
                              </VoteComponent>
                            </div>
                        </div>
                     </div>)
                })}
            </div>
        </div>
    )
}

export default CommentComponent;