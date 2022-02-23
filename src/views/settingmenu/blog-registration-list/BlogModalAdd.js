/**
 * Blog Modal Add
 * @author v_hao
 * @create
*/

import { CButton, CCard, CCardBody, CCol, CFormGroup, CInput, CLabel, CModal, CModalBody, CModalHeader, CRow, CTextarea } from "@coreui/react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const BlogModalAdd = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });
    let {
        itemModal,
        closeItemModal,
    } = props
    return (
        <>
            <div className="modal-header-custom">
                <CModal
                    centered
                    closeOnBackdrop={false}
                    className="addModal"
                    htmlFor="addBtn"
                    size="xl"
                    show={itemModal}
                    onClose={closeItemModal}
                >
                    <CModalHeader>
                        <h3>{t('Blog Registration List')}</h3>
                    </CModalHeader>
                    <CModalBody>
                        {props.errorModal && props.errorModal.length > 0 &&
                            <CCard className="custom-card error p-3 mb-5">
                                {
                                    props.errorModal.map((data, index) => {
                                        return (
                                            <div key={index} className="msg">
                                                {data}
                                            </div>
                                        )
                                    })}
                            </CCard>
                        }
                        <CCardBody>
                            <CCard>
                                <CRow>
                                    <CCol className="" lg="6">
                                        <CFormGroup>
                                            <CLabel Image htmlFor="contr-code" className="font-weigth">{props.t('Title')}<span className="require">*</span></CLabel>
                                            <CInput id="contr-code" name="title"
                                                onChange={props.dataChange} value={props.countrData.title} />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol lg="6" className="mb-4" >
                                        <CLabel htmlFor="emp-id-content" className="font-weigth">{props.t("Content")}<span className="require">*</span></CLabel>
                                        <div className="input-emp-list">
                                            <CTextarea name="content" className="textbox-lines" maxLength="300" onChange={props.dataChange} rows="2" style={{ color: "currentColor" }} value={props.countrData.content}></CTextarea>
                                        </div>
                                    </CCol>
                                </CRow>
                                <CFormGroup row>
                                    <CCol md="2">
                                        <CLabel htmlFor="photo" className="font-weigth">{props.t("Upload Photo")}</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="4" style={{ marginLeft: "-15px" }}>
                                        <input
                                            accept="image/*"
                                            data-type="image"
                                            className="custom-file-input"
                                            id="photo"
                                            onChange={(e) => props.onImageChange(e)}
                                            name="photo"
                                            type="file"
                                        />
                                        <label className="custom-file-label" htmlFor="file-input">
                                            {props.selectFile
                                                ? props.selectFile.substring(0, 9).concat("...")
                                                    .concat(props.selectFile.substring(props.selectFile.length - 10, props.selectFile.length))
                                                : props.t("Click to upload")}
                                        </label>
                                    </CCol>
                                    <CCol xs="12" md="2">
                                        <CButton className="form-btn m-save-btn" onClick={props.clearPhoto}>
                                            {props.t("Remove Image")}
                                        </CButton>
                                    </CCol>
                                    <CCol xs="12" md="2">
                                        {props.imagePreviewUrl && (
                                            <div className="imgPreview position-absolute">
                                                <img width="60%" src={props.imagePreviewUrl} alt={props.selectFile} />
                                            </div>
                                        )}
                                    </CCol>
                                </CFormGroup>
                            </CCard>
                            <br></br>
                            <CRow style={{ textAlign: "center" }}>
                                {
                                    <CCol>
                                        <CButton className="form-btn m-save-btn" type="submit" onClick={(e) => props.Save(e)}>
                                            {props.t(props.btnSaveEdit)}
                                        </CButton>
                                        <CButton style={{ marginRight: "-15px" }} className="form-btn m-save-btn ml-3" type="submit" onClick={(e) => props.closeItemModal(e)}>
                                            {t('Close')}
                                        </CButton>
                                    </CCol>
                                }
                            </CRow>
                        </CCardBody>
                    </CModalBody>
                </CModal>
            </div>
        </>
    )
}
export default BlogModalAdd;
