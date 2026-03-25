import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function SectionNav({ items, basePath }) {
  const { t } = useLanguage();

  return (
    <nav className="section-nav" aria-label="Section navigation">
      <ul className="section-nav__list">
        {items.map((item) => (
          <li key={item.path} className="section-nav__item">
            <NavLink
              to={`${basePath}/${item.path}`}
              className={({ isActive }) =>
                `section-nav__link${isActive ? ' active' : ''}`
              }
            >
              {item.icon && <span className="section-nav__icon">{item.icon}</span>}
              <span>{t(item.label, item.labelEn || item.label)}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
