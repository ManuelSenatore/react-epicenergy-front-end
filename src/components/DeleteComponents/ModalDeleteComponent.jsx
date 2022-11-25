import React , { useEffect , useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDeleteComponent = (props) => {

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header style={{color: "red"}} closeButton>
                    <Modal.Title>ELIMINAZIONE</Modal.Title>
                </Modal.Header>
                <Modal.Body>Sei sicuro di voler eliminare l'elemento? questa azione è irreversibile!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Annulla
                    </Button>
                    <Button variant="danger" onClick={() => {
                        props.deleteFattura()
                        props.handleClose()
                    }}>
                        Conferma Eliminazione
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteComponent;