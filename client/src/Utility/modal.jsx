/** @format */
import React, { useState } from "react";
import { Button,Modal,ModalHeader,ModalBody,ModalFooter } from "reactstrap";

const ModalUtils = (props) => {
    const [modal,setmodal] = useState(false);
    const [bTitle] = useState(props.btitle);
    const [bColor] = useState(props.bcolor);
    const [bsize] = useState(props.bsize);
    const [msize] = useState(props.msize);
    const [mTitle] = useState(props.mtitle);
    const [mBody] = useState(props.mbody);
    const [mFooter] = useState(props.mfoot);
    const toggle = () => setmodal(!modal);
    return (
      <div>
        <Button onClick={toggle} toggle={toggle} color={bColor} size={bsize}>
          {bTitle}
        </Button>
        <Modal
          isOpen={modal}
          toggle={toggle}
          size={msize}
        >
          <ModalHeader>{mTitle}</ModalHeader>
          <ModalBody>
            {mBody}
          </ModalBody>
          <ModalFooter>
            {mFooter}
          </ModalFooter>
        </Modal>
      </div>
    );
}
export default ModalUtils;
