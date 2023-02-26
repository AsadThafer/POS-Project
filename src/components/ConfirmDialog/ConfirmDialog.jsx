import React, { useState } from "react";
import "./ConfirmDialog.css";
import Button from "../Button/Button";

function ConfirmDialog(props) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
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
      <Button
        onClick={handleShowConfirm}
        design={props.type === "checkout" ? "checkout" : "delete"}
      >
        {props.type === "checkout"
          ? "Checkout"
          : props.type === "clear"
          ? "Clear Cart"
          : "delete"}
      </Button>
      {showConfirm && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className="confirm-popup" onClick={handleOverlayClick}>
          <div className="confirm-popup-content">
            <h2>
              {props.type === "checkout"
                ? "Checkout"
                : props.type === "clear"
                ? "Clear Cart"
                : "Delete"}
            </h2>

            <p>
              Are you sure you want to{" "}
              {props.type === "checkout"
                ? "checkout"
                : props.type === "clear"
                ? "clear"
                : "delete"}
              {props.type === "checkout" ? (
                <span> all items in cart?</span>
              ) : props.type === "clear" ? (
                <span> all items in cart?</span>
              ) : (
                <span> this item with id {props.id}??</span>
              )}
            </p>

            <Button
              design={props.type === "checkout" ? "checkout" : "delete"}
              onClick={handleConfirm}
            >
              Yes, {props.type === "checkout" ? "Checkout" : "Delete"}
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

export default ConfirmDialog;
