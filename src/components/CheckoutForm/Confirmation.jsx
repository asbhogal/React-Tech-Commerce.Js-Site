/* import { Typography, Divider, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

let Confirmation = () => order.customer ? (
    <>
        <div>
            <Typography variant="h5">Thank you for your purchase, First Name, Last Name. You will receive a confirmation email shortly.</Typography>
            <Divider className={ classes.divider } />
            <Typography variant="subtitle2">Order ref: Ref</Typography>
        </div>
        <br />
        <Button component={ Link } to="/" variant="outlined" type="button">Back To Home</Button>
    </>
) : (
    <div className={ classes.spinner }>
        <CircularProgress />
    </div>
);

if (error) {
    <>
        <Typography variant="h5">Error: { error} </Typography>
        <br />
        <Button component={ Link } to="/" variant="outlined" type="button">Back To Home</Button>
    </>
}

export default Confirmation; */