import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const SimpleModal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          backgroundColor: 'white',
          padding: 20,
        }}
      >
        <h2 id="simple-modal-title">{title}</h2>
        <div id="simple-modal-description">{children}</div>
      </div>
    </Modal>
  );
};

export default SimpleModal;