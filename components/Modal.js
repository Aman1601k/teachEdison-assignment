import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Rating from "@mui/material/Rating";
import { TextField } from "@mui/material";

export default function BasicModal({ handleClose, open, setOpen }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const buttonStyle = {
    marginTop: "10px",
  };
  const [value, setValue] = React.useState(2);
  const [comments, setComments] = React.useState("");

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Would You like to give some Ratings and Comments?
          </Typography>

          <Box>
            <TextField
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              id="outlined-basic"
              label="Comment"
              variant="outlined"
            />
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>

          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            sx={buttonStyle}
          >
            <Button color="secondary" onClick={() => setOpen(false)}>Send</Button>
            <Button color="error" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </div>
  );
}
