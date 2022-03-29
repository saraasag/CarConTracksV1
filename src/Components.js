import React from 'react';
import { Box, IconButton, Button, Typography, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles/style';
import pageRoutes from './pages/PageRoutes';


export const Title = () => {
  let classes = useStyles();

  return (
    <Box>
      <Box className={classes.title}>
        <Typography variant='h1'>CarRental</Typography>
      </Box>
      <Box className={classes.subtitle}>
        <Typography variant='subtitle1'>EECE 571G Project</Typography>
      </Box>
    </Box>
  );
}

export const Header = (props) => {
  let classes = useStyles();

  return (
    <Box className={classes.header}>
      <Button 
        className={classes.button} 
        size='large' 
        color='primary'
        variant='contained'
        disableElevation
        component={Link}
        to={pageRoutes.MainPage}>
        CarConTracks
      </Button>
    </Box>
  );
}

export const UserDataThumbnail = (props) => {
  const classes = useStyles();
  const userData = props.value;

  return (
    <Box className={classes.content}>
      <Box textAlign='center'>
        <Typography variant='h4'>{userData.userName}</Typography>
      </Box>
    </Box>
  );
}

// export const VerifyMetric = (props) => {
//   const classes = useStyles();
//   const userData = props.value;

//   return (
//     <Box className={classes.content}> 
//       <Box className={classes.verifyNumber} textAlign='center'>
//           <Typography variant='subtitle2'>
//             Verified By {userData.verifiedByNum} Accounts
//           </Typography>
//         </Box>
//       <Box className={classes.verifyNumber} textAlign='center'>
//         <Typography variant='subtitle2'>
//           Has Verified {userData.hasVerifiedNum} Accounts
//         </Typography>
//       </Box> 
//     </Box>
//   );
// }

export const Car = ({car}) => {
  const {isAvailable, ownerName, carLocation} = car;

  return (
    <Box width='100%' borderColor='text.secondary' borderBottom={1} textAlign='left'>
      <Typography variant='subtitle1'>
            {isAvailable ? ownerName.carOwner : carLocation.location}
      </Typography>
    </Box>
    
  )
}