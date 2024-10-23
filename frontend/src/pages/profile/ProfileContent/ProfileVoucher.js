import React from 'react'
import Voucher from './Voucher'

export default function ProfileVoucher() {
    return (
        <div className='profile_card'>
            <div className='profile_card_header'>
                Voucher
            </div>
            <div className='profile_card_grid' style={{gridTemplateColumns: 'repeat(2, 1fr)'}}>
            <Voucher />
            <Voucher />
            <Voucher />

            </div>
        </div>
    )
}
