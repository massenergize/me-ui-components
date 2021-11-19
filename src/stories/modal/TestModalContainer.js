import React, { useState } from "react";
import Modal from "./Modal";

export default function TestModalContainer() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle Modal</button>
      {show && <Modal />}
    </div>
  );
}
