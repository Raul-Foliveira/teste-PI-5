import Link from 'next/link';
import styles from '../styles/navbar.module.css';

const Navbar = () => {
  const scrollToAboutUs = () => {
    const aboutUsSection = document.getElementById('about-us');
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/images/patasUnidas.png" alt="Patas Unidas" className={styles.logoImage} />
          <span className={styles.logoText}>Patas Unidas</span>
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link href="/animais">Animais</Link></li>
        <li><button onClick={scrollToAboutUs} className={styles.buttonLink}>Sobre nós</button></li>
        <li><Link href="/login">Adm</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
