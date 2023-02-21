import React from "react";
import Button from "./components/Button/Button";
import { useConfirm } from "material-ui-confirm";

const Deleteconfirm = () => {
  const confirm = useConfirm();

  const handleClick = () => {
    confirm({ description: "This action is permanent!" })
      .then(() => {
        /* ... */
      })
      .catch(() => {
        /* ... */
      });
  };

  return <Button onClick={handleClick}>Click</Button>;
};

export default Deleteconfirm;
