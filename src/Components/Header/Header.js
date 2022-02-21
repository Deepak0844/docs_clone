import "./Header.css";
import { useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

function Header() {
  //dialog box
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //dialog box

  return (
    <div className="header">
      <div className="headerLeft">
        <DescriptionIcon color="primary" fontSize="large" />
      </div>
      <div className="headerLeft">
        <Button onClick={() => setOpen(true)} variant="contained">
          <ShareIcon fontSize="small" />
          <p style={{ marginLeft: "5px" }}>share</p>
        </Button>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
        <AlertDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

function AlertDialog(props) {
  const { open, setOpen } = props;
  const handleDialogClose = () => {
    setOpen(false);
  };

  const copyFunction = () => {
    navigator.clipboard.writeText(window.location.href);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Get link"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Anyone on the internet with this link can view
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={copyFunction}>
            <b>Copy link</b>
          </Button>
          <Button onClick={handleDialogClose} autoFocus>
            <b>close</b>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Header;
