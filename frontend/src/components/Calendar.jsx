import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  AllDayPanel,
  AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui';

const PREFIX = 'Demo';

const classes = {
  container: `${PREFIX}-container`,
  text: `${PREFIX}-text`,
};

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  [`&.${classes.button}`]: {
    color: theme.palette.background.default,
    padding: 0,
  },
}));

const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.container}`]: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    justifyContent: 'flex-end',
  },
  [`& .${classes.text}`]: {
    ...theme.typography.h6,
    marginRight: theme.spacing(2),
  },
}));


const LocaleSwitcher = (
  ({ onLocaleChange, currentLocale }) => (
    <StyledDiv className={classes.container}>
      <div className={classes.text}>
        Locale:
      </div>
      <TextField
        select
        variant="standard"
        value={currentLocale}
        onChange={onLocaleChange}
      >
      </TextField>
    </StyledDiv>
  )
);

const Appointment = ({
  children, style, ...restProps
}) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: '#FDB120',
      borderRadius: '8px',
    }}
  >
    <React.Fragment>
      <StyledIconButton
        className={classes.button}
        onClick={({ target }) => {
          toggleVisibility();
          onAppointmentMetaChange({ target: target.parentElement.parentElement, data });
        }}
        size="large"
      >
        <InfoIcon fontSize="small" />
      </StyledIconButton>
      {children}
    </React.Fragment>
  </Appointments.Appointment>
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.events,
      currentDate: new Date(),
      locale: 'en-US',
      visible: false,
      appointmentMeta: {
        target: null,
        data: {},
      },
    };

    this.toggleVisibility = () => {
      const { visible: tooltipVisibility } = this.state;
      this.setState({ visible: !tooltipVisibility });
    };
    this.onAppointmentMetaChange = ({ data, target }) => {
      this.setState({ appointmentMeta: { data, target } });
    };
    this.myAppointment = this.myAppointment.bind(this);
  }

  myAppointment(props) {
    return (
      <Appointment
        {...props}
        toggleVisibility={this.toggleVisibility}
        onAppointmentMetaChange={this.onAppointmentMetaChange}
      />
    );
  }

  render() {
    const { data, currentDate, locale, appointmentMeta, visible } = this.state;


    return (
      <div>
        <Paper>
          <Scheduler
            data={data}
            locale={locale}
            height={450}
          >
            <ViewState
              defaultCurrentDate={currentDate}
            />
            <WeekView
              startDayHour={9}
              endDayHour={24}
            />
            <Toolbar />
            <DateNavigator />
            <Appointments appointmentComponent={Appointment}/>
            <AppointmentTooltip
            showCloseButton
            visible={visible}
            onVisibilityChange={this.toggleVisibility}
            appointmentMeta={appointmentMeta}
            onAppointmentMetaChange={this.onAppointmentMetaChange}
          />
            <AllDayPanel />
          </Scheduler>
        </Paper>
      </div>
    );
  }
}
