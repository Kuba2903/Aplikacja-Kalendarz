"use client";
import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';
import { format } from 'date-fns';
import TaskModal from './TaskModal';
import styles from './Calendar.module.css';

const TaskList = ({ date }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const dateString = format(date, 'yyyy-MM-dd');
    const tasksRef = collection(db, 'tasks');
    const q = query(
      tasksRef,
      where('userId', '==', user.uid),
      where('date', '==', dateString)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskList);
    });

    return () => unsubscribe();
  }, [date, user]);

  return (
    <div className={styles.taskList}>
      {tasks.map(task => (
        <div
          key={task.id}
          className={styles.task}
          onClick={() => setSelectedTask(task)}
          style={{ backgroundColor: task.priority === 'high' ? '#ffebee' : 
                                 task.priority === 'medium' ? '#fff3e0' : '#f1f8e9' }}
        >
          <div className={styles.taskTitle}>{task.title}</div>
          <div className={styles.taskTime}>{task.time}</div>
        </div>
      ))}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default TaskList;