import React from 'react';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
// import axios from 'axios';

/* 
 UNDONE Вся основна логіка повинна бути в Арр.
 UNDONE Для запиту використовуємо метод життєвого циуклу класового компонента componentDidUpdate. 
 UNDONE Робити запит на бекенд потрібно в Арр, достатньо однієї умови для запиту: => componentDidUpdate()
 ************************************************************************************************ 
 UNDONE Функція для запиту повинна бути в окремому файлі, в Арр її лише викликаємо.
 UNDONE Коли на бекенді закінчилися фото, приховуємо кнопку “Load more”.
 UNDONE Для перевірки можна використовувати слова для пошуку “min” “max”.
 UNDONE Один із варіантів реалізації приховування кнопки “Load more”
 this.steState(prev =>({
 images: [...prev.images, ...hits],
 loadMore: this.state.page < Math.ceil(totalHits / 12 )
  }))
 UNDONE Не забуваємо коректно опрацьовувати слухача для клавіатури в компоненті модального вікна.
 {
"total": 4692,
"totalHits": 500,
"hits": [
    {
        "id": 195893,
        "pageURL": "https://pixabay.com/en/blossom-bloom-flower-195893/",
        "type": "photo",
        "tags": "blossom, bloom, flower",
        "previewURL": "https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg"
        "previewWidth": 150,
        "previewHeight": 84,
        "webformatURL": "https://pixabay.com/get/35bbf209e13e39d2_640.jpg",
        "webformatWidth": 640,
        "webformatHeight": 360,
        "largeImageURL": "https://pixabay.com/get/ed6a99fd0a76647_1280.jpg",
        "fullHDURL": "https://pixabay.com/get/ed6a9369fd0a76647_1920.jpg",
        "imageURL": "https://pixabay.com/get/ed6a9364a9fd0a76647.jpg",
        "imageWidth": 4000,
        "imageHeight": 2250,
        "imageSize": 4731420,
        "views": 7671,
        "downloads": 6439,
        "likes": 5,
        "comments": 2,
        "user_id": 48777,
        "user": "Josch13",
        "userImageURL": "https://cdn.pixabay.com/user/2013/11/05/02-10-23-764_250x250.jpg",
    },
    {
        "id": 73424,
        ...
    },
    ...
]
}
*/

export class App extends React.Component {
  state = {
    // query: null,
    data: null,

    isLoading: false,
    error: null,

    isOpenModal: false,
    modalData: null,
  };

  // fetchData = async () => {
  //   const response = await axios.get(
  //     'https://pixabay.com/api/?q=cat&page=1&key=31394022-99a332f5c25b284b0988f9dcf&image_type=photo&orientation=horizontal&per_page=12'
  //   );
  // };

  // UNDONE метод от ментора
  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this.state.page !== prevState.page ||
  //     this.state.query !== prevState.query
  //   ) {
  //     fetch();
  //   }
  // }

  openModal = dataToModal => {
    this.setState({ isOpenModal: true, modalData: dataToModal });
  };

  closeModal = () => {
    this.setState({ isOpenModal: false, modalData: null });
  };

  render() {
    return (
      <div className="container">
        <Searchbar />
        <button
          type="button"
          onClick={() => {
            this.openModal();
          }}
        >
          Modal
        </button>
        {/* <ImageGallery openModal={this.openModal}/> */}
        {this.state.isOpenModal && (
          <Modal
            closeModal={this.closeModal}
            modalData={this.state.modalData}
          />
        )}
      </div>
    );
  }
}
