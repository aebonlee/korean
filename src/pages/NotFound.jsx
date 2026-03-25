import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

function NotFound() {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead
        title={t('404 - 페이지를 찾을 수 없습니다 - Korean Pro', '404 - Page Not Found - Korean Pro')}
        description={t('요청하신 페이지를 찾을 수 없습니다.', 'The page you requested could not be found.')}
      />

      <div className="not-found">
        <div className="not-found__content">
          <h1 className="not-found__code">404</h1>
          <p className="not-found__message">
            {t('페이지를 찾을 수 없습니다', 'Page Not Found')}
          </p>
          <p className="not-found__description">
            {t(
              '요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.',
              'The page you are looking for might not exist or has been moved.'
            )}
          </p>
          <Link to="/" className="btn btn--primary btn--lg">
            {t('홈으로 돌아가기', 'Go Home')}
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;
