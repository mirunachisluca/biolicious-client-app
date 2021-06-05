import React from 'react';

function useActionModals() {
  const [displayEditModal, setDisplayEditModal] = React.useState(false);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    React.useState(false);

  const displayEditModalHandler = () => {
    setDisplayEditModal(true);
  };

  const hideEditModalHandler = () => {
    setDisplayEditModal(false);
  };

  const displayConfirmationModalHandler = () => {
    setDisplayConfirmationModal(true);
  };

  const hideConfirmationModalHandler = () => {
    setDisplayConfirmationModal(false);
  };

  return {
    displayEditModal,
    displayConfirmationModal,
    displayEditModalHandler,
    displayConfirmationModalHandler,
    hideEditModalHandler,
    hideConfirmationModalHandler
  };
}

export { useActionModals };
