import React from 'react';
import {CRow,CButton,CModal,CModalBody,CButtonToolbar} from '@coreui/react';

const Confirmation = props => {
    return (
        <>
            <CModal centered closeOnBackdrop={false} show={props.show}>
                <CModalBody className="m-body">
                    <CRow className="confirm-header mt-3" alignHorizontal="center">
                        {
                            !Array.isArray(props.content) &&
                            <p className="modal-p text-center">{props.content}</p>
                        }
                        {
                            Array.isArray(props.content) && 
                            props.content.map((data, index) => {
                                return(
                                    <div key={index} >
                                        {data}
                                        <br/>
                                    </div>
                                )
                            })
                        }
                    </CRow>
                    <CButtonToolbar className="confirm-body" justify="center">
                        <CButton className="confirm-btn" onClick={
                            (props.type === 'save') ? props.saveOK :
                            (props.type === 'update') ? props.updateOK :
                            (props.type === 'delete') ? props.deleteOK :
                            (props.type === 'edit') ? props.editOK :
                            (props.type === 'active') ? props.activeOK : props.inactiveOK
                        }>{props.okButton}</CButton>
                    <CButton className="confirm-btn" onClick={props.cancel}>{props.cancelButton}</CButton>
                    </CButtonToolbar>
                </CModalBody>
            </CModal>
        </>
    )
}
export default Confirmation
