import { Link } from "../routes";
import { HeaderStyle } from "../styles/HeaderStyle";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";

const Header = (props) => (
	<HeaderStyle>
		<Link route="/">
			<a className="logo">Canary</a>
		</Link>

		{props.auth.isAuthenticated ? (
			<div className="navigation">
				<a onClick={props.logoutUser}>Logout</a>
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

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}


export default connect(mapStateToProps, { logoutUser })(Header);
