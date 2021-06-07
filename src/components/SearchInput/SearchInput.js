import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { useHistory } from 'react-router';
import './SearchInput.scss';

export const SearchInput = () => {

    const [keyword, setkeyword] = useState('');

    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();

        if (!keyword.trim()){
            return;
        }

        if (e.key === 'Enter' || e.key === undefined) {
            history.push(`/search/${keyword.trim()}`);
            setkeyword('');
        } 
    }
    

    const handleOnChange = (e) => {
        const validation = /^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;

        if (e.target.value === "" || validation.test(e.target.value)) {
            setkeyword(e.target.value);
        }
    }

    return (
        <Form className='d-flex search-container' onSubmit={ submitHandler }>
            <input className='search-input' type='text' value={ keyword } onChange={ handleOnChange } onSubmit={ submitHandler } placeholder="Buscar productos" />
            <Button type='submit' className='search-button'>
                <BsSearch size={18} className='search-icon' />
            </Button>
        </Form>
    );
}