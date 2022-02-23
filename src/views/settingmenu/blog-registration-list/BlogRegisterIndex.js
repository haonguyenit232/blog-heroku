import React, { useEffect, useState, useCallback, useReducer } from 'react'
import './countr-register.scss'
import ComponentBlogRegister from './ComponentBlogRegister'
import api from '../../../API/API';
import message from '../../../common-message/commonMessage';
import BlogModalAdd from './BlogModalAdd'
import { withTranslation } from 'react-i18next'
import axios from 'axios';
import Confirmation from '../../../confirmation/Confirmation';
import { CCard } from '@coreui/react';

function LegacyWelcomeClass({ t }) {
  const [defaultPerPage, setDefaultPerPage] = useState("20")
  const [number, setNumber] = useState(0)
  const [countrData, setCountrData] = useState({
    title: "",
    content: "",
  })
  const [selectedFile, setSelectedFile] = useState(null);
  const [total, setTotal] = useState("")
  const [error, setError] = useState([])
  const [success, setSuccess] = useState([])
  const [btnSaveEdit, setBtnSaveEdit] = useState('Save')
  const [lastPage, setLastPage] = useState()
  const [deleteId, setDeleteId] = useState(0)
  const [actFlag, setActFlag] = useState({ isChecked: true });
  const [editID, setEditID] = useState("")
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [show, setShow] = useState(false);
  const [itemModal, setItemModal] = useState(false);
  const [errorModal, setErrorModal] = useState([]);
  const [page, setPage] = useState();
  const [pages, setPages] = useState();
  const [titleSearch, setTitleSearch] = useState("")
  const [contentSearch, setContentSearch] = useState("")
  const [selectFile, setSelectFile] = useState();
  const [clearPhotoFlag, setClearPhotoFlag] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const [flag, setFlag] = useState(true);
  /**
  * page load
  *
  * @author  v_hao
  * @create  22/02/2022 (D/M/Y)
  * @param
  * @return
  */
  useEffect(() => {
    getDataAPI();
  }, []);

  /**
  * If error or succes is changed, scroll automatically to top
  *
  * @author  v_hao
  * @create  22/02/2022 (D/M/Y)
  * @param
  * @return
  */
  useEffect(() => {
    if (error.length > 0 || success.length > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [error, success]);

  /**
  * Get Init data load from
  *
  * @author  v_hao
  * @create  22/02/2022 (D/M/Y)
  * @param
  * @return
  */
  const initState = {
    loading: false,
    data: [],
    error: null,
  }

  const blogReducer = (state, action) => {
    switch (action.type) {
      case 'GET_BLOG_REQUEST':
        return {
          ...state,
          loading: true,
        }
      case 'GET_BLOG_SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.data,
        }
      case 'GET_BLOG_ERROR':
        return {
          ...state,
          loading: false,
          data: [],
          error: action.data,
        }
      default:
        break;
    }
  }

  const [blog, blogDispatch] = useReducer(blogReducer, initState);
  const [countrTable, setCountrTable] = useState([]);
  const getDataAPI = useCallback(() => {
    blogDispatch({
      type: 'GET_BLOG_REQUEST'
    });

    setTimeout(() => {
      api.get('api/v1/blogs')
        .then((response) => {
          blogDispatch({
            type: 'GET_BLOG_SUCCESS',
            data: response
          });
          let data = response.data?.data;
          let page = response.data?.pagy
          setTotal(page.count)
          setLastPage(page.last)
          setNumber(page.from)
          setPage(page.page)
          setPages(page.pages)
          data && setCountrTable(data);
        })
        .catch(function (error) {
          blogDispatch({
            type: 'GET_BLOG_ERROR',
            data: error
          });
          setError(error)
          setSuccess('')
        })
    }, 2000);
  }, []);

  // data change in form save/update
  const dataChange = (e) => {
    setCountrData({
      ...countrData,
      [e.target.name]: e.target.value
    })
  }

  const actFlagChange = (e) => {
    setActFlag(e.target.value);
  }

  const searchChange = (e) => {
    let name = e.target.name
    switch (name) {
      case "title":
        setTitleSearch(e.target.value)
        break;
      case "content":
        setContentSearch(e.target.value)
        break;
      default:
        break;
    }
  }

  // validation check null or underfined
  const isEmpty = (val) => {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  const Save = (event) => {
    event.preventDefault()
    let err = []
    if (!countrData.title) {
      err.push(t(message.JSE001).replace('%s', t('Title')))
    }
    if (!countrData.content) {
      err.push(t(message.JSE001).replace('%s', t('Content')))
    }

    if (selectedFile && !selectFile.match(/\.(jpg|jpeg|png|gif)$/)) {
      err.push(t(message.JSE007).replace("%s", t("Upload Photo")));
    }

    if (err.length > 0) {
      setErrorModal(err); setSuccess([]); window.scrollTo(0, 0);
    } else {
      setErrorModal([]); setSuccess([]);
      setItemModal(!itemModal);
      (editID === "") ?
        setContent(t('Are you sure want to save?'))
        : setContent(t('Are you sure want to update?'))
      setType('save'); setShow(!show);
    }
  }

  /**
  * Save and update data
  *
  * @author  v_hao
  * @create  22/02/2022 (D/M/Y)
  * @param
  * @return
  */
  const saveOK = async () => {
    setFlag(false)
    setShow(!show); setType(''); setContent('');
    let url = '', method = '', msg = '';
    const formData = new FormData();
    formData.append("blog[title]", countrData.title);
    formData.append("blog[content]", countrData.content);
    formData.append("blog[image]", selectedFile);
    if (editID === "") {  // save
      url = 'https://api-placeholder.herokuapp.com/api/v1/blogs';
      method = 'post';
      msg = t(message.JSE005);
    } else { // update
      url = 'https://api-placeholder.herokuapp.com/api/v1/blogs/' + editID;
      method = 'put';
      msg = t(message.JSE006);
    }
    axios({
      method: method,
      url: url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        let successMsg = msg;
        setSuccess(successMsg);
        setBtnSaveEdit("Save")
        commonSearch(1, defaultPerPage);
        setCountrData({
          title: "", content: ""
        })
        clearPhoto();
      })
      .catch(function (error) {
        setSuccess('');
        setError(error)
      });
  }

  /**
  * edit data
  *
  * @author  v_hao
  * @create  22/02/2022 (D/M/Y)
  * @param
  * @return
  */
  const editCountry = async (id) => {
    setItemModal(!itemModal);
    setSuccess([]); setErrorModal([])
    setFlag(false)
    setEditID(id)
    api.get('api/v1/blogs/' + id)
      .then(function (response) {
        let edit = response.data
        setImagePreviewUrl(edit.image.url);
        setSelectFile(edit.image.url);
        setCountrData({
          title: edit.title,
          content: edit.content
        })
        setBtnSaveEdit("Update")
      })
      .catch(function (error) {
        setSuccess('');
        setError(error)
      })
  }

  /**
  * Search data
  *
  * @author  v_hao
  * @create  22/02/2022 (D/M/Y)
  * @param
  * @return
  */
  const commonSearch = async (page = 1, items = 20) => {
    setFlag(false)
    let teampSearch;
    if (!isEmpty(titleSearch) && !isEmpty(contentSearch)) {
      teampSearch = `&search=${titleSearch}` + `&search=${contentSearch}`
    } else if (!isEmpty(titleSearch) && isEmpty(contentSearch)) {
      teampSearch = `&search=${titleSearch}`
    } else if (isEmpty(titleSearch) && !isEmpty(contentSearch)) {
      teampSearch = `&search=${contentSearch}`
    } else if (isEmpty(titleSearch) && isEmpty(contentSearch)) {
      teampSearch = `&search=`
    }

    const url = `${`api/v1/blogs`}` +
      `?page=${page}` +
      `&items=${items}` + teampSearch +
      `&sort_by=${'created_at'}` +
      `&sort_direction=${'desc'}`;
    api.get(url)
      .then(function (response) {
        let data = response.data?.data;
        let page = response.data?.pagy
        setPage(page.page)
        setPages(page.pages)
        setTotal(page.count)
        setLastPage(page.last)
        setNumber(page.from)
        data && setCountrTable(data);
      })
      .catch(function (error) {
        setSuccess('');
        setError(error);
      })
  }

  const deleteData = (id) => {
    if (id) {
      setContent(t('Are you sure want to delete?'));
      setType('delete'); setShow(!show); setError([]); setSuccess([]);
      setDeleteId(id)
    }
  }

  /**
 * Delete data
 *
 * @author  v_hao
 * @create  22/02/2022 (D/M/Y)
 * @param
 * @return
 */
  const deleteOK = async () => {
    setFlag(false)
    if (deleteId !== "") {
      setShow(!show); setContent(''); setType('');
      api.delete('api/v1/blogs/' + deleteId)
        .then((response) => {
          setError('');
          commonSearch(page, defaultPerPage);
          let successMsg = t(message.JSE003);
          setSuccess(successMsg);
        })
        .catch(function (error) {
          setError(error);
          setSuccess('');
        })
    }
  }

  const changePage = (newPage) => {
    setFlag(false)
    setPage(newPage);
    commonSearch(newPage, defaultPerPage);
  }

  const addToggleAlert = (e) => {
    setItemModal(!itemModal);
  }

  const closeItemModal = (e) => {
    setFlag(false)
    setItemModal(!itemModal);
    setCountrData({
      title: "", content: ""
    })
    setErrorModal([]);
    setSelectedFile("");
    setImagePreviewUrl("");
    setSelectFile("");
    setClearPhotoFlag(true);
  }

  const onImageChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    setSelectFile("");
    setImagePreviewUrl("");
    setSelectedFile("")
    if (file) {
      setClearPhotoFlag(false);
      reader.onloadend = () => {
        setSelectedFile(file);
        setImagePreviewUrl(reader.result);
        setSelectFile(file.name);
      };
      reader.readAsDataURL(file);
    }
  }

  const clearPhoto = (e) => {
    setSelectedFile("");
    setImagePreviewUrl("");
    setSelectFile("");
    setClearPhotoFlag(true);
  };

  return (
    <>
      {
        error != "" &&
        <CCard className="custom-card error p-3 mt-4 mb-3">
          {
            error.map((data, index) => {
              return (
                <div key={index} className="msg">{data}</div>
              )
            })
          }
        </CCard>
      }
      {
        success != "" &&
        <CCard className="custom-card success p-3 mt-4 mb-3">
          <div className="msg">{success}</div>
        </CCard>

      }
      {flag &&
        <CCard className="custom-card success p-3 mt-4 mb-3">
          {blog.loading ? <p>{t('Loading....')}</p> : <p>{t('Loading Success')}</p>}
        </CCard>
      }
      <Confirmation
        content={content}
        okButton={t('Ok')}
        cancelButton={t('Cancel')}
        type={type}
        show={show}
        cancel={() => setShow(!show)}
        saveOK={saveOK}
        deleteOK={deleteOK}
      />
      <ComponentBlogRegister
        t={t} searchChange={searchChange} titleSearch={titleSearch} contentSearch={contentSearch}
        countrTable={countrTable} number={number} deleteData={deleteData}
        editCountry={editCountry} lastPage={lastPage} addToggleAlert={addToggleAlert}
        defaultPerPage={defaultPerPage} changePage={changePage} total={total}
        actFlag={actFlag} actFlagChange={actFlagChange} page={page} pages={pages} search={commonSearch}
      />
      <BlogModalAdd
        t={t} countrData={countrData} dataChange={dataChange}
        itemModal={itemModal} closeItemModal={closeItemModal} clearPhotoFlag={clearPhotoFlag}
        errorModal={errorModal} selectFile={selectFile} clearPhoto={clearPhoto}
        onImageChange={onImageChange} selectedFile={selectedFile}
        Save={Save} btnSaveEdit={btnSaveEdit} imagePreviewUrl={imagePreviewUrl}
      />
    </>
  );
}

export default withTranslation()(LegacyWelcomeClass)
