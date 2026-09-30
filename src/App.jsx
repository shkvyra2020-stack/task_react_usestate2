import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
  // 1. Состояния
  const [steps, setSteps] = useState(data);
  const [activeIndex, setActiveIndex] = useState(0);

  // 2. Флаги
  const isFirstStep = activeIndex === 0;
  const isLastStep = activeIndex === steps.length - 1;

  // 3. Обработчики
  const onBackClick = () => {
    if (!isFirstStep) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const onNextClick = () => {
    if (isLastStep) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const onStepClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles['steps-content']}>
            {steps[activeIndex].content}
          </div>

          <ul className={styles['steps-list']}>
            {steps.map((step, index) => {
              // Классы для каждого шага
              const isDone = index <= activeIndex;
              const isActive = index === activeIndex;

              const itemClassName = [
                styles['steps-item'],
                isDone && styles.done,
                isActive && styles.active,
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <li key={step.id} className={itemClassName}>
                  <button
                    className={styles['steps-item-button']}
                    onClick={() => onStepClick(index)}
                  >
                    {index + 1}
                  </button>
                  {step.title}
                </li>
              );
            })}
          </ul>

          <div className={styles['buttons-container']}>
            <button
              className={styles.button}
              onClick={onBackClick}
              disabled={isFirstStep}
            >
              Назад
            </button>
            <button className={styles.button} onClick={onNextClick}>
              {isLastStep ? 'Начать сначала' : 'Далее'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App
