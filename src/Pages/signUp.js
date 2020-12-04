import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

const styles = (theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	progess: {
		position: 'absolute'
	}
});

class signUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			phoneNumber: '',
			country: '',
			storename: '',
			email: '',
			password: '',
			confirmPassword: '',
			errors: [],
			loading: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({
				errors: nextProps.UI.errors
			});
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
			errors: []
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({ loading: true});

		const {phoneNumber, firstName, lastName, 
				country, storename, email, 
				password, confirmPassword} = this.state

		let num = phoneNumber
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
		if (!country_list.includes(country.toUpperCase())){
			this.setState({
				errors: {country: "Did you misspell this?"}, 
				loading: false
			})
			return
		}
		const newUserData = {
			firstName,
			lastName,
			phoneNumber: num,
			country,
			storename,
			email,
			password,
			confirmPassword
		};
		// console.log(newUserData);
		// return
		axios
			.post('/signup', newUserData)
			.then((response) => {
				localStorage.setItem('AuthToken', `${response.data.token}`);
				this.setState({ 
					loading: false,
				});	
				this.props.history.push('/login');
			})
			.catch((error) => {
				this.setState({
					errors: error.response.data,
					loading: false
				});
			});
	};

	render() {
		const { classes } = this.props;
		const { errors, loading } = this.state;
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="firstName"
									label="First Name"
									name="firstName"
									autoComplete="first name"
									helperText={errors.firstName}
									error={errors.firstName ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="last name"
									helperText={errors.lastName}
									error={errors.lastName ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="storename"
									label="Store Name"
									name="storename"
									autoComplete="store name"
									helperText={errors.storename}
									error={errors.storename ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="phoneNumber"
									label="Phone Number"
									name="phoneNumber"
									autoComplete="tel"
									pattern="[7-9]{1}[0-9]{9}"
									helperText={errors.phoneNumber}
									error={errors.phoneNumber ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									helperText={errors.email}
									error={errors.email ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="country"
									label="Country"
									name="country"
									autoComplete="country"
									helperText={errors.country}
									error={errors.country ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="password"
									helperText={errors.password}
									error={errors.password ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="confirmPassword"
									label="Confirm Password"
									type="password"
									id="confirmPassword"
									autoComplete="password"
									onChange={this.handleChange}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={this.handleSubmit}
                            disabled={loading || 
                                !this.state.email || 
                                !this.state.password ||
                                !this.state.firstName || 
                                !this.state.lastName ||
                                !this.state.country || 
                                !this.state.storename || 
                                !this.state.phoneNumber}
						>
							Sign Up
							{loading && <CircularProgress size={30} className={classes.progess} />}
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}
}

export default withStyles(styles)(signUp);
