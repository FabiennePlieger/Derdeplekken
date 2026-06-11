-- ============================================================
-- Derdeplekken.nl – database schema
-- Run this in your Supabase SQL editor to bootstrap the schema.
-- ============================================================

-- Aanvragen van horeca en bijzondere organisaties
CREATE TABLE IF NOT EXISTS venue_applications (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basisgegevens
  naam                 TEXT        NOT NULL,
  adres                TEXT        NOT NULL,
  stad                 TEXT        NOT NULL DEFAULT 'utrecht',
  coordinaten_lat      NUMERIC(9,6),
  coordinaten_lng      NUMERIC(9,6),

  -- Contact
  contact_naam         TEXT,
  contact_email        TEXT        NOT NULL,
  website              TEXT,
  google_maps_url      TEXT,

  -- Openingstijden
  google_sync          BOOLEAN     NOT NULL DEFAULT FALSE,
  openingstijden       JSONB,       -- { ma: [{open:"10:00",close:"22:00"}], ... }

  -- Derde-plek-regels (minimaal één vereist voor toelating)
  regel_eigen_eten     BOOLEAN     NOT NULL DEFAULT FALSE,  -- bezoekers mogen eigen eten meenemen
  regel_deal_korting   BOOLEAN     NOT NULL DEFAULT FALSE,  -- significante korting op eten/drinken op bepaalde uren

  -- Deal (verplicht als regel_deal_korting = true)
  deal_titel           TEXT,
  deal_beschrijving    TEXT,
  deal_prijs           TEXT,
  deal_van             TIME,
  deal_tot             TIME,
  deal_dagen           TEXT[],     -- ['ma','di','wo','do','vr','za','zo']
  deal_doelgroep       TEXT        NOT NULL DEFAULT 'studenten',  -- 'studenten' | 'iedereen'

  -- Extra toelichting van de aanvrager
  toelichting          TEXT,

  -- Beoordelingsstatus
  status               TEXT        NOT NULL DEFAULT 'aangevraagd'
                       CHECK (status IN ('aangevraagd','goedgekeurd','afgewezen')),
  admin_notitie        TEXT,       -- interne opmerking bij beoordeling

  -- Tijdstempels
  aangevraagd_op       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  beoordeeld_op        TIMESTAMPTZ,

  -- Na goedkeuring gekoppeld aan places.ts of een eigen live ID
  place_id             TEXT        UNIQUE
);

-- Index voor admin-dashboard (meest recent bovenaan)
CREATE INDEX IF NOT EXISTS idx_venue_applications_status
  ON venue_applications (status, aangevraagd_op DESC);

-- Goedgekeurde deals die op de kaart staan
-- (wordt gevuld bij goedkeuring vanuit het admin-dashboard)
CREATE TABLE IF NOT EXISTS live_venues (
  id                   TEXT        PRIMARY KEY,  -- bijv. "horeca-koffiehuis-de-buur"
  application_id       UUID        REFERENCES venue_applications(id),

  naam                 TEXT        NOT NULL,
  stad                 TEXT        NOT NULL DEFAULT 'utrecht',
  adres                TEXT        NOT NULL,
  beschrijving         TEXT        NOT NULL DEFAULT '',
  coordinaten_lat      NUMERIC(9,6) NOT NULL,
  coordinaten_lng      NUMERIC(9,6) NOT NULL,

  website              TEXT,
  google_maps_url      TEXT,
  google_sync          BOOLEAN     NOT NULL DEFAULT FALSE,

  openingstijden       JSONB       NOT NULL DEFAULT '{}',

  kosten_gratis        BOOLEAN     NOT NULL DEFAULT FALSE,
  kosten_indicatie     TEXT,
  laptopvriendelijk    BOOLEAN     NOT NULL DEFAULT FALSE,
  werkplekken          BOOLEAN     NOT NULL DEFAULT FALSE,
  wifi                 BOOLEAN     NOT NULL DEFAULT FALSE,
  toiletten            BOOLEAN     NOT NULL DEFAULT FALSE,
  doelgroep            TEXT        NOT NULL DEFAULT 'iedereen',

  -- Deals als JSONB-array (structuur gelijk aan Deal type in places.ts)
  deals                JSONB       NOT NULL DEFAULT '[]',

  actief               BOOLEAN     NOT NULL DEFAULT TRUE,
  aangemaakt_op        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  bijgewerkt_op        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_live_venues_stad
  ON live_venues (stad, actief);

-- Trigger: bijgewerkt_op automatisch updaten
CREATE OR REPLACE FUNCTION update_bijgewerkt_op()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.bijgewerkt_op = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER trg_live_venues_bijgewerkt
  BEFORE UPDATE ON live_venues
  FOR EACH ROW EXECUTE FUNCTION update_bijgewerkt_op();

-- Row Level Security
ALTER TABLE venue_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_venues ENABLE ROW LEVEL SECURITY;

-- Anoniem mag alleen live_venues lezen (voor de kaart)
CREATE POLICY "live_venues_public_read"
  ON live_venues FOR SELECT
  USING (actief = TRUE);

-- Aanvragen schrijven mag anoniem (portal form)
CREATE POLICY "venue_applications_insert"
  ON venue_applications FOR INSERT
  WITH CHECK (TRUE);

-- Lezen en muteren van aanvragen: alleen service-role (admin)
CREATE POLICY "venue_applications_service_only"
  ON venue_applications FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "live_venues_service_write"
  ON live_venues FOR ALL
  USING (auth.role() = 'service_role');
