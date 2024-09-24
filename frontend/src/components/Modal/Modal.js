import React from 'react'
import { CButton, CModalBody, CModalFooter, CModalHeader, CModalTitle, CModal } from '@coreui/react';

export default function Modal({title, content, btn1, btn2, visible, setVisible, onConfirm}) {
    return (
      <>
        <CModal
          alignment="center"
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="VerticallyCenteredExample"
        >
          <CModalHeader>
            <CModalTitle id="VerticallyCenteredExample">{title}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {content}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              {btn1}
            </CButton>
            <CButton color="primary" onClick={() => { setVisible(false); onConfirm(); }}>{btn2}</CButton>
          </CModalFooter>
        </CModal>
      </>
    )
}
