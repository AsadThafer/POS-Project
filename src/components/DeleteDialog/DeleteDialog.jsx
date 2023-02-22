import React, { useState } from "react";
import "./DeleteDialog.css";
import Button from "../Button/Button";

function DeleteDialog(props) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(false);
    if (props.onConfirm) {
      props.onConfirm();
    }
  };

  const handleShowConfirm = () => {
    setShowConfirm(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleOverlayClick = (event) => {
    // Check if the event target is the overlay div
    if (event.target.className === "confirm-popup") {
      setShowConfirm(false);
    }
  };

  return (
    <>
      <Button design="delete" onClick={handleShowConfirm}>
        Delete
      </Button>
      {showConfirm && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className="confirm-popup" onClick={handleOverlayClick}>
          <div className="confirm-popup-content">
            <p>Are you sure you want to delete item with id {props.id}?</p>
            <Button design="delete" onClick={handleDelete}>
              Yes, Delete
            </Button>
            <Button design="cancel" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteDialog;
