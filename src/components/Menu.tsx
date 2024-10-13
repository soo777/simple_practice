import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WorldIcon from '@atlaskit/icon/glyph/world';
import Select from '@atlaskit/select';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { commonState } from '../service/common/commonAtom';

const Menu = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const setContent = useSetRecoilState(commonState);
  const [lang, setLang] = useState<string>('한국어');

  useEffect(() => {
    const lang = JSON.parse(localStorage.getItem('language')!);

    if (lang === 'en' || lang === 'ko') {
      i18n.changeLanguage(lang);
      setContent({ language: lang });
      setLang(lang === 'ko' ? '한국어' : 'English');
    }
  }, []);

  /**
   * 언어 변경(다국어)
   */
  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
    setContent({ language: value });
    localStorage.setItem('language', JSON.stringify(value));
  };

  /**
   * 메뉴 이동
   */
  const movePage = (page: string) => {
    navigate(`/${page}`);
  };

  return (
    <>
      <div className="flex justify-between">
        <ul className="flex pt-16 text-xl">
          <li
            className={`pt-1 cursor-pointer ${
              (location.pathname === '/' || location.pathname === '/user') && 'text-red-600'
            }`}
            onClick={() => {
              movePage('user');
            }}
          >
            {t('menu.user')}
          </li>
          <li
            className={`ml-5 cursor-pointer ${location.pathname === '/post' && 'text-red-600'}`}
            onClick={() => {
              movePage('post');
            }}
          >
            {t('menu.post')}
          </li>
          <li
            className={`ml-5 cursor-pointer ${location.pathname === '/todoList' && 'text-red-600'}`}
            onClick={() => {
              movePage('todoList');
            }}
          >
            {t('menu.todo')}
          </li>
        </ul>
        <ul className="self-end pr-10">
          <li>
            <div className="flex">
              <div className="self-center">
                <WorldIcon label="" />
              </div>
              <div className="ml-1">
                <Select
                  inputId="language"
                  placeholder={lang}
                  options={[
                    { label: '한국어', value: 'ko' },
                    { label: 'English', value: 'en' },
                  ]}
                  onChange={(e) => {
                    changeLanguage(e!.value);
                  }}
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
