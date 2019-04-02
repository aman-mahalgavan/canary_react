import React from "react";
import { Link } from "../../routes";


export default function Layout(props) {
    return (
        <div>
            <ul>
                <li> <Link route="/"><a>Home</a></Link></li>
                <li><Link route="/campaign"><a>Campaign</a></Link></li>
                <li><Link route="/dashboard"><a>Dashboard</a></Link></li>

                {props.auth.isAuthenticated
                    ? (<li><button onClick={props.logoutUser}>Logout</button></li>)
                    : null}
            </ul>

            <h2>{props.auth.isAuthenticated}</h2>
            {props.children}
        </div>


    );
}