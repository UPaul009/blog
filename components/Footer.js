import React from 'react';
import Link from 'next/link';
import colors from '../theme';

const Footer = () => (
  <footer>
    <Link href="/">
      <a rel="home">&copy; {new Date().getFullYear()} Logan McAnsh</a>
    </Link>
    <style jsx>{`
      footer {
        height: 8rem;
        background: ${colors.background};
        font-size: 1.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      a {
        color: CurrentColor;
        text-decoration: none;
      }
    `}</style>
  </footer>
);

export default Footer;
