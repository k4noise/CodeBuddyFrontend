import './HowTo.css';
import FirstStepImage from '../../../assets/1.png';
import SecondStepImage from '../../../assets/2.png';
import ThirdStepImage from '../../../assets/3.png';

interface Step {
  image: string;
  title: string;
}

const STEPS: Step[] = [
  { image: FirstStepImage, title: 'Сформулируй вопрос' },
  { image: SecondStepImage, title: 'Оставь свой вопрос' },
  { image: ThirdStepImage, title: 'Получи ответ сразу' },
] as const;

const HowTo = () => {
  return (
    <section className="how-to">
      <h2 className="how-to__header">Как это работает?</h2>
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
