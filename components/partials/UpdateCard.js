import React from 'react';
import Styles from "../../styles/_index";
import moment from "moment";
import { Link } from "../../routes";

export default function UpdateCard(props) {
    return (
        <Styles.UpdateCardStyle>
            <Link route={"/campaign/" + props.address + "/updates/" + props.update._id}>

                <a>
                    <h3>#Update {props.index}</h3>
                    <span>{moment(props.update.date).format(" MMMM Do YYYY")}</span>
                    <h4 >{props.update.heading}</h4>
                </a>
            </Link>
        </Styles.UpdateCardStyle>
    )
}
