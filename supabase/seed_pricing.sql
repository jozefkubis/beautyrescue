-- Seed for public.pricing
-- One INSERT per procedure extracted from pricing forms

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Akupunktúra',
  id,
  50,
  40,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'acupuncture';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Elektroakupunktúra',
  id,
  50,
  40,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'acupuncture';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Tuina',
  id,
  50,
  40,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'acupuncture';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Bankovanie',
  id,
  50,
  40,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'acupuncture';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Moxovanie',
  id,
  50,
  40,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'acupuncture';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Kozmetická akupunktúra',
  id,
  50,
  40,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'acupuncture';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Guasha',
  id,
  50,
  40,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'acupuncture';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vstupné vyšetrenie',
  id,
  50,
  50,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'acupuncture';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Niťový lifting čelo',
  id,
  250,
  250,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'biokompatibilne-nite';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Niťový lifting medziobočie',
  id,
  150,
  150,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'biokompatibilne-nite';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Niťový lifting tváre (líca, sánka, brada)',
  id,
  600,
  600,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'biokompatibilne-nite';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Niťový lifting brada',
  id,
  250,
  250,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'biokompatibilne-nite';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Niťový lifting sánka',
  id,
  250,
  250,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'biokompatibilne-nite';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Foxy eyes',
  id,
  250,
  250,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'biokompatibilne-nite';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'biokompatibilne-nite';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Botulotoxín 1 lokalita',
  id,
  90,
  80,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Botulotoxín 2 lokality',
  id,
  160,
  150,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Botulotoxín 3 lokality',
  id,
  240,
  240,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Botulotoxín - bunny lines',
  id,
  50,
  50,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Botulotoxín - gummy smile',
  id,
  50,
  50,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Botulotoxín - brada',
  id,
  50,
  50,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Botulotoxín - m.masseter',
  id,
  80,
  80,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Botulotoxín - podpazušie',
  id,
  350,
  350,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Botulotoxín - dlane/šlapaje',
  id,
  350,
  350,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Botulotoxín - lifting obočia',
  id,
  110,
  100,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Botulotoxín - Nefertiti lift',
  id,
  330,
  330,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Botulotoxín - zdvihnutie špičky nosa',
  id,
  50,
  50,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Botulotoxín - fajčiarske vrásky',
  id,
  50,
  50,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Botulotoxín - dvihnutie úst. kútikov',
  id,
  50,
  50,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Diamantová mikrodermabrázia – tvár',
  id,
  40,
  40,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'diamond-microdermabrasion';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Diamantová mikrodermabrázia – tvár+krk',
  id,
  50,
  50,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'diamond-microdermabrasion';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Diamantová mikrodermabrázia – tvár+krk+dekolt',
  id,
  60,
  60,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'diamond-microdermabrasion';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Výživná maska',
  id,
  7,
  7,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'diamond-microdermabrasion';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'diamond-microdermabrasion';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Chemický peeling - tvár',
  id,
  40,
  40,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'chemical-peeling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Chemický peeling - tvár a krk',
  id,
  50,
  50,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'chemical-peeling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Chemický peeling - tvár, krk a dekolt',
  id,
  60,
  60,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'chemical-peeling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Chemický peeling 35% TCA – tvár',
  id,
  60,
  60,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'chemical-peeling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Chemický peeling 35% TCA – 1 bod do 1 cm',
  id,
  5,
  5,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'chemical-peeling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'chemical-peeling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Jalupro Classic',
  id,
  240,
  220,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'jalupro-classic';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Jalupro HMW',
  id,
  240,
  220,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'jalupro-hmw';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Jalupro Classic',
  id,
  180,
  180,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'jalupro';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Jalupro HMW',
  id,
  200,
  200,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'jalupro';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Jalupro Super Hydro',
  id,
  250,
  240,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'jalupro';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Jalupro Young Eye',
  id,
  200,
  200,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'jalupro';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vstupna konzultacia',
  id,
  15,
  15,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'jalupro';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Jalupro Superhydro',
  id,
  250,
  220,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'jalupro-super-hydro';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Jalupro Young eye',
  id,
  220,
  200,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'jalupro-young-eye';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Výplň kyselina hyaluronová Juvéderm, Belotero - 1ml',
  id,
  270,
  270,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova-face';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Výplň VOLUME - kyselina hyaluronová - 1ml typu Voluma',
  id,
  350,
  330,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova-face';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'JALUPRO Classic',
  id,
  190,
  175,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova-face';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Jalupro HMW',
  id,
  220,
  210,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova-face';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Kanyla',
  id,
  13,
  13,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova-face';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova-face';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Kyselina HYA (Juvéderm)',
  id,
  300,
  300,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Kyselina hyaluronová (J.Voluma) – tvár.výplň 1ml',
  id,
  370,
  370,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Pery 0,5ml (Juvéderm Ultra Smile)',
  id,
  170,
  170,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Pery 1ml (Juvéderm Ultra)',
  id,
  300,
  300,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Kyselina hyaluronová + Collagen Boosting Classic (Švajčiarko)',
  id,
  180,
  180,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Kyselina hyaluronová + Collagen Boosting HMW (Švajčiarsko)',
  id,
  200,
  200,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Jalupro Super Hydro',
  id,
  250,
  240,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Jalupro Young Eye',
  id,
  200,
  200,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Profhilo',
  id,
  270,
  250,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  '0,55 ml HYA',
  id,
  150,
  150,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova-lips';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  '1 ml HYA',
  id,
  270,
  270,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova-lips';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Kanyla',
  id,
  13,
  13,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova-lips';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'kyselina-hyaluronova-lips';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vitalinjector – tvár',
  id,
  180,
  160,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vitalinjector – tvár + krk',
  id,
  250,
  210,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vitalinjector – tvár+krk+dekolt',
  id,
  300,
  260,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vitalinjector – celulitída',
  id,
  250,
  250,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vitalinjector – mesohair',
  id,
  150,
  150,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Chemická lypolýza podbradku (2 ošetrenia)',
  id,
  150,
  150,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Mezosérum "namieru"',
  id,
  35,
  35,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vitalinjector - ruky',
  id,
  50,
  50,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Mesojectgun – tvár',
  id,
  60,
  60,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'mezoterapia-non-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Mesojectgun – tvár + krk',
  id,
  100,
  70,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'mezoterapia-non-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Mesojectgun – tvár+krk+dekolt',
  id,
  130,
  80,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'mezoterapia-non-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Mesojectgun – mesohair',
  id,
  60,
  60,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'mezoterapia-non-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Výživná maska',
  id,
  7,
  7,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'mezoterapia-non-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Mezosérum "namieru"',
  id,
  35,
  35,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'mezoterapia-non-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'mezoterapia-non-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Microneedling – tvár',
  id,
  59,
  39,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'microneedling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Microneedling – tvár+krk',
  id,
  69,
  49,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'microneedling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Microneedling – tvár+krk+dekolt',
  id,
  79,
  59,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'microneedling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Oxygeneo - tvár + RF',
  id,
  70,
  60,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'oxygeneo';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Oxygeneo - tvár + krk + RF',
  id,
  80,
  70,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'oxygeneo';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Oxygeneo - tvár + krk + dekolt + RF',
  id,
  90,
  80,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'oxygeneo';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Rádiofrekvencia - tvár',
  id,
  25,
  25,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'oxygeneo';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'oxygeneo';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Profhilo',
  id,
  270,
  250,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'profhilo';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Profhilo Structura',
  id,
  250,
  250,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'profhilo';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active,
  order_index
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true,
  (
    SELECT COALESCE(MAX(p.order_index), 0) + 1
    FROM pricing p
    WHERE p.service_id = service_items.id
  )
FROM service_items
WHERE slug = 'profhilo';



