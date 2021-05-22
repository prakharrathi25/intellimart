import React from "react";
import "./StoreInfo.css";
import "../../views/Stores/Stores";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

const StoreInfo = (show, toggle, id) => {
  

  return (
    <Dialog open={show} onClose={toggle} maxWidth="md" fullWidth={true}>
      <DialogTitle>STORE NAME</DialogTitle>
      <DialogContent>
        <DialogContentText>What do you wanna do next?</DialogContentText>
        {/* <input name="taskName" value={taskName} onChange={handleChange}/>
        <input name="category"value={category} onChange={handleChange}/>
        <button className="task-submit"onClick={handleSave}>Create</button> */}
      </DialogContent>
    </Dialog>
  );
};

export default StoreInfo;
