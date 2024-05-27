import { Link } from 'react-router-dom';

/**
 * 401 page
 * @returns {JSX.Element}
 */
const Page401 = () => {
  return (
    <div className="error-page">
      <h2>401</h2>
      <h3>
        <Link to="/login">Авторизуйтесь</Link> для просмотра
      </h3>
    </div>
  );
};

export default Page401;
