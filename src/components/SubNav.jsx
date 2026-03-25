import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function SubNav({ items }) {
  const { t } = useLanguage();

  return (
    <div className="sub-nav">
      <div className="sub-nav__inner">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sub-nav__link${isActive ? ' active' : ''}`
            }
          >
            {t(item.label, item.labelEn || item.label)}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
