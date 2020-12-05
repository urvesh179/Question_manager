import React from 'react';
import Avatar from 'react-avatar';

function Header(props) {

	var user = JSON.parse(localStorage.getItem('user'));

	var style = {
		height: 70
	}
	return (
		<>
			<div className="navbar navbar-expand-md navbar-dark" style={style}>
				<div className="navbar-brand">
					<a href="#" className="d-inline-block">
						<img src="../assets/images/logo_light.png" alt="" />
					</a>
				</div>


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

						<li className="nav-item dropdown">
							<a href="#" className="navbar-nav-link dropdown-toggle caret-0" data-toggle="dropdown" style={{margin:"15px"}}>
								<i className="icon-bubbles4"></i>
								<span className="d-md-none ml-2">Notifications</span>
								<span className="badge badge-pill bg-warning-400 ml-auto ml-md-0">2</span>
							</a>

							<div className="dropdown-menu dropdown-menu-right dropdown-content wmin-md-350">
								<div className="dropdown-content-header">
									<span className="font-weight-semibold">Notification</span>
									<a href="#" className="text-default"></a>
								</div>

								<div className="dropdown-content-body dropdown-scrollable">
									<ul className="media-list">
										<li className="media">
											<div className="mr-3 position-relative">
												<img src="../assets/images/demo/users/face10.jpg" width="36" height="36" className="rounded-circle" alt="" />
											</div>

											<div className="media-body">
												<div className="media-title">
													<a href="#">
														<span className="font-weight-semibold">James Alexander</span>
														<span className="text-muted float-right font-size-sm">04:58</span>
													</a>
												</div>

												<span className="text-muted">who knows, maybe that would be the best thing for me...</span>
											</div>
										</li>

									</ul>
								</div>

								<div className="dropdown-content-footer justify-content-center p-0">
									<a href="#" className="bg-light text-grey w-100 py-2" data-popup="tooltip" title="Load more"><i className="icon-menu7 d-block top-0"></i></a>
								</div>
							</div>
						</li>

						<li className="nav-item dropdown dropdown-user">
							<a href="#" className="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown">
								{/* <img src="../assets/images/demo/users/face13.jpg" className="rounded-circle mr-2" height="34" alt=""/> */}
								<Avatar name={user==null?null:user.name} round={true} size="50" color="#26a69a" style={{ margin: "5px 10px 10px auto" }} />
								<span>{user==null?null:user.name}</span>
							</a>

							<div className="dropdown-menu dropdown-menu-right">
								<a href="/admin/editprofile" className="dropdown-item"><i className="icon-user-plus"></i> My profile</a>
								<a href="/admin/changepassword" className="dropdown-item"><i className="icon-cog5"></i>Change Password</a>
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