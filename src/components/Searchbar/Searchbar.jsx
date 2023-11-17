// UNDONE Компонент принимает один проп
// UNDONE onSubmit - функцию для передачи значения инпута при сабмите формы.
import React, { Component } from 'react';
import { StyledSearchbar } from './Styled';

// Создает DOM-элемент следующей структуры.
export default class Searchbar extends Component {
  render() {
    return (
      <StyledSearchbar>
        <form className="SearchForm">
          <button type="submit" className="SearchFormButton">
            <span className="SearchFormButtonLabel">Search</span>
          </button>

          <input
            className="SearchFormInput"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </StyledSearchbar>
    );
  }
}
