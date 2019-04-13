import React from 'react';
import { Link } from "../../routes";

export default function CampaignNav(props) {
    return (
        <nav>
            <Link route={"/campaign/" + props.address}>
                <a className={props.campaign ? "active" : null} href="">Campaign</a>
            </Link>
            <Link route={"/campaign/" + props.address + "/faqs"}>
                <a className={props.faq ? "active" : null} href="">FAQ</a>
            </Link>
            <Link route={"/campaign/" + props.address + "/updates"}>
                <a className={props.update ? "active" : null} href="">Updates</a>
            </Link>
            <Link route={"/campaign/" + props.address + "/comments"}>
                <a className={props.comment ? "active" : null} href="">Comments</a>
            </Link>
        </nav>
    )
}



