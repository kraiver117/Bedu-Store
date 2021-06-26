import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import './PaginationComponent.scss';

export const PaginationComponent = ({ page, totalPages, center, keyword = '', category= '' }) => {
    const { location: { pathname } } = useHistory();

    return totalPages > 1 && (
        <Pagination size='md' className={center && 'justify-content-center'}>
            {[...Array(totalPages).keys()].map(x => (
                <LinkContainer
                    key={x + 1}
                    to={(pathname.includes('store')) ? `/store/${x + 1}?category=${category || 'Todas'}` : `/search/${keyword}/page/${x + 1}`}
                >
                    <Pagination.Item active={x + 1 === page} style={{backgroundColor: 'orange'}}>
                        {x + 1}
                    </Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    );
}
