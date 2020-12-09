
const openEditCategoryModal = useCallback(
  (modalProps) => {
    modalDispatch({
      type: EModalActionTypes.SHOW_MODAL,
      payload: {
        component: EditCategoryModal,
        props: {
          ...modalProps,
        },
      },
    });
  },
  [modalDispatch]
);

const handleEditCategory = useCallback(
  (data) => {
    openEditCategoryModal(data);
  },
  [openEditCategoryModal]
);

const openCreateCategoryModal = () => {
  modalDispatch({
    type: EModalActionTypes.SHOW_MODAL,
    payload: {
      component: CreateCategoryModal,
      props: {},
    },
  });
};

const handleCreateCategory = () => {
  openCreateCategoryModal();
};

<Button
  onClick={handleCreateCategory}
  text="ایجاد دسته بندی"
/>



