// UNDONE При клике по элементу галереи должно открываться модальное окно
// UNDONE с темным оверлеем и отображаться большая версия изображения.
// * Модальное окно должно закрываться по нажатию клавиши ESC
// * или по клику на оверлее.
// UNDONE Внешний вид как https://basiclightbox.electerious.com/
// UNDONE только вместо белого модального окна рендерится изображение
// UNDONE (в примере нажми Run). Анимацию делать не нужно!
import React, { Component } from 'react';
import { StyledModal } from './Styled';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'auto';
  }

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <StyledModal onClick={this.handleOverlayClick}>
        <div className="modal">
          <h2>MODAL</h2>
          <img src="#" alt="img" />
        </div>
      </StyledModal>
    );
  }
}
