'use client';

import { BgColorsOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function ThemeDropdown() {
  const [theme, setTheme] = useState<string>('default');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    toast.success('Refresh halaman, untuk hasil yang lebih maksimal')
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        <BgColorsOutlined />
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048">
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl">
        {['default', 'light', 'dark', 'lofi', 'valentine', 'pastel', 'autumn', 'cyberpunk'].map((themeOption) => (
          <li key={themeOption}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
              value={themeOption}
              checked={theme === themeOption}
              onChange={() => handleThemeChange(themeOption)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
