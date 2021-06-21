import React, { useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
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
        <>
        <Form className="mx-auto form-search" onSubmit={ submitHandler }>
        <InputGroup className="">
            <FormControl
                className="search-input"
                placeholder="Buscar productos"                
                aria-label="Buscar productos"
                aria-describedby="basic-addon2"
                value={ keyword } onChange={ handleOnChange } onSubmit={ submitHandler }
            />
            <Button variant="outline-secondary" id="button-addon2" className="search-button-2 bg-white">
                <BsSearch size={18}></BsSearch>
            </Button>
        </InputGroup> 
        </Form>
        </>
    );
}