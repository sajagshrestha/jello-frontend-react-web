import React from 'react';
import {Button, TextField} from '@mui/material';

export const Signup: React.FC = () => {
    return (
        <div>
            <TextField label="Username" variant="outlined" />
            <TextField label="Email" variant="outlined" />
            <TextField label="Password" variant="outlined" />
            <Button>Sign up</Button>
        </div>
    );
};

export default Signup;
