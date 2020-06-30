import React, { Component } from 'react'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'

import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
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
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      dob: '',
    }
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleDate = this.handleDate.bind(this)
  }

  handleDate = (date) => {
    const momentObject = moment().toDate()
    const formattedDate = moment(momentObject).format('MM/DD/YYYY')
    this.setState({ dob: formattedDate })
  }

  handleStateChange = (name, e) => {
    this.setState({ [name]: e.target.value })
  }

  render() {
    const { classes } = this.props
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
            <React.Fragment>
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
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <KeyboardDatePicker
                    placeholder="06/30/2020"
                    value={''}
                    onChange={(date) => this.handleDate(date)}
                    format="MM/dd/yyyy"
                  />
                </Grid>
              </Grid>
            </React.Fragment>
          </Paper>
        </main>
      </MuiPickersUtilsProvider>
    )
  }
}

export default withStyles(styles, { withTheme: true })(App)
