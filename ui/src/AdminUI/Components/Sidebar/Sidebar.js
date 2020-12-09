import React from 'react'
import { withRouter } from 'react-router-dom';

function Sidebar(proprs) {
	var style={
		height: "100%"	  
	}
	return (

		<>

			<div className="sidebar sidebar-dark sidebar-main sidebar-expand-md" style={style} >

				<div className="sidebar-content">
					<div className="card card-sidebar-mobile">
						<ul className="nav nav-sidebar" data-nav-type="accordion">

							
							<li className="nav-item">
								<a href="/admin" className="nav-link active">
									<i className="icon-home4"></i>
									<span>
										Dashboard
								</span>
								</a>
							</li>
							<li className="nav-item nav-item-submenu">
								<a  className="nav-link"><i className="icon-books"></i> <span>Language</span></a>

								<ul className="nav nav-group-sub" data-submenu-title="language">
									<li className="nav-item"><a href="/admin/addlanguage" className="nav-link">Add Langauge</a></li>
									<li className="nav-item"><a href="/admin/languagelist" className="nav-link">Langauge List</a></li>

								</ul>
							</li>

							<li className="nav-item nav-item-submenu">
								<a  className="nav-link"><i className="icon-question7"></i> <span>Question</span></a>

								<ul className="nav nav-group-sub" data-submenu-title="question">
									<li className="nav-item"><a href="/admin/addquestion" className="nav-link">Add Question</a></li>
									<li className="nav-item"><a href="/admin/questionlist" className="nav-link">Question List</a></li>

								</ul>
							</li>
							
						</ul>
					</div>

				</div></div>
		</>

	)
}
export default withRouter(Sidebar);