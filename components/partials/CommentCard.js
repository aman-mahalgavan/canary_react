import React from 'react';
import Styles from "../../styles/_index";

export default function CommentCard(props) {
    return (
        <Styles.CommentCardStyle>
            <img src={props.comment.avatar} />
            <h4>{props.comment.userName}</h4>
            <p>{props.comment.commentBody}</p>
        </Styles.CommentCardStyle>
    )
}
