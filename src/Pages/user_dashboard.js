import React, { Component } from 'react';
import axios from 'axios';
import Account from '../Components/account';
import Nav from '../Components/dashboardnav';
import Products from '../Components/user_products';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';

import { authMiddleWare } from '../util/auth'

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	avatar: {
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0,
		marginTop: 20
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '46%',
		top: '35%'
	},
	toolbar: theme.mixins.toolbar
});

class Dashboard extends Component {
	state = {
		render: false
	};

	loadAccountPage = (event) => {
		this.setState({ render: true });
	};

	loadProductsPage = (event) => {
		this.setState({ render: false });
	};

	logoutHandler = (event) => {
		localStorage.removeItem('AuthToken');
		this.props.history.push('/login');
	};

	viewHandler =(event) => {
		window.open(`${window.location.origin}/store/${this.state.storename}`, "_blank")
	}

	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			profilePicture: '',
			uiLoading: true,
			imageLoading: false,
			render: true
		};
	}

	componentWillMount = () => {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		const urlhandler = (url) => {
			return process.env.NODE_ENV === "development" ?
						 url : process.env.REACT_APP_PRODUCTION_URL + url
		}
		axios
			.get(urlhandler('/user'))
			.then((response) => {
				this.setState({
					firstName: response.data.userCredentials.firstName,
					lastName: response.data.userCredentials.lastName,
					email: response.data.userCredentials.email,
					phoneNumber: response.data.userCredentials.phoneNumber,
					country: response.data.userCredentials.country,
					username: response.data.userCredentials.username,
					categories: response.data.userCredentials.categories,
					storename: response.data.userCredentials.storename,
					uiLoading: false,
					activated: response.data.userCredentials.activated
					// profilePicture: response.data.userCredentials.imageUrl
				});
			})
			.catch((error) => {
				console.log(error);
				if(error.response) {
					this.props.history.push('/login')
				}
				this.setState({ errorMsg: 'Error in retrieving the data' });
				this.props.history.push('/login')
			});
	};

	render() {
		const { classes } = this.props;	

		if (this.state.uiLoading === true) {
			return (
				<div className={classes.root}>
					{this.state.uiLoading && <CircularProgress size={50} className={classes.uiProgess} />}
				</div>
			);
		} else {
			return (
				<div className={classes.root}>
					<Nav storename={this.state.storename} handlers={{
						product: this.loadProductsPage,
						account: this.loadAccountPage,
						view: this.viewHandler,
						logout: this.logoutHandler
					}} activated={this.state.activated} />
					{
						this.state.render ? 
						<Account data={this.state}/> : 
						<Products activated={this.state.activated} categories={this.state.categories} store={this.state.storename} />
					}
				</div>
			);
		}
	}
}

export default withStyles(styles)(withRouter(Dashboard));
