CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  patient_name VARCHAR(150) NOT NULL,
  doctor VARCHAR(100) NOT NULL,
  scheduled_at TIMESTAMP NOT NULL,
  status VARCHAR(30) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);
