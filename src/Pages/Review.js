import React from 'react'
import './review.css'

const Review = () => {
    return (
        <>
            <div className="review d-flex" style={{  marginBottom: '20px' }}>
                <div className="review_head head">
                    <h4>Review</h4>
                </div>
                <div className="review_head col-md-2">
                    <input type="text" className="form-control" id="price" placeholder='Type review Code' />
                </div>
            </div>
            <div style={{ marginLeft: '20px', marginRight: '20px' }}>
                <div className="review_info">
                    <table>
                        <tr>
                            <th>#</th>
                            <th>Product Rating</th>
                            <th>Customer</th>
                            <th>Comment</th>
                            <th>Published</th>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Review