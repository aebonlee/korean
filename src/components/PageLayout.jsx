import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function PageLayout({ title, titleEn, description, descriptionEn, breadcrumbs, children }) {
  const { t } = useLanguage();

  return (
    <>
      <div className="page-header">
        <div className="page-header__inner">
          {breadcrumbs && (
            <nav className="page-header__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">{t('홈', 'Home')}</Link>
              {breadcrumbs.map((crumb, idx) => (
                <span key={idx}>
                  <span className="breadcrumb-sep">/</span>
                  {crumb.path ? (
                    <Link to={crumb.path}>{t(crumb.label, crumb.labelEn)}</Link>
                  ) : (
                    <span className="breadcrumb-current">{t(crumb.label, crumb.labelEn)}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1 className="page-header__title">
            {t(title, titleEn || title)}
          </h1>
          {description && (
            <p className="page-header__description">
              {t(description, descriptionEn || description)}
            </p>
          )}
        </div>
      </div>
      <div className="page-content">
        <div className="page-content__inner">
          {children}
        </div>
      </div>
    </>
  );
}
