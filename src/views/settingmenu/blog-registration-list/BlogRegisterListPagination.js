/**
 * Pagination Register List
 * @author v_hao
 * @create
*/

import React ,{useEffect} from 'react';
import {CCol, CRow, CPagination} from '@coreui/react';
import { useTranslation } from 'react-i18next';
const PaginationRegisterList=props=> {
    useEffect(() => {
    },);
    const { t } = useTranslation();
    return (<>
        <CRow>
            <CCol>
                { props.total > 0 &&
                    <div className={'mt-2'} >
                        <CPagination
                            activePage={props.page}
                            pages={props.pages}
                            dots={false}
                            arrows={false}
                            align="center"
                            firstButton={t('First page')}
                            lastButton={t('Last page')}
                            onActivePageChange={ (newPage) => {props.changePage(newPage) }}
                        >
                        </CPagination>
                    </div>
                }
            </CCol>
        </CRow>
    </>
    );
}
export default PaginationRegisterList;
