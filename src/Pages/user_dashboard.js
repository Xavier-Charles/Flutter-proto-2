import React, { Component } from 'react';
import axios from 'axios';

import Account from '../Components/account';
import Nav from '../Components/dashboardnav';
import Products from '../Components/user_products';

// import Drawer from '@material-ui/core/Drawer';
// import AppBar from '@material-ui/core/AppBar';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
// import AccountBoxIcon from '@material-ui/icons/AccountBox';
// import NotesIcon from '@material-ui/icons/Notes';
// import Avatar from '@material-ui/core/avatar';
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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

	previewHandler =(event) => {
		window.open(`${window.location.origin}/preview/${this.state.storename}`, "_blank")
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
				// console.log(response);
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
					profilePicture: response.data.userCredentials.imageUrl
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
		// return (
		// 		<div className={classes.root}>
		// 			{<CircularProgress size={50} className={classes.uiProgess} />}
		// 		</div>
		// 	);
		
		if (this.state.uiLoading === true) {
			return (
				<div className={classes.root}>
					{this.state.uiLoading && <CircularProgress size={50} className={classes.uiProgess} />}
				</div>
			);
		} else {
			return (
				<div className={classes.root}>
					{/* <CssBaseline /> */}
					{/* <AppBar position="fixed" className={classes.appBar}>
						<Toolbar>
							<Typography variant="h6" noWrap>
								{this.state.storename.charAt().toUpperCase()+this.state.storename.slice(1).toLowerCase()}
							</Typography>
						</Toolbar>
					</AppBar> */}
					<Nav storename={this.state.storename} handlers={{
						product: this.loadProductsPage,
						account: this.loadAccountPage,
						preview: this.previewHandler,
						logout: this.logoutHandler
					}}/>
					{/* <Drawer
						className={classes.drawer}
						variant="permanent"
						classes={{
							paper: classes.drawerPaper
						}}
					>
						<div className={classes.toolbar} />
						<Divider />
						<center>
							<Avatar src={this.state.profilePicture} className={classes.avatar} />
							<p>
								{' '}
								{this.state.firstName} {this.state.lastName}
							</p>
						</center>
						<Divider />
						<List>
							<ListItem button key="Products" onClick={this.loadProductsPage}>
								<ListItemIcon>
									{' '}
									<NotesIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Products" />
							</ListItem>

							<ListItem button key="Account" onClick={this.loadAccountPage}>
								<ListItemIcon>
									{' '}
									<AccountBoxIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Account" />
							</ListItem>

							<ListItem button key="Logout" onClick={this.logoutHandler}>
								<ListItemIcon>
									{' '}
									<ExitToAppIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItem>

							<ListItem button key="Preview" onClick={this.previewHandler}>
								<ListItemIcon>
									{' '}
									<VisibilityIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Preview" />
							</ListItem>
						</List>
					</Drawer> */}

					<div>{this.state.render ? 
									<Account /> : 
									<Products categories={this.state.categories} store={this.state.storename} />}
					</div>
				</div>
			);
		}
	}
}

export default withStyles(styles)(withRouter(Dashboard));
