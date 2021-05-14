import React from 'react';

function useModal(showParent, closeParent) {
  const [displayEditModal, setDisplayEditModal] = React.useState(false);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState('');

  const displayEditModalHandler = (item) => {
    setDisplayEditModal(true);
    setSelectedItem(item);
    closeParent();
  };

  const hideEditModalHandler = () => {
    setDisplayEditModal(false);
    showParent();
  };

  const displayConfirmationModalHandler = (item) => {
    setDisplayConfirmationModal(true);
    setSelectedItem(item);
    closeParent();
  };

  const hideConfirmationModalHandler = () => {
    setDisplayConfirmationModal(false);
    showParent();
  };

  const selectedItemHandler = (name) => {
    setSelectedItem({ ...selectedItem, name });
  };

  return {
    displayEditModal,
    displayConfirmationModal,
    selectedItem,
    selectedItemHandler,
    displayEditModalHandler,
    hideEditModalHandler,
    displayConfirmationModalHandler,
    hideConfirmationModalHandler
  };
}

export { useModal };
