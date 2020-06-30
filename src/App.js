import React, { Component } from 'react'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import Dialog from '@material-ui/core/Dialog'
import isEmpty from 'lodash/isEmpty'
import PhoneInput from 'mui-phone-input'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import TextField from '@material-ui/core/TextField'

import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  appBar: {
    position: 'relative',
  },
  subtitle: {
    marginTop: theme.spacing(5),
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  customMargin: {
    marginTop: theme.spacing(2),
  },
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      dob: '',
      phone: '',
      checkedYes: false,
      checkedNo: false,
      healthConcerns: '',
      pcpName: '',
      currentHealthConcern: '',
      formSubmitted: false,
      previousSymptoms: [],
      previousHealthConcerns: [],
    }
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handlePhone = this.handlePhone.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddToHistory = this.handleAddToHistory.bind(this)
  }

  handleDate = (date) => {
    const momentObject = moment().toDate()
    const formattedDate = moment(momentObject).format('MM/DD/YYYY')
    this.setState({ dob: formattedDate })
  }

  handlePhone = (phone) => {
    this.setState({ phone })
  }

  handleStateChange = (name, e) => {
    this.setState({ [name]: e.target.value })
  }

  handleCheckbox(e) {
    const { name } = e.target
    if (name === 'Yes') {
      this.setState({ checkedYes: true, checkedNo: false })
    } else if (name === 'No') {
      this.setState({ checkedYes: false, checkedNo: true })
    }
  }

  handleSubmit = () => {
    this.handleClickOpen()
  }

  handleClickOpen = () => {
    this.setState({ formSubmitted: true })
  }

  handleClose = () => {
    this.setState({ formSubmitted: false })
  }

  handleAddToHistory = () => {
    const { healthConcerns, currentHealthConcern } = this.state
    if (isEmpty(healthConcerns) || isEmpty(currentHealthConcern)) {
      alert('Sorry there is not history for this patient')
    } else {
      this.setState({
        previousSymptoms: [...this.state.previousSymptoms, healthConcerns],
      })
      this.setState({
        previousHealthConcerns: [
          ...this.state.previousHealthConcerns,
          currentHealthConcern,
        ],
      })
    }
  }

  render() {
    const { classes } = this.props
    const {
      firstName,
      lastName,
      dob,
      phone,
      checkedYes,
      checkedNo,
      pcpName,
      formSubmitted,
      healthConcerns,
      currentHealthConcern,
      previousSymptoms,
      previousHealthConcerns,
    } = this.state
    const disabled =
      isEmpty(firstName) || isEmpty(lastName) || isEmpty(dob) || isEmpty(phone)

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Catasys Assessment App
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Assessment Form
            </Typography>
            <>
              <Typography
                variant="h6"
                gutterBottom
                className={classes.subtitle}
              >
                Patient Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(e) => {
                      this.handleStateChange('firstName', e)
                    }}
                    value={firstName}
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    onChange={(e) => {
                      this.handleStateChange('lastName', e)
                    }}
                    value={lastName}
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.customMargin}>
                  <KeyboardDatePicker
                    placeholder="06/30/2020"
                    value={dob}
                    helperText={''}
                    onChange={(date) => this.handleDate(date)}
                    format="MM/dd/yyyy"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PhoneInput onChange={(val) => this.handlePhone(val)} />
                </Grid>
              </Grid>
            </>
            <>
              <Typography
                variant="h6"
                gutterBottom
                className={classes.subtitle}
              >
                Care Information
              </Typography>

              <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.subtitle}
              >
                Are you currently under a PCP (check box yes no)
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedYes}
                      onChange={(e) => {
                        this.handleCheckbox(e)
                      }}
                      name="Yes"
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedNo}
                      onChange={(e) => {
                        this.handleCheckbox(e)
                      }}
                      name="No"
                      color="primary"
                    />
                  }
                  label="No"
                />
              </FormGroup>
              {checkedYes && (
                <>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    className={classes.subtitle}
                  >
                    PCP name text field
                  </Typography>
                  <TextField
                    onChange={(e) => {
                      this.handleStateChange('pcpName', e)
                    }}
                    value={pcpName}
                    required
                    id="pcpName"
                    name="pcpName"
                    label="Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    className={classes.subtitle}
                  >
                    Health Concerns and Symptoms
                  </Typography>
                  <TextareaAutosize
                    aria-label="minimum height"
                    style={{ width: '500px' }}
                    rowsMin={5}
                    onChange={(e) => {
                      this.handleStateChange('healthConcerns', e)
                    }}
                    placeholder="Write Concerns and Symptoms here"
                  />
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    className={classes.subtitle}
                  >
                    What are your current health concerns?
                  </Typography>
                  <TextareaAutosize
                    aria-label="minimum height"
                    style={{ width: '500px' }}
                    rowsMin={5}
                    onChange={(e) => {
                      this.handleStateChange('currentHealthConcern', e)
                    }}
                    placeholder="Write current health concerns heres"
                  />
                </>
              )}
            </>

            <Button
              variant="contained"
              color="primary"
              disabled={disabled}
              onClick={() => {
                this.handleAddToHistory()
              }}
              className={classes.button}
            >
              Add to History
            </Button>

            <Button
              variant="contained"
              color="primary"
              disabled={disabled}
              onClick={this.handleSubmit}
              className={classes.button}
            >
              Submit
            </Button>
          </Paper>
          {/*history dialog section*/}
          <>
            <Dialog
              onClose={this.handleClose}
              aria-labelledby="customized-dialog-title"
              open={formSubmitted}
            >
              <DialogTitle
                id="customized-dialog-title"
                onClose={this.handleClose}
              >
                History
              </DialogTitle>
              <DialogContent dividers>
                <Typography variant="subtitle1" gutterBottom>
                  FirstName : {firstName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  LastName : {lastName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Date of Birth : {dob}
                </Typography>
                {!isEmpty(pcpName) && (
                  <Typography variant="subtitle1" gutterBottom>
                    PCP Name : {pcpName}
                  </Typography>
                )}

                {!isEmpty(healthConcerns) && (
                  <Typography variant="body1" gutterBottom>
                    HealthConcerns : {healthConcerns}
                  </Typography>
                )}
                {!isEmpty(currentHealthConcern) && (
                  <Typography variant="body1" gutterBottom>
                    Current Health Concerns : {currentHealthConcern}
                  </Typography>
                )}
                {this.state.previousSymptoms.length > 0 &&
                  this.state.previousHealthConcerns.length > 0 && (
                    <>
                      <Typography variant="h6" gutterBottom>
                        Previously Submitted Data
                      </Typography>
                      {previousSymptoms.map((symptoms, index) => (
                        <Typography variant="body1" gutterBottom>
                          HealthConcerns : {symptoms}
                        </Typography>
                      ))}
                      {previousHealthConcerns.map((concerns, index) => (
                        <Typography variant="body1" gutterBottom>
                          previousHealthConcerns : {concerns}
                        </Typography>
                      ))}
                    </>
                  )}
              </DialogContent>
            </Dialog>
          </>
        </main>
      </MuiPickersUtilsProvider>
    )
  }
}

export default withStyles(styles, { withTheme: true })(App)
