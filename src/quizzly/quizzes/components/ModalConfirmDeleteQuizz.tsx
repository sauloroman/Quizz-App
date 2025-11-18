import React from 'react';
import { useModal, useTheme } from '../../../shared/hooks';
import { ModalLayout } from '../../../layout/ModalLayout';

export const ModalConfirmDeleteQuiz: React.FC = () => {
  const { modal: { isOpen }, onCloseModal } = useModal();
  const { isDarkTheme } = useTheme();

  return (
    <ModalLayout isOpen={isOpen} title='Eliminar Quiz' onClose={onCloseModal}>
      <div className="space-y-4">
        <p>¿Desea eliminar </p>
        
      </div>
    </ModalLayout>
  );
};