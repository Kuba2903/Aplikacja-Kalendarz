"use client";
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';
import pl from 'date-fns/locale/pl';
import TaskList from './TaskList';
import AddTaskModal from './AddTaskModal';
import styles from './Calendar.module.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + offset)));
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <h2>{format(currentDate, 'LLLL yyyy', { locale: pl })}</h2>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>

      <div className={styles.calendar}>
        {daysInMonth.map((day) => (
          <div
            key={day.toString()}
            className={`${styles.calendarDay} ${
              !isSameMonth(day, currentDate) ? styles.outsideMonth : ''
            }`}
          >
            <div className={styles.dayHeader}>
              <span>{format(day, 'd')}</span>
              <button
                className={styles.addButton}
                onClick={() => {
                  setSelectedDate(day);
                  setIsAddModalOpen(true);
                }}
              >
                +
              </button>
            </div>
            <TaskList date={day} />
          </div>
        ))}
      </div>

      {isAddModalOpen && (
        <AddTaskModal
          date={selectedDate}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Calendar;