import React from 'react';
import { Markup } from 'interweave';
import { CCard } from '@coreui/react';

const Message = props => {
    return (
        <>
            {
                // to show error message
                props.error?.length > 0 &&
                <CCard className="custom-card error p-3 mb-3">
                    {
                        props.error.map((data, index) => {
                            return (
                                <div key={index} >
                                    <Markup content={data} />
                                </div>
                            )
                        })
                    }
                </CCard>
            }

            {
                // to show error message
                props.error2?.length > 0 &&
                <CCard className="custom-card error p-3 mb-3">
                    {
                        props.error2.map((data, index) => {
                            return (
                                <div key={index} >
                                    <Markup content={data} />
                                </div>
                            )
                        })
                    }
                </CCard>
            }

            {
                // to show success message
                props.success?.length > 0 &&
                <CCard className="custom-card success p-3 mb-3">
                    {
                        props.success.map((data, index) => {
                            return (
                                <div key={index} >
                                    <Markup content={data} />
                                </div>
                            )
                        })
                    }
                </CCard>
            }
        </>
    )
}
export default Message
