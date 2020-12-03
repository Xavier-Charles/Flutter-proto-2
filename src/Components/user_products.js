import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Dialog from '@material-ui/core/Dialog';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
// import CardContent from '@material-ui/core/CardContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { authMiddleWare } from '../util/auth';

import ProductCard from './productCard'

const styles = (theme) => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	appBar: {
		position: 'relative'
	},
	name: {
		marginLeft: theme.spacing(2),
		flex: 1
	},
	space: {
		margin: '5px',
		maxWidth: '300px'
	},
	submitButton: {
		display: 'block',
		color: 'white',
		textAlign: 'center',
		position: 'absolute',
		top: 14,
		right: 10
	},
	floatingButton: {
		position: 'fixed',
		bottom: 0,
		right: 0,
		zIndex: 10
	},
	form: {
		width: '98%',
		marginLeft: 13,
		marginTop: theme.spacing(3)
	},
	toolbar: theme.mixins.toolbar,
	root: {
		minWidth: 470
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	pos: {
		marginBottom: 12
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	dialogeStyle: {
		maxWidth: '50%'
	},
	viewRoot: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
    },
    customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10
    },
    uploadButton: {
		marginLeft: '8px',
		margin: theme.spacing(1)
	}
});

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

class Products extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: '',
			name: '',
			img: '',
			category: '',
			categories: [],
            formImage: null,
            formImageError: '',
            description: '',
            price: 0,
			productId: '',
			errors: {},
			open: false,
			uiLoading: true,
			buttonType: '',
			viewOpen: false
		};

		this.deleteProductHandler = this.deleteProductHandler.bind(this);
		this.handleEditClickOpen = this.handleEditClickOpen.bind(this);
        this.handleViewOpen = this.handleViewOpen.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
    };

	componentWillMount = () => {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/products')
			.then((response) => {
				this.setState({
					products: response.data,
					uiLoading: false
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	deleteProductHandler(data) {
		console.log(data)
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.delete(`del_product/${data.productId}`)
			.then(() => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	handleEditClickOpen(data) {
		console.log(data)
		this.setState({
			name: data.name,
            img: data.img,
            description: data.description,
            price: data.price,
			productId: data.productId,
			buttonType: 'Edit',
			open: true
		});
		this.handleViewOpen()
	}

	handleViewOpen() {
		this.setState({
			categories: this.props.categories
		});

		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/user')
			.then((response) => {
				// console.log(response.data);
				this.setState({
					categories: response.data.userCredentials.categories,
				});
			})
			.catch((error) => {
				if(error.response.status === 403) {
					this.props.history.push('/login')
				}
				console.log(error);
				this.setState({ errorMsg: 'Error in retrieving the data' });
			});
    }
    
    handleImageChange = (event) => {
		this.setState({
			formImage: event.target.files[0]
		});
	};

	categoryHandler = (event) => {
		event.preventDefault()
		this.setState({
			category: event.target.innerHTML
		});
	}
    
	render() {
		const DialogTitle = withStyles(styles)((props) => {
			const { children, classes, onClose, ...other } = props;
			return (
				<MuiDialogTitle disableTypography className={classes.root} {...other}>
					<Typography variant="h6">{children}</Typography>
					{onClose ? (
						<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
							<CloseIcon />
						</IconButton>
					) : null}
				</MuiDialogTitle>
			);
		});

		const DialogContent = withStyles((theme) => ({
			viewRoot: {
				padding: theme.spacing(2)
			}
		}))(MuiDialogContent);

		dayjs.extend(relativeTime);
		const { classes } = this.props;
		const { open, errors, viewOpen, formImage, price } = this.state;

		const handleClickOpen = () => {
			this.setState({
				productId: '',
				name: '',
                img: '',
                description: '',
                price: 0,
				buttonType: '',
				open: true
			});
			this.handleViewOpen()
		};

		const handleSubmit = (event) => {

			let state = this.state
			if (formImage === null){
				this.setState({errors: {...errors, formImage: 'Your product has no image'}})
				return
			}
			if (price === 0){
				this.setState({errors: {...errors, price: "You have not set your product's price"}})
				return
			}
			authMiddleWare(this.props.history);
			event.preventDefault();

			let formData = new FormData();
			formData.append('name', state.name)
			formData.append('img', state.formImage)
			formData.append('description', state.description)
			formData.append('price', state.price)
			formData.append('category', state.category)

			let options = {};
			if (state.buttonType === 'Edit') {
				options = {
					url: `/product/${state.productId}`,
					method: 'put',
					data: formData,
					headers: {
						'content-type': 'multipart/form-data',
					}
				};
			} else {
				options = {
					url: '/product',
					method: 'post',
					data: formData,
					headers: {
						'content-type': 'multipart/form-data',
					}
				};
			}
			const authToken = localStorage.getItem('AuthToken');
			axios.defaults.headers.common = { Authorization: `${authToken}` };
			axios(options)
				.then(() => {
					this.setState({ open: false });
					window.location.reload();
				})
				.catch((error) => {
					this.setState({ open: true, errors: error.response.data });
					console.log(error);
				});
		};

		const handleViewClose = () => {
			this.setState({ viewOpen: false });
		};

		const handleClose = (event) => {
			this.setState({ open: false });
		};

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

					<IconButton
						className={classes.floatingButton}
						color="primary"
						aria-label="Add Product"
						onClick={handleClickOpen}
					>
						<AddCircleIcon style={{ fontSize: 60 }} />
					</IconButton>
					<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
						<AppBar className={classes.appBar}>
							<Toolbar>
								<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
									<CloseIcon />
								</IconButton>
								<Typography variant="h6" className={classes.name}>
									{this.state.buttonType === 'Edit' ? 'Edit Product' : 'Create a new Product'}
								</Typography>
								<Button
									autoFocus
									color="inherit"
									onClick={handleSubmit}
									className={classes.submitButton}
								>
									{this.state.buttonType === 'Edit' ? 'Save' : 'Submit'}
								</Button>
							</Toolbar>
						</AppBar>

						<form id="productForm" className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="productTitle"
										label="Product Title"
										name="name"
										autoComplete="productTitle"
										helperText={errors.name}
										value={this.state.name}
										error={errors.name ? true : false}
										onChange={this.handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="productCategory"
										label="Product Category"
										name="category"
										autoComplete="productCategory"
										helperText={errors.category}
										value={this.state.category}
										error={errors.category ? true : false}
										onChange={this.handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									{this.state.categories.map((item,id) =>{
										
										return (<Button
										variant="outlined"
										color="primary"
										type="submit"
										size="small"
										key={id}
										// startIcon={<CloudUploadIcon />}
										className={classes.uploadButton}
										onClick={this.categoryHandler}
									>
										{item}
									</Button>)
									})}
								</Grid>
                                <Grid item xs={6}>
									<TextField
										variant="outlined"
										required
                                        fullWidth
                                        type="number"
										id="productPrice"
										label="Product Price &#x20A6;"
										name="price"
										autoComplete="productPrice"
										helperText={errors.price}
										value={this.state.price}
										error={errors.price ? true : false}
										onChange={this.handleChange}
									/>
								</Grid>
                                <Grid item xs={6}>
                                    {/* <Button
										variant="outlined"
										color="primary"
										type="submit"
										size="small"
										startIcon={<CloudUploadIcon />}
										className={classes.uploadButton}
										onClick={this.imageHandler}
									>
										Upload Image
									</Button> */}
									<input required type="file" onChange={this.handleImageChange} />

									{this.state.errors.formImage && (
										<div className={classes.customError}>
											{' '} {this.state.errors.formImage}
											{/* Wrong Image Format || Supported Format are PNG and JPG */}
											{console.log(this.state.errors.formImage)}
										</div>
									)}
                                </Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="productDescription"
										label="Product Description"
										name="description"
										autoComplete="productDescription"
										multiline
										rows={25}
										rowsMax={25}
										helperText={errors.description}
										error={errors.description ? true : false}
										onChange={this.handleChange}
										value={this.state.description}
									/>
								</Grid>
							</Grid>
						</form>
					</Dialog>

					<Grid container spacing={2}>
						{this.state.products.map((product, id) => (
							<Grid className={classes.space} item xs={12} sm={6}>
								{/* <Card className={classes.root} variant="outlined">
									<CardContent>
										<Typography variant="h5" component="h2">
											{product.name}
										</Typography>
										<Typography className={classes.pos} color="textSecondary">
											{dayjs(product.createdAt).fromNow()}
										</Typography>
										<Typography variant="img2" component="p">
											{`${product.description.substring(0, 65)}`}
										</Typography>
									</CardContent>
									<CardActions>
										<Button size="small" color="primary" onClick={() => this.handleViewOpen({ product })}>
											{' '}
											View{' '}
										</Button>
										<Button size="small" color="primary" onClick={() => this.handleEditClickOpen({ product })}>
											Edit
										</Button>
										<Button size="small" color="primary" onClick={() => this.deleteProductHandler({ product })}>
											Delete
										</Button>
									</CardActions>
								</Card> */}
								<ProductCard 
									data={product} 
									type="dashboard"
									key={id} 
									// onClick={() => this.handleViewOpen({ product })}
									Edit={this.handleEditClickOpen}
									Delete={this.deleteProductHandler}
								/>
							</Grid>
						))}
					</Grid>

					<Dialog
						onClose={handleViewClose}
						aria-labelledby="customized-dialog-title"
						open={viewOpen}
						fullWidth
						classes={{ paperFullWidth: classes.dialogeStyle }}
					>
						<DialogTitle id="customized-dialog-title" onClose={handleViewClose}>
							{this.state.name}
						</DialogTitle>
						<DialogContent dividers>
							<TextField
								fullWidth
								id="productDescription"
								name="description"
								multiline
								readonly
								rows={1}
								rowsMax={25}
								value={this.state.description}
								InputProps={{
									disableUnderline: true
								}}
							/>
						</DialogContent>
					</Dialog>
				</main>
			);
		}
	}
}

export default withStyles(styles)(Products);