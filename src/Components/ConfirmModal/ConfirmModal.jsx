import React from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';

function ConfirmModal({ 
    isModal, 
    setIsModal, 
    handleDelete,
    deleteData
}) {
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={isModal} onHide={() => setIsModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{deleteData.messageTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{deleteData.message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsModal(false)}>
                        {deleteData.leftBtnText}
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        {deleteData.righttBtnText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
  
export default ConfirmModal;