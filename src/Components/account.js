import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Card, CardActions, CardContent, Divider, Button, Grid, TextField } from '@material-ui/core';

import clsx from 'clsx';

import axios from 'axios';
import { authMiddleWare } from '../util/auth';

const styles = (theme) => ({
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
		left: '50%',
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
			.get('/user')
			.then((response) => {
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
				// console.log(response);
			})
			.catch((error) => {
				if (error.response.status === 403) {
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
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.post('/user/activate')
			.then((res) => {
				console.log(res)
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
					buttonLoading: false
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
			.post('/user/image', form_data, {
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
		let country_list = ['AFGHANISTAN','ALBANIA',
  'ALGERIA',
  'ANDORRA',
  'ANGOLA',
  'ANGUILLA',
  'ANTIGUA &AMP; BARBUDA',
  'ARGENTINA',
  'ARMENIA',
  'ARUBA',
  'AUSTRALIA',
  'AUSTRIA',
  'AZERBAIJAN',
  'BAHAMAS',
  'BAHRAIN',
  'BANGLADESH',
  'BARBADOS',
  'BELARUS',
  'BELGIUM',
  'BELIZE',
  'BENIN',
  'BERMUDA',
  'BHUTAN',
  'BOLIVIA',
  'BOSNIA &AMP; HERZEGOVINA',
  'BOTSWANA',
  'BRAZIL',
  'BRITISH VIRGIN ISLANDS',
  'BRUNEI',
  'BULGARIA',
  'BURKINA FASO',
  'BURUNDI',
  'CAMBODIA',
  'CAMEROON',
  'CAPE VERDE',
  'CAYMAN ISLANDS',
  'CHAD',
  'CHILE',
  'CHINA',
  'COLOMBIA',
  'CONGO',
  'COOK ISLANDS',
  'COSTA RICA',
  'COTE D IVOIRE',
  'CROATIA',
  'CRUISE SHIP',
  'CUBA',
  'CYPRUS',
  'CZECH REPUBLIC',
  'DENMARK',
  'DJIBOUTI',
  'DOMINICA',
  'DOMINICAN REPUBLIC',
  'ECUADOR',
  'EGYPT',
  'EL SALVADOR',
  'EQUATORIAL GUINEA',
  'ESTONIA',
  'ETHIOPIA',
  'FALKLAND ISLANDS',
  'FAROE ISLANDS',
  'FIJI',
  'FINLAND',
  'FRANCE',
  'FRENCH POLYNESIA',
  'FRENCH WEST INDIES',
  'GABON',
  'GAMBIA',
  'GEORGIA',
  'GERMANY',
  'GHANA',
  'GIBRALTAR',
  'GREECE',
  'GREENLAND',
  'GRENADA',
  'GUAM',
  'GUATEMALA',
  'GUERNSEY',
  'GUINEA',
  'GUINEA BISSAU',
  'GUYANA',
  'HAITI',
  'HONDURAS',
  'HONG KONG',
  'HUNGARY',
  'ICELAND',
  'INDIA',
  'INDONESIA',
  'IRAN',
  'IRAQ',
  'IRELAND',
  'ISLE OF MAN',
  'ISRAEL',
  'ITALY',
  'JAMAICA',
  'JAPAN',
  'JERSEY',
  'JORDAN',
  'KAZAKHSTAN',
  'KENYA',
  'KUWAIT',
  'KYRGYZ REPUBLIC',
  'LAOS',
  'LATVIA',
  'LEBANON',
  'LESOTHO',
  'LIBERIA',
  'LIBYA',
  'LIECHTENSTEIN',
  'LITHUANIA',
  'LUXEMBOURG',
  'MACAU',
  'MACEDONIA',
  'MADAGASCAR',
  'MALAWI',
  'MALAYSIA',
  'MALDIVES',
  'MALI',
  'MALTA',
  'MAURITANIA',
  'MAURITIUS',
  'MEXICO',
  'MOLDOVA',
  'MONACO',
  'MONGOLIA',
  'MONTENEGRO',
  'MONTSERRAT',
  'MOROCCO',
  'MOZAMBIQUE',
  'NAMIBIA',
  'NEPAL',
  'NETHERLANDS',
  'NETHERLANDS ANTILLES',
  'NEW CALEDONIA',
  'NEW ZEALAND',
  'NICARAGUA',
  'NIGER',
  'NIGERIA',
  'NORWAY',
  'OMAN',
  'PAKISTAN',
  'PALESTINE',
  'PANAMA',
  'PAPUA NEW GUINEA',
  'PARAGUAY',
  'PERU',
  'PHILIPPINES',
  'POLAND',
  'PORTUGAL',
  'PUERTO RICO',
  'QATAR',
  'REUNION',
  'ROMANIA',
  'RUSSIA',
  'RWANDA',
  'SAINT PIERRE &AMP; MIQUELON',
  'SAMOA',
  'SAN MARINO',
  'SATELLITE',
  'SAUDI ARABIA',
  'SENEGAL',
  'SERBIA',
  'SEYCHELLES',
  'SIERRA LEONE',
  'SINGAPORE',
  'SLOVAKIA',
  'SLOVENIA',
  'SOUTH AFRICA',
  'SOUTH KOREA',
  'SPAIN',
  'SRI LANKA',
  'ST KITTS &AMP; NEVIS',
  'ST LUCIA',
  'ST VINCENT',
  'ST. LUCIA',
  'SUDAN',
  'SURINAME',
  'SWAZILAND',
  'SWEDEN',
  'SWITZERLAND',
  'SYRIA',
  'TAIWAN',
  'TAJIKISTAN',
  'TANZANIA',
  'THAILAND',
  "TIMOR L'ESTE",
  'TOGO',
  'TONGA',
  'TRINIDAD &AMP; TOBAGO',
  'TUNISIA',
  'TURKEY',
  'TURKMENISTAN',
  'TURKS &AMP; CAICOS',
  'UGANDA',
  'UKRAINE',
  'UNITED ARAB EMIRATES',
  'UNITED KINGDOM',
  'URUGUAY',
  'UZBEKISTAN',
 'VENEZUELA',
  'VIETNAM',
  'VIRGIN ISLANDS (US)',
  'YEMEN',
  'ZAMBIA',
  'ZIMBABWE']
		if (!country_list.includes(this.state.country.toUpperCase())){
			this.setState({
				errors: {country: "Did you misspell this?"}, 
				loading: false
			})
			return
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
			.post('/user', formRequest)
			.then(() => {
				this.setState({ buttonLoading: false });
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
					{this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
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
										<Typography color="Gold "className={classes.locationText} gutterBottom variant="h5">
											Activated
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
									<Button
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
									)}
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
											margin="dense"
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
											margin="dense"
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
											margin="dense"
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
											margin="dense"
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
											margin="dense"
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
										<TextField
											fullWidth
											label="Country"
											margin="dense"
											name="country"
											variant="outlined"
											value={this.state.country}
											onChange={this.handleChange}
											helperText={errors.country}
											error={errors.country ? true : false}
										/>
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