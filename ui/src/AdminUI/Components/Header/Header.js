import React from 'react';
import Avatar from 'react-avatar';

function Header(props) {

	//var logo="../../assets/images/logo.jpeg";
	var user = JSON.parse(localStorage.getItem('user'));
	

	var style = {
		height: 70,
		img:{
			width:"130px",
			height:"45px"
		}
	}
	return (
		<>
			<div className="navbar navbar-expand-md navbar-dark" style={style}>
				{/* <div className="navbar-brand">
					<a href="#" className="d-inline-block">
						<img src={logo} alt="" style={style.img}/>
					</a>
				</div> */}


				<div className="collapse navbar-collapse" id="navbar-mobile">
					<ul className="navbar-nav">
						<li className="nav-item">
							<a href="#" className="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
								<i className="icon-paragraph-justify3"></i>
							</a>
						</li>


					</ul>

					<span class="badge bg-success ml-md-3 mr-md-auto">Online</span>

					<ul className="navbar-nav">

						
						<li className="nav-item dropdown dropdown-user">
							<a href="#" className="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown">
								{/* <img src="../assets/images/demo/users/face13.jpg" className="rounded-circle mr-2" height="34" alt=""/> */}
								<Avatar name={user==null?null:user.username} round={true} size="50" color="#26a69a" style={{ margin: "5px 10px 10px auto" }} />
								<span>{user==null?null:user.username}</span>
							</a>

							<div className="dropdown-menu dropdown-menu-right">
								<a href="/admin/logout" className="dropdown-item"><i className="icon-switch2"></i> Logout</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default Header;