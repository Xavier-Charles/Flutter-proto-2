import React, { Component } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Card, CardActions, CardContent, Divider, Button, Grid, TextField } from '@material-ui/core';

import clsx from 'clsx';
import axios from 'axios';
import { authMiddleWare } from '../util/auth';
import SelectCountry from './selectCountry';
import SelectBank from './selectBank';
import { verify_activate, activate } from '../util/Pay';

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
			dispatchRider: {},
			activated: false,
			banks: [],
			accountNumber: '',
			bank: {}
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
					bank: response.data.userCredentials.bank ? response.data.userCredentials.bank: "",
					accountNumber: response.data.userCredentials.accountNumber ? response.data.userCredentials.accountNumber: "",
					subaccount_id: response.data.userCredentials.subaccount_id ? response.data.userCredentials.subaccount_id: "",
					uiLoading: false
				});
				let params = new URLSearchParams(window.location.search);
				
				if (params.get('status') === 'successful' && !response.data.userCredentials.activated) {
					this.setState({uiLoading: true})
					await verify_activate(params.get('transaction_id'), response.data.userCredentials, 20, 'USD')
				}

				const getBanks = (country) => {
					axios.defaults.headers.common = { Authorization: `Bearer ${process.env.NODE_ENV === 'development'? process.env.REACT_APP_FLUTTER_S_KEY_TEST : process.env.REACT_APP_FLUTTER_S_KEY}` };
					let countries = {Nigeria: "NG", "United Kingdom" : "UK", Kenya: "KE", Ghana: "GH"}
					axios
						.get(`https://nameless-shelf-51198.herokuapp.com/https://api.flutterwave.com/v3/banks/${countries[country]}`)
						.then((res) => {
							this.setState({banks: res.data.data})
						})
						.catch(err => console.log({err}))
				}

				getBanks(response.data.userCredentials.country)

				axios
					.get(urlhandler(`/dispatchRider/${response.data.userCredentials.dispatchRider}`))
					.then ((res) => this.setState({dispatchRider: res.data.userCredentials}))
					.catch(err => console.log(err))
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

	handleActivate = async (event) => {
		event.preventDefault();
		if (this.state.accountNumber && this.state.bank){
			this.setState({uiLoading: true});
			await activate(this.state)
			this.setState({uiLoading: false});
		}else {
			let err = "You have not specified your Account Number or Bank"
			this.setState({errors: this.state.errors.push[{bank: err, accountNumber: err}]})
		}
	}

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
			email: this.state.email,
			accountNumber: this.state.accountNumber,
			bank: this.state.bank,
			bankCode: this.state.banks.filter(bank => bank.name === this.state.bank)[0].code
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
											startIcon={<LockOpenIcon />}
											className={classes.activateButon}
											disabled= {this.state.activated}
											onClick={this.handleActivate}
										>
											Activate
										</Button>
										<div>
											<Typography className={classes.locationText} gutterBottom variant="h5">
												{`${JSON.stringify(this.state.dispatchRider) !== "{}" ? 
													"Dispatch Rider: " + 
													this.state.dispatchRider.firstName + 
													" " + this.state.dispatchRider.lastName : ""}`}
											</Typography>
										</div>
									</div>
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
									{/* for subaccounts */}

									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Account Number (Dollar acc. only)"
											name="accountNumber"
											variant="outlined"
											value={this.state.accountNumber}
											onChange={this.handleChange}
											helperText={errors.accountNumber}
											disabled={this.state.subaccount_id.length !== 0}
											error={errors.accountNumber ? true : false}
										/>
									</Grid>

									{this.state.banks.length !== 0 && <Grid item md={6} xs={12}>
										<SelectBank 
											label="Bank"
											id="select"
											name="bank"
											banks={this.state.banks}
											value={this.state.bank}
											onChange={this.handleChange}
											helperText={errors.bank}
											disabled={this.state.subaccount_id.length !== 0}
											error={errors.bank ? true : false}
										></SelectBank>
									</Grid>}

									<Grid item md={6} xs={12}>
										<SelectCountry 
											label="Country"
											id="select"
											name="country"
											value={this.state.country}
											onChange={this.handleChange}
											helperText={errors.country}
											disabled={this.state.subaccount_id.length !== 0}
											error={errors.country ? true : false}
										></SelectCountry>
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