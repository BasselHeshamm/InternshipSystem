require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const { pool } = require("./postgres");

const setup = async () => {
  const client = await pool.connect();
  try {
    console.log("Setting up PostgreSQL tables...");

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id          SERIAL PRIMARY KEY,
        first_name  VARCHAR(100) NOT NULL,
        last_name   VARCHAR(100) NOT NULL,
        email       VARCHAR(255) UNIQUE NOT NULL,
        password    VARCHAR(255) NOT NULL,
        role        VARCHAR(50) NOT NULL CHECK (role IN ('student','company','scad','faculty')),
        is_pro      BOOLEAN DEFAULT FALSE,
        created_at  TIMESTAMP DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id               SERIAL PRIMARY KEY,
        user_id          INTEGER REFERENCES users(id) ON DELETE CASCADE,
        company_name     VARCHAR(255) NOT NULL,
        industry         VARCHAR(100),
        company_size     VARCHAR(50),
        website          VARCHAR(255),
        logo_url         VARCHAR(255),
        status           VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
        created_at       TIMESTAMP DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS internships (
        id            SERIAL PRIMARY KEY,
        company_id    INTEGER REFERENCES companies(id) ON DELETE CASCADE,
        title         VARCHAR(255) NOT NULL,
        description   TEXT,
        duration      VARCHAR(100),
        is_paid       BOOLEAN DEFAULT FALSE,
        salary        VARCHAR(100),
        skills        TEXT,
        location      VARCHAR(255),
        work_type     VARCHAR(50) CHECK (work_type IN ('Remote','Hybrid','On-site')),
        deadline      DATE,
        status        VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open','closed')),
        created_at    TIMESTAMP DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id              SERIAL PRIMARY KEY,
        student_id      INTEGER REFERENCES users(id) ON DELETE CASCADE,
        internship_id   INTEGER REFERENCES internships(id) ON DELETE CASCADE,
        cover_letter    TEXT,
        cv_url          VARCHAR(255),
        status          VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending','Accepted','Rejected','Finalized','Current Intern','Internship Complete')),
        applied_at      TIMESTAMP DEFAULT NOW(),
        UNIQUE(student_id, internship_id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS workshops (
        id            SERIAL PRIMARY KEY,
        title         VARCHAR(255) NOT NULL,
        description   TEXT,
        start_date    DATE,
        end_date      DATE,
        start_time    TIME,
        end_time      TIME,
        location      VARCHAR(255),
        capacity      INTEGER,
        speakers      TEXT,
        agenda        TEXT,
        created_by    INTEGER REFERENCES users(id),
        created_at    TIMESTAMP DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS workshop_registrations (
        id           SERIAL PRIMARY KEY,
        workshop_id  INTEGER REFERENCES workshops(id) ON DELETE CASCADE,
        student_id   INTEGER REFERENCES users(id) ON DELETE CASCADE,
        completed    BOOLEAN DEFAULT FALSE,
        registered_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(workshop_id, student_id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id          SERIAL PRIMARY KEY,
        student_id  INTEGER REFERENCES users(id) ON DELETE CASCADE,
        scad_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
        type        VARCHAR(100),
        scheduled_at TIMESTAMP,
        status      VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending','accepted','rejected')),
        created_at  TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("All tables created successfully.");
  } catch (err) {
    console.error("Setup error:", err.message);
  } finally {
    client.release();
    process.exit(0);
  }
};

setup();
