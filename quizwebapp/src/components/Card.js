import { Box } from "@mui/system";
import React from "react";
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

const card = (
    <React.Fragment>
        <CardHeader>
            <Typography>
            </Typography>
        </CardHeader>
        <CardContent>
            <Typography>
            </Typography>
        </CardContent>
    </React.Fragment>
);

export default function quizCard(){
    return(
        <Box>
            <Card variant="outlined">{card}</Card>
        </Box>
    )
}