/**
 * Component Blog Register
 * @author v_hao
 * @create
*/

import React from 'react'
import {
  CButton, CCard, CCardBody, CCol, CFormGroup, CInput, CLabel, CRow, CForm, CTooltip, CTextarea
} from '@coreui/react'
import { useTranslation } from 'react-i18next';
import PaginationRegisterList from './BlogRegisterListPagination';

const ComponentBlogRegister = (props) => {
  const { t } = useTranslation();
  let number = props.number

  return (
    <CRow>
      <CCol xs="12" md="12">
        <CCard>
          <div className="add-css-update d-flex">
            <input
              type="image"
              autoFocus={true}
              id="imgIconAdd"
              src={"avatars/Add Allowance .png"}
              className="icon-add"
              alt="add"
              onClick={props.addToggleAlert}
            />
            <h2 className="">{t('Blog Registration List')} </h2>
          </div>
          <CCardBody>
            <CForm id="countr_register" action="" method="post" className="form-horizontal">
              <CRow>
                <CCol xs="12" md="6">
                  <CFormGroup>
                    <CLabel htmlFor="emp-id-title" className="font-weigth">{props.t("Title")}</CLabel>
                    <CInput id="emp-id-title" name="title" value={props.titleSearch}
                      onChange={props.searchChange}
                    />
                  </CFormGroup>
                </CCol>
                <CCol lg="6" className="mb-4" >
                  <CLabel htmlFor="emp-id-content" className="font-weigth">{props.t("Content")}</CLabel>
                  <div className="input-emp-list">
                    <CTextarea name="content" className="textbox-lines" maxLength="100" onChange={props.searchChange} rows="2" style={{ color: "currentColor" }} value={props.contentSearch ? props.contentSearch : ""}></CTextarea>
                  </div>
                </CCol>
              </CRow>
              <CRow style={{ textAlign: "center" }}>
                <CCol xs="12">
                  <CFormGroup>
                    <CButton className="form-btn m-save-btn" onClick={() => props.search()} >
                      {props.t("Search")}
                    </CButton>
                  </CFormGroup>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
        {props.countrTable.length > 0 &&
          <CRow id="table">
            <CCol lg="12">
              <div style={{ color: "#046C0A" }}>{t("Total Rows") + props.total}</div>
              <div className="table-responsive">
                <table className="table user-list-table" id="user-list-table">
                  <thead id="thead-id">
                    <tr>
                      <th>{props.t('No')}</th>
                      <th>{props.t('Title')}</th>
                      <th>{props.t('Content')}</th>
                      <th>{props.t('Image')}</th>
                      <th colSpan="2" width="130px">{props.t('Action')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      props.countrTable.map((dept, index) => {
                        return (
                          <tr key={index} value={dept.id}>
                            <td className="no">{number++}</td>
                            <td className="code">{dept.title}</td>
                            <td className="name">{dept.content}</td>
                            <img
                              src={dept.image.url}
                              alt='Player'
                              style={{ textAlign: "center", display: "block", width: "100%", height: "100%" }}
                            />
                            <td className="user-list-table btn-action" id="edit-btn">
                              <CTooltip content={props.t("Edit")}>
                                <CButton size="sm" className="edit-btn" onClick={() => props.editCountry(dept.id)}>
                                  <img alt="edit" className="span-icon" src="/image/edit.png" width="15px" />
                                </CButton>
                              </CTooltip>
                            </td>
                            <td className="user-list-table btn-action del-txt" id="delete-btn">
                              <CTooltip content={props.t("Delete")}>
                                <CButton size="sm" className="delete-btn" onClick={() => props.deleteData(dept.id)}>
                                  <img alt="delete" className="span-icon" src="/image/delete.png" width="15px" />
                                </CButton>
                              </CTooltip>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
                <br />
              </div>
            </CCol>
          </CRow>
        }
        <PaginationRegisterList
          rowCount={props.rowCount}
          defaultPerPage={props.defaultPerPage}
          total={props.total}
          page={props.page}
          pages={props.pages}
          changePage={props.changePage} />
      </CCol>
    </CRow>
  );
}
export default ComponentBlogRegister