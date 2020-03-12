
import React from 'react';

const Pagination = ({ countryPerPage, totalCountry, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCountry / countryPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => paginate(number)} href='!#' className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;