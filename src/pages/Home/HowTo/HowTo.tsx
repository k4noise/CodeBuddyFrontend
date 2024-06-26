import './HowTo.css';
import FirstStepImage from '../../../assets/1.png';
import SecondStepImage from '../../../assets/2.png';
import ThirdStepImage from '../../../assets/3.png';
import { useEffect, useState } from 'react';

interface Step {
  image: string;
  title: string;
}

const STEPS: Step[] = [
  { image: FirstStepImage, title: 'Сформулируй вопрос' },
  { image: SecondStepImage, title: 'Оставь свой вопрос' },
  { image: ThirdStepImage, title: 'Получи ответ сразу' },
] as const;

/**
 * Step component by main page
 * Shows animate header, steps by use our service
 * @component
 * @example
 * ```
 * <HowTo />
 * ```
 * @returns {JSX.Element} HowTo
 */
const HowTo = (): JSX.Element => {
  const textToAnimation = 'работает?';
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const canAddChar = index < textToAnimation.length && direction > 0;
      const canDeleteChar = index > 1 && direction < 0;
      if (!canAddChar && !canDeleteChar)
        setDirection((oldDirection) => -1 * oldDirection);
      if (canAddChar) setText((prevText) => prevText + textToAnimation[index]);
      else if (canDeleteChar) setText((prevText) => prevText.slice(0, -1));
      setIndex((prevIndex) => prevIndex + direction);
    }, 300);

    return () => clearTimeout(timeout);
  }, [index, text]);
  return (
    <section className="how-to">
      <h2 className="how-to__header">Как это {text}</h2>
      <div className="how-to__steps">
        {STEPS.map((step) => (
          <div className="how-to__step" key={step.title}>
            <img
              src={step.image}
              alt={step.title}
              className="how-to__step-image"
            />
            <p>{step.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowTo;
export { STEPS };
