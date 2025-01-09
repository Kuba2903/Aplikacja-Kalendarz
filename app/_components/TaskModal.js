"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import styles from './Calendar.module.css';

const TaskModal = ({ task, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: task
  });

  const onSubmit = async (data) => {
    try {
      await updateDoc(doc(db, 'tasks', task.id), {
        title: data.title,
        description: data.description,
        time: data.time,
        priority: data.priority,
        updatedAt: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Czy na pewno chcesz usunąć to zadanie?')) {
      try {
        await deleteDoc(doc(db, 'tasks', task.id));
        onClose();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Edytuj zadanie</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Tytuł:</label>
            <input {...register('title', { required: true })} />
            {errors.title && <span>To pole jest wymagane</span>}
          </div>

          <div>
            <label>Opis:</label>
            <textarea {...register('description')} />
          </div>

          <div>
            <label>Godzina:</label>
            <input type="time" {...register('time')} />
          </div>

          <div>
            <label>Priorytet:</label>
            <select {...register('priority')}>
              <option value="low">Niski</option>
              <option value="medium">Średni</option>
              <option value="high">Wysoki</option>
            </select>
          </div>

          <div className={styles.modalButtons}>
            <button type="submit">Zapisz</button>
            <button type="button" onClick={handleDelete} className={styles.deleteButton}>
              Usuń
            </button>
            <button type="button" onClick={onClose}>Anuluj</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;