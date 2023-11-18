import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { searchService } from 'utils/searchService';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { PER_PAGE } from '../utils/searchService';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isloading: false,
    error: false,
    loadMore: false,
    isOpenModal: false,
    modalData: null,
  };

  handleSearch = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = form.search.value.trim().toLowerCase();
    if (query === '') {
      toast.error('Sorry, there are no images matching your search query.');
      return;
    }
    this.setState({ query: query, page: 1, images: null });
    form.reset();
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ isloading: true });
        const { query, page } = this.state;
        const resp = await searchService(query, page);

        const newImages = resp.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        this.setState(prevState => ({
          images: [...(prevState.images || []), ...newImages],
        }));

        if (resp.totalHits !== 0 && this.state.page === 1) {
          toast.success(`Hooray! We found ${resp.totalHits} images!`);
        }
        const totalPage = Math.ceil(resp.totalHits / PER_PAGE);

        if (totalPage > page) {
          this.setState({ loadMore: true });
        } else if (totalPage === page && resp.totalHits) {
          toast.error("Sorry, but you've reached the end of search results.");
          this.setState({ loadMore: false });
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.setState({ isloading: false });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = someDataToModal => {
    this.setState({
      isOpenModal: true,
      modalData: someDataToModal,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false,
      modalData: null,
    });
  };

  render() {
    const { images, isloading } = this.state;

    return (
      <div className="container">
        <Searchbar onSubmit={this.handleSearch} />

        {images && images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}

        {this.state.loadMore && <Button onClick={this.handleLoadMore} />}

        {isloading && <Loader />}

        <ToastContainer
          autoClose={5000}
          position="top-right"
          containerClassName="text-base"
        />

        {this.state.modalData !== null && (
          <Modal
            closeModal={this.closeModal}
            modalData={this.state.modalData}
          />
        )}
      </div>
    );
  }
}
