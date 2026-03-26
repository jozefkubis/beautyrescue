-- Seed for public.pricing
-- One INSERT per procedure extracted from pricing forms

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Akupunktúra',
  id,
  50,
  40,
  NULL,
  true
FROM service_items
WHERE slug = 'acupuncture';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Elektroakupunktúra',
  id,
  50,
  40,
  NULL,
  true
FROM service_items
WHERE slug = 'acupuncture';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Tuina',
  id,
  50,
  40,
  NULL,
  true
FROM service_items
WHERE slug = 'acupuncture';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Bankovanie',
  id,
  50,
  40,
  NULL,
  true
FROM service_items
WHERE slug = 'acupuncture';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Moxovanie',
  id,
  50,
  40,
  NULL,
  true
FROM service_items
WHERE slug = 'acupuncture';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Kozmetická akupunktúra',
  id,
  50,
  40,
  NULL,
  true
FROM service_items
WHERE slug = 'acupuncture';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Guasha',
  id,
  50,
  40,
  NULL,
  true
FROM service_items
WHERE slug = 'acupuncture';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vstupné vyšetrenie',
  id,
  50,
  50,
  NULL,
  true
FROM service_items
WHERE slug = 'acupuncture';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Niťový lifting čelo',
  id,
  250,
  250,
  NULL,
  true
FROM service_items
WHERE slug = 'biokompatibilne-nite';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Niťový lifting medziobočie',
  id,
  150,
  150,
  NULL,
  true
FROM service_items
WHERE slug = 'biokompatibilne-nite';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Niťový lifting tváre (líca, sánka, brada)',
  id,
  600,
  600,
  NULL,
  true
FROM service_items
WHERE slug = 'biokompatibilne-nite';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Niťový lifting brada',
  id,
  250,
  250,
  NULL,
  true
FROM service_items
WHERE slug = 'biokompatibilne-nite';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Niťový lifting sánka',
  id,
  250,
  250,
  NULL,
  true
FROM service_items
WHERE slug = 'biokompatibilne-nite';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Foxy eyes',
  id,
  250,
  250,
  NULL,
  true
FROM service_items
WHERE slug = 'biokompatibilne-nite';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true
FROM service_items
WHERE slug = 'biokompatibilne-nite';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Botulotoxín 1 lokalita',
  id,
  90,
  80,
  NULL,
  true
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Botulotoxín 2 lokality',
  id,
  160,
  150,
  NULL,
  true
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Botulotoxín 3 lokality',
  id,
  240,
  240,
  NULL,
  true
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Botulotoxín - bunny lines',
  id,
  50,
  50,
  NULL,
  true
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Botulotoxín - gummy smile',
  id,
  50,
  50,
  NULL,
  true
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Botulotoxín - brada',
  id,
  50,
  50,
  NULL,
  true
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Botulotoxín - m.masseter',
  id,
  80,
  80,
  NULL,
  true
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Botulotoxín - podpazušie',
  id,
  350,
  350,
  NULL,
  true
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Botulotoxín - dlane/šlapaje',
  id,
  350,
  350,
  NULL,
  true
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Botulotoxín - lifting obočia',
  id,
  110,
  100,
  NULL,
  true
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Botulotoxín - Nefertiti lift',
  id,
  330,
  330,
  NULL,
  true
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Botulotoxín - zdvihnutie špičky nosa',
  id,
  50,
  50,
  NULL,
  true
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Botulotoxín - fajčiarske vrásky',
  id,
  50,
  50,
  NULL,
  true
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Botulotoxín - dvihnutie úst. kútikov',
  id,
  50,
  50,
  NULL,
  true
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true
FROM service_items
WHERE slug = 'botulotoxin';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Diamantová mikrodermabrázia – tvár',
  id,
  40,
  40,
  NULL,
  true
FROM service_items
WHERE slug = 'diamond-microdermabrasion';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Diamantová mikrodermabrázia – tvár+krk',
  id,
  50,
  50,
  NULL,
  true
FROM service_items
WHERE slug = 'diamond-microdermabrasion';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Diamantová mikrodermabrázia – tvár+krk+dekolt',
  id,
  60,
  60,
  NULL,
  true
FROM service_items
WHERE slug = 'diamond-microdermabrasion';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Výživná maska',
  id,
  7,
  7,
  NULL,
  true
FROM service_items
WHERE slug = 'diamond-microdermabrasion';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true
FROM service_items
WHERE slug = 'diamond-microdermabrasion';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Chemický peeling - tvár',
  id,
  40,
  40,
  NULL,
  true
FROM service_items
WHERE slug = 'chemical-peeling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Chemický peeling - tvár a krk',
  id,
  50,
  50,
  NULL,
  true
FROM service_items
WHERE slug = 'chemical-peeling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Chemický peeling - tvár, krk a dekolt',
  id,
  60,
  60,
  NULL,
  true
FROM service_items
WHERE slug = 'chemical-peeling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Chemický peeling 35% TCA – tvár',
  id,
  60,
  60,
  NULL,
  true
FROM service_items
WHERE slug = 'chemical-peeling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Chemický peeling 35% TCA – 1 bod do 1 cm',
  id,
  5,
  5,
  NULL,
  true
FROM service_items
WHERE slug = 'chemical-peeling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true
FROM service_items
WHERE slug = 'chemical-peeling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Jalupro Classic',
  id,
  240,
  220,
  NULL,
  true
FROM service_items
WHERE slug = 'jalupro-classic';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Jalupro HMW',
  id,
  240,
  220,
  NULL,
  true
FROM service_items
WHERE slug = 'jalupro-hmw';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Jalupro Classic',
  id,
  180,
  180,
  NULL,
  true
FROM service_items
WHERE slug = 'jalupro';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Jalupro HMW',
  id,
  200,
  200,
  NULL,
  true
FROM service_items
WHERE slug = 'jalupro';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Jalupro Super Hydro',
  id,
  250,
  240,
  NULL,
  true
FROM service_items
WHERE slug = 'jalupro';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Jalupro Young Eye',
  id,
  200,
  200,
  NULL,
  true
FROM service_items
WHERE slug = 'jalupro';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vstupna konzultacia',
  id,
  15,
  15,
  NULL,
  true
FROM service_items
WHERE slug = 'jalupro';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Jalupro Superhydro',
  id,
  250,
  220,
  NULL,
  true
FROM service_items
WHERE slug = 'jalupro-super-hydro';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Jalupro Young eye',
  id,
  220,
  200,
  NULL,
  true
FROM service_items
WHERE slug = 'jalupro-young-eye';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Výplň kyselina hyaluronová Juvéderm, Belotero - 1ml',
  id,
  270,
  270,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova-face';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Výplň VOLUME - kyselina hyaluronová - 1ml typu Voluma',
  id,
  350,
  330,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova-face';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'JALUPRO Classic',
  id,
  190,
  175,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova-face';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Jalupro HMW',
  id,
  220,
  210,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova-face';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Kanyla',
  id,
  13,
  13,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova-face';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova-face';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Kyselina HYA (Juvéderm)',
  id,
  300,
  300,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Kyselina hyaluronová (J.Voluma) – tvár.výplň 1ml',
  id,
  370,
  370,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Pery 0,5ml (Juvéderm Ultra Smile)',
  id,
  170,
  170,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Pery 1ml (Juvéderm Ultra)',
  id,
  300,
  300,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Kyselina hyaluronová + Collagen Boosting Classic (Švajčiarko)',
  id,
  180,
  180,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Kyselina hyaluronová + Collagen Boosting HMW (Švajčiarsko)',
  id,
  200,
  200,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Jalupro Super Hydro',
  id,
  250,
  240,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Jalupro Young Eye',
  id,
  200,
  200,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Profhilo',
  id,
  270,
  250,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  '0,55 ml HYA',
  id,
  150,
  150,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova-lips';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  '1 ml HYA',
  id,
  270,
  270,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova-lips';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Kanyla',
  id,
  13,
  13,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova-lips';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true
FROM service_items
WHERE slug = 'kyselina-hyaluronova-lips';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vitalinjector – tvár',
  id,
  180,
  160,
  NULL,
  true
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vitalinjector – tvár + krk',
  id,
  250,
  210,
  NULL,
  true
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vitalinjector – tvár+krk+dekolt',
  id,
  300,
  260,
  NULL,
  true
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vitalinjector – celulitída',
  id,
  250,
  250,
  NULL,
  true
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vitalinjector – mesohair',
  id,
  150,
  150,
  NULL,
  true
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Chemická lypolýza podbradku (2 ošetrenia)',
  id,
  150,
  150,
  NULL,
  true
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Mezosérum "namieru"',
  id,
  35,
  35,
  NULL,
  true
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vitalinjector - ruky',
  id,
  50,
  50,
  NULL,
  true
FROM service_items
WHERE slug = 'mezoterapia-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Mesojectgun – tvár',
  id,
  60,
  60,
  NULL,
  true
FROM service_items
WHERE slug = 'mezoterapia-non-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Mesojectgun – tvár + krk',
  id,
  100,
  70,
  NULL,
  true
FROM service_items
WHERE slug = 'mezoterapia-non-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Mesojectgun – tvár+krk+dekolt',
  id,
  130,
  80,
  NULL,
  true
FROM service_items
WHERE slug = 'mezoterapia-non-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Mesojectgun – mesohair',
  id,
  60,
  60,
  NULL,
  true
FROM service_items
WHERE slug = 'mezoterapia-non-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Výživná maska',
  id,
  7,
  7,
  NULL,
  true
FROM service_items
WHERE slug = 'mezoterapia-non-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Mezosérum "namieru"',
  id,
  35,
  35,
  NULL,
  true
FROM service_items
WHERE slug = 'mezoterapia-non-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true
FROM service_items
WHERE slug = 'mezoterapia-non-invasive';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Microneedling – tvár',
  id,
  59,
  39,
  NULL,
  true
FROM service_items
WHERE slug = 'microneedling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Microneedling – tvár+krk',
  id,
  69,
  49,
  NULL,
  true
FROM service_items
WHERE slug = 'microneedling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Microneedling – tvár+krk+dekolt',
  id,
  79,
  59,
  NULL,
  true
FROM service_items
WHERE slug = 'microneedling';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Oxygeneo - tvár + RF',
  id,
  70,
  60,
  NULL,
  true
FROM service_items
WHERE slug = 'oxygeneo';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Oxygeneo - tvár + krk + RF',
  id,
  80,
  70,
  NULL,
  true
FROM service_items
WHERE slug = 'oxygeneo';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Oxygeneo - tvár + krk + dekolt + RF',
  id,
  90,
  80,
  NULL,
  true
FROM service_items
WHERE slug = 'oxygeneo';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Rádiofrekvencia - tvár',
  id,
  25,
  25,
  NULL,
  true
FROM service_items
WHERE slug = 'oxygeneo';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true
FROM service_items
WHERE slug = 'oxygeneo';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Profhilo',
  id,
  270,
  250,
  NULL,
  true
FROM service_items
WHERE slug = 'profhilo';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Profhilo Structura',
  id,
  250,
  250,
  NULL,
  true
FROM service_items
WHERE slug = 'profhilo';

INSERT INTO pricing (
  treatment,
  service_id,
  price_before_discount,
  price_after_discount,
  discount,
  is_active
)
SELECT
  'Vstupná konzultácia',
  id,
  15,
  15,
  NULL,
  true
FROM service_items
WHERE slug = 'profhilo';

