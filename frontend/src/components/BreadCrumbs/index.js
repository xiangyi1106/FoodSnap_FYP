import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import './style.css';

const CustomBreadcrumbs = ({ breadcrumbs }) => {
    return (
        <div className='breadcrumb_wrapper'>
            <Breadcrumbs aria-label="breadcrumb" sx={{fontSize: '0.85rem'}}>
                {breadcrumbs.map((breadcrumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return isLast ? (
                        <Typography color="text.primary" key={breadcrumb.label} sx={{fontSize: '0.85rem'}}>
                            {breadcrumb.label}
                        </Typography>
                    ) : (
                        <Link
                            underline="hover"
                            color="inherit"
                            href={breadcrumb.href}
                            key={breadcrumb.label}
                        >
                            {breadcrumb.label}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </div>

    );
};

export default CustomBreadcrumbs;
