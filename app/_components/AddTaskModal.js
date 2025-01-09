"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';
import { format } from 'date-fns';
import styles from './Calendar.module.css';
import { pl } from 'date-fns/locale';

const AddTaskModal = ({ date, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, 'tasks'), {
        userId: user.uid,
        date: format(date, 'yyyy-MM-dd'),
        title: data.title,
        description: data.description,
        time: data.time,
        priority: data.priority,
        createdAt: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
      <h2>Dodaj zadanie na {format(date, 'd MMMM yyyy', { locale: pl })}</h2>
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
            <button type="submit">Dodaj</button>
            <button type="button" onClick={onClose}>Anuluj</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;