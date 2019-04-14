import React from 'react';
import Styles from "../../styles/_index";
import { weiToEther } from "../../utils/etherUtils";

export default function RequestCard(props) {
    return (
        <div className="request-box">
            <div className="content">
                <h4>{props.request[0]}</h4>
                <p>Amount : <span>{weiToEther(props.request[1])} ETH</span></p>
                <p>To : <span>{props.request[2]}</span></p>
            </div>
            <hr />
            <Styles.AnchorButton
                display="block"
                width="50%"
                radius="5px"
                color="#009E74"
                mg="15px auto"
                font="25px">
                Approve
			</Styles.AnchorButton>
        </div>
    )
}
