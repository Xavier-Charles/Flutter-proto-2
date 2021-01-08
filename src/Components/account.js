import React, { Component } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Card, CardActions, CardContent, Divider, Button, Grid, TextField } from '@material-ui/core';

import { v4 } from 'uuid'
import clsx from 'clsx';
import axios from 'axios';
import { authMiddleWare } from '../util/auth';
import SelectCurrency from './select';
import { verify_trans } from '../util/Pay';

const styles = (theme) => ({
	overrides: {
        MuiSelect:{
            root:{
                textAlign:'left'
            }
        }
   },
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	toolbar: theme.mixins.toolbar,
	root: {},
	details: {
		display: 'flex'
	},
	avatar: {
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0
	},
	locationText: {
		paddingLeft: '8px',
		textAlign: 'left',
		display: 'inline-block'
	},
	header: {
		textAlign: "left"
	},
	buttonProperty: {
		position: 'absolute',
		top: '50%'
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '46%',
		top: '35%'
	},
	progess: {
		position: 'absolute'
	},
	uploadButton: {
		// marginLeft: '8px',
		margin: theme.spacing(1)
	},
	activateButon: {
		margin: theme.spacing(1),
		marginTop: '-2px'
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10
	},
	submitButton: {
		marginTop: '10px'
	}
});
const urlhandler = (url) => {
	return process.env.NODE_ENV === "development" ?
					url : process.env.REACT_APP_PRODUCTION_URL + url
}
class account extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			storename: '',
			country: '',
			profilePicture: '',
			uiLoading: true,
			buttonLoading: false,
			imageError: '',
			errors: [],
			activated: false
		};
	}

	componentWillMount = () => {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };

		axios
			.get(urlhandler('/user'))
			.then(async(response) => {
				this.setState({
					firstName: response.data.userCredentials.firstName,
					lastName: response.data.userCredentials.lastName,
					email: response.data.userCredentials.email,
					phoneNumber: `+${response.data.userCredentials.phoneNumber}`,
					country: response.data.userCredentials.country,
					storename: response.data.userCredentials.storename,
					activated: response.data.userCredentials.activated,
					uiLoading: false
				});
				let params = new URLSearchParams(window.location.search);
				
				if (params.get('status') === 'successful' && !response.data.userCredentials.activated) {
					this.setState({uiLoading: true})
					await verify_trans(params.get('transaction_id'), response.data.userCredentials, 20, 'USD')
				}
			})
			.catch((error) => {
				if (error.response === undefined){
					return console.log(error);
				}else if (error.response.status === 403) {
					this.props.history.push('/login');
				}
				console.log(error);
				this.setState({ errorMsg: 'Error in retrieving the data' });
			});
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleImageChange = (event) => {
		this.setState({
			image: event.target.files[0]
		});
	};

	handleActivate = (event) => {
		event.preventDefault();
		this.setState({
			uiLoading: true
		});

		// authMiddleWare(this.props.history);
		// const authToken = localStorage.getItem('AuthToken');
		const PayData = {
			"tx_ref": v4(),
			"amount": "20",
			"currency":"USD",
			"redirect_url": `${window.location.href}`,
			"payment_options":"account, card, banktransfer, mpesa, qr, ussd, credit, barter, mobilemoneyghana, payattitude, mobilemoneyfranco, paga, 1voucher",
			"meta":{
				"consumer_id":23,
				"consumer_mac":"92a3-912ba-1192a"
			},
			"customer":{
				"email":this.state.email,
				"phonenumber":this.state.phoneNumber,
				"store":this.state.storename
			},
			"customizations":{
				"title":"Jumga",
				"description":"Activate your store",
			}
		}

		axios.defaults.headers.common = { Authorization: `Bearer ${process.env.NODE_ENV === 'development'? process.env.REACT_APP_FLUTTER_S_KEY_TEST : process.env.REACT_APP_FLUTTER_S_KEY}` };
		axios
			.post(`https://nameless-shelf-51198.herokuapp.com/https://api.flutterwave.com/v3/payments`, PayData)
			.then((res) => {
				console.log(res)
				if (res.status === 200) {
					window.location.assign(res.data.data.link)
				}
			})
			.catch((error) => {
				console.log({error});
				this.setState({
					uiLoading: false
				});
			});
	}

	profilePictureHandler = (event) => {
		event.preventDefault();
		this.setState({
			uiLoading: true
		});
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		let form_data = new FormData();
		form_data.append('image', this.state.image);
		form_data.append('content', this.state.content);
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.post(urlhandler('/user/image'), form_data, {
				headers: {
					'content-type': 'multipart/form-data'
				}
			})
			.then(() => {
				window.location.reload();
			})
			.catch((error) => {
				if (error.response.status === 403) {
					this.props.history.push('/login');
				}
				console.log(error);
				this.setState({
					uiLoading: false,
					imageError: 'Error in posting the data'
				});
			});
	};

	updateFormValues = (event) => {
		event.preventDefault();

		let num = this.state.phoneNumber
		if (num.charAt(0) === "+"){
				num =  num.replace("+", "")
		} 
		if (num/10000000000 < 1) {
			num = `${234*10000000000 + (num%10000000000)}`
		}

		this.setState({ buttonLoading: true });
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		const formRequest = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			country: this.state.country,
			storename: this.state.storename,
			phoneNumber: num,
			email: this.state.email
		};
		axios
			.post(urlhandler('/user'), formRequest)
			.then(() => {
				this.setState({ buttonLoading: false });
				window.location.reload()
			})
			.catch((error) => {
				if (error.response.status === 403) {
					this.props.history.push('/login');
				}
				console.log(error);
				this.setState({
					errors: error.response.data,
					buttonLoading: false
				});
			});
	};

	render() {
		const { classes, ...rest } = this.props;
		const { errors } = this.state;
		if (this.state.uiLoading === true) {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{this.state.uiLoading && <CircularProgress size={50} className={classes.uiProgess} />}
				</main>
			);
		} else {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Card {...rest} className={clsx(classes.root, classes)}>
						<CardContent>
							<div className={classes.details}>
								<div>
									<div className={classes.header}>
										<Typography className={classes.locationText} gutterBottom variant="h4">
											{this.state.firstName} {this.state.lastName}
										</Typography>
									</div>
									<div className={classes.header}>
										<Typography className={classes.locationText} gutterBottom variant="h5">
											{this.state.activated ? 'Activated' : 'Activate'}
										</Typography>
										<Button
											variant="outlined"
											color="primary"
											type="submit"
											size="small"
											startIcon={<CloudUploadIcon />}
											className={classes.activateButon}
											disabled= {this.state.activated}
											onClick={this.handleActivate}
										>
											Activate
										</Button>
									</div>
									{/* //! Profile picture */}
									{/* <Button
										variant="outlined"
										color="primary"
										type="submit"
										size="small"
										startIcon={<CloudUploadIcon />}
										className={classes.uploadButton}
										onClick={this.profilePictureHandler}
									>
										Upload Photo
									</Button>
									<input type="file" onChange={this.handleImageChange} />

									{this.state.imageError ? (
										<div className={classes.customError}>
											{' '}
											Wrong Image Format || Supported Format are PNG and JPG
										</div>
									) : (
										false
									)} */}
								</div>
							</div>
							<div className={classes.progress} />
						</CardContent>
						<Divider />
					</Card>

					<br />
					<Card {...rest} className={clsx(classes.root, classes)}>
						<form autoComplete="off" noValidate>
							<Divider />
							<CardContent>
								<Grid container spacing={3}>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="First name"
											name="firstName"
											variant="outlined"
											value={this.state.firstName}
											onChange={this.handleChange}
											helperText={errors.firstName}
											error={errors.firstName ? true : false}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Last name"
											name="lastName"
											variant="outlined"
											value={this.state.lastName}
											onChange={this.handleChange}
											helperText={errors.lastName}
											error={errors.lastName ? true : false}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Email"
											name="email"
											variant="outlined"
											value={this.state.email}
											onChange={this.handleChange}
											helperText={errors.email}
											error={errors.email ? true : false}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Store Phone Number"
											name="phoneNumber"
											variant="outlined"
											value={this.state.phoneNumber}
											onChange={this.handleChange}
											helperText={errors.phoneNumber}
											error={errors.phoneNumber ? true : false}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Store Name"
											name="storename"
											disabled={false}
											variant="outlined"
											value={this.state.storename}
											onChange={this.handleChange}
											helperText={errors.storename}
											error={errors.storename ? true : false}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<SelectCurrency 
											label="Country"
											id="select"
											name="country"
											value={this.state.country}
											onChange={this.handleChange}
											helperText={errors.country}
											error={errors.country ? true : false}
										></SelectCurrency>
									</Grid>
								</Grid>
							</CardContent>
							<Divider />
							<CardActions />
						</form>
					</Card>
					<Button
						color="primary"
						variant="contained"
						type="submit"
						className={classes.submitButton}
						onClick={this.updateFormValues}
						disabled={
							this.state.buttonLoading ||
							!this.state.firstName ||
							!this.state.lastName ||
							!this.state.country
						}
					>
						Save details
						{this.state.buttonLoading && <CircularProgress size={30} className={classes.progess} />}
					</Button>
				</main>
			);
		}
	}
}

export default withStyles(styles)(account);