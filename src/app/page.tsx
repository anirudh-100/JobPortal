import styles from './homepage.module.css';

const HomePage = () => {
  return (
    <div className={styles.minHeightScreen}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Student Portal</h1>
        <p className={styles.heroDescription}>
          Explore internships, jobs, and skill-building opportunities tailored for students.
        </p>
        <div className={styles.heroButtons}>
          <button className={styles.heroButtonLogin}>Login</button>
          <button className={styles.heroButtonSignup}>Sign Up</button>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className={styles.jobSection}>
        <h2 className={styles.jobTitle}>Latest Job Postings</h2>

        {/* Job 1 */}
        <div className={styles.jobCard}>
          <h3 className={styles.jobTitleCard}>Frontend Developer Internship</h3>
          <p className={styles.jobDetails}>Company: Tech Corp</p>
          <p className={styles.jobDetails}>Location: Remote</p>
          <button className={styles.applyButton}>Apply Now</button>
        </div>

        {/* Job 2 */}
        <div className={styles.jobCard}>
          <h3 className={styles.jobTitleCard}>Backend Developer Internship</h3>
          <p className={styles.jobDetails}>Company: InnovateTech</p>
          <p className={styles.jobDetails}>Location: Remote</p>
          <button className={styles.applyButton}>Apply Now</button>
        </div>

        {/* Job 3 */}
        <div className={styles.jobCard}>
          <h3 className={styles.jobTitleCard}>UX/UI Designer Internship</h3>
          <p className={styles.jobDetails}>Company: DesignPro</p>
          <p className={styles.jobDetails}>Location: On-site (NYC)</p>
          <button className={styles.applyButton}>Apply Now</button>
        </div>
      </section>

      {/* Help Center Section */}
      <section className={styles.helpSection}>
        <p className={styles.helpText}>Need assistance?</p>
        <button className={styles.helpButton}>Help Center</button>
      </section>
    </div>
  );
};

export default HomePage;
