import { Link } from "../routes";
import { HeaderStyle } from "../styles/HeaderStyle";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";
import Dropdown from "./partials/Dropdown";
import React, { useState } from 'react';

const Header = (props) => {

	const [toggle, setToggle] = useState(false);



	return (
		<HeaderStyle>
			<Link route="/">
				<img src="/images/logo.png" className="logo" alt="" />
			</Link>

			{props.isHome ? null : (<div className="navigation">
				<Link route="/explore">
					<a >Explore</a>
				</Link>
				<Link route="/campaign/create">
					<a>Start a Campaign</a>
				</Link>
			</div>)}


			{props.auth.isAuthenticated ? (
				<div className="navigation  dropdown-wrapper">

					<img src={props.auth.user.avatar} onClick={() => setToggle(!toggle)} />
					{toggle ? <Dropdown logoutUser={props.logoutUser} toggle={toggle} setToggle={setToggle} /> : null}
				</div>
			) : (
					<div className="navigation">
						<Link route="/login">
							<a>Login</a>
						</Link>
						<Link route="/register">
							<a className="box">Sign Up</a>
						</Link>
					</div>



				)}

		</HeaderStyle>
	);
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}


export default connect(mapStateToProps, { logoutUser })(Header);

// 