-- -------------------------------------------------
--  Table: volunteers
-- -------------------------------------------------
CREATE TABLE IF NOT EXISTS volunteers (
    volunteer_id   BIGSERIAL PRIMARY KEY,
    name          VARCHAR(200) NOT NULL,
    email         VARCHAR(255),
    phone         VARCHAR(30),
    skills        TEXT,
    availability  TEXT,
    county        VARCHAR(100),
    notes        TEXT,
    date_of_birth DATE,
    address       TEXT,
    status        VARCHAR(50),
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to keep volunteers.updated_at current
CREATE OR REPLACE FUNCTION set_volunteers_updated()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_volunteers_updated ON volunteers;
CREATE TRIGGER trg_volunteers_updated
BEFORE UPDATE ON volunteers
FOR EACH ROW EXECUTE FUNCTION set_volunteers_updated();


CREATE TABLE IF NOT EXISTS pictures (
    picture_id   BIGSERIAL PRIMARY KEY,
    title        VARCHAR(200) NOT NULL,               -- human‑readable title for the image
    description  TEXT,                                -- optional description / caption
    image_url    TEXT NOT NULL,                       -- public URL (e.g. /uploads/xyz.png)
    uploaded_by  BIGINT
        REFERENCES volunteers(volunteer_id) ON DELETE SET NULL,  -- who uploaded it (optional)
    uploaded_at  TIMESTAMPTZ DEFAULT NOW(),
    is_active    BOOLEAN DEFAULT TRUE,
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to keep pictures.updated_at current
CREATE OR REPLACE FUNCTION set_pictures_updated()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_pictures_updated ON pictures;
CREATE TRIGGER trg_pictures_updated
BEFORE UPDATE ON pictures
FOR EACH ROW EXECUTE FUNCTION set_pictures_updated();
