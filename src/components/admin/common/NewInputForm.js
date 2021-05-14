import React from 'react';

import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';

import styles from './NewInputForm.module.scss';

function NewInputForm({ placeholder, addHandler }) {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Form>
      <FormGroup>
        <FormControl
          type="text"
          placeholder={placeholder}
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          type="submit"
          variant="no-margin"
          className={styles.plusButton}
          onClick={(e) => {
            e.preventDefault();
            addHandler(inputValue);
            setInputValue('');
          }}
        >
          <PlusCircle />
        </Button>
      </FormGroup>
    </Form>
  );
}

export { NewInputForm };
