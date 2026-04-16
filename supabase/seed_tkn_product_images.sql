-- Samostatny seed iba pre image_url v public.tkn_products.
-- Bezpecne aktualizuje len obrazky a nic ine v produktoch neprepise.
-- Tento seed je manualna poistka pre pripad, ked sa image_url omylom vymaze.

update public.tkn_products
set image_url = case slug
  when 'hyaluronova-volna-nesietovana' then '/images/tkn/Kyselina%20hyaluronov%C3%A1.jpeg'
  when 'adjuvans-3-5' then '/images/tkn/Kyselina%20hyaluronov%C3%A1.jpeg'
  when 'ha-mw-2' then '/images/tkn/TKN%20HA%20MW%202%25.jpeg'
  when 'ha-xs-2' then '/images/tkn/TKN%20HA%20XS%202%25.jpeg'
  when 'ha-glowcomplex' then '/images/tkn/TKN%20HA%20Glowcomplex.jpeg'
  when 'ha-oligovit' then '/images/tkn/TKN%20HA%20Oligovit.jpeg'
  when 'hcpr' then '/images/tkn/HCPR.jpeg'
  when 'rcpr' then '/images/tkn/RCPR.jpeg'
  when 'ncpr' then '/images/tkn/NCPR.jpeg'
  when 'ecpr' then '/images/tkn/ECPR.jpeg'
  when 'wcpr' then '/images/tkn/WCPR.jpeg'
  when 'antiaging-cocktail' then '/images/tkn/Antiaging%20cocktail.jpeg'
  when 'mesolift-cocktail' then '/images/tkn/Mesolift%20Cocktail.jpeg'
  when 'anti-pollution-cocktail' then '/images/tkn/Anti-pollution%20Cocktail.jpeg'
  when 'purifying-cocktail' then '/images/tkn/Purifying%20Cocktail.jpeg'
  when 'radiance-cocktail' then '/images/tkn/Radiance%20Cocktail.jpeg'
  when 'dimenyl-dmae' then '/images/tkn/DIMENYL%20(DMAE%20%E2%80%93%20dimetylaminoetanol).jpeg'
  when 'dm-silk' then '/images/tkn/DM-SILK.jpeg'
  when 'idebenyl-tight' then '/images/tkn/IDEBENYL%20TIGHT.jpeg'
  when 'lumicen' then '/images/tkn/LUMICEN.jpeg'
  when 'lumicen-gel' then '/images/tkn/LUMICEN%20GEL.jpeg'
  when 'silicor' then '/images/tkn/SILICOR.jpeg'
  when 'tauricol' then '/images/tkn/TAURICOL.jpeg'
  when 'glutamax-c' then '/images/tkn/GLUTAMAX%20C.jpeg'
  when 'cofinet' then '/images/tkn/COFINET.jpeg'
  when 'saliforo' then '/images/tkn/SALIFORO.jpeg'
  when 'asiacen' then '/images/tkn/ASIACEN.jpeg'
  when 'thrinamide' then '/images/tkn/THRINAMIDE.jpeg'
  when 'b-hidroxin' then '/images/tkn/B-HIDROXIN.jpeg'
  when 'polivitamin-bcae' then '/images/tkn/POLIVITAMIN%20BCAE.jpeg'
  when 'polivitamin-bcae-2' then '/images/tkn/POLIVITAMIN%20BCAE.jpeg'
  else image_url
end
where slug in (
  'hyaluronova-volna-nesietovana',
  'adjuvans-3-5',
  'ha-mw-2',
  'ha-xs-2',
  'ha-glowcomplex',
  'ha-oligovit',
  'hcpr',
  'rcpr',
  'ncpr',
  'ecpr',
  'wcpr',
  'antiaging-cocktail',
  'mesolift-cocktail',
  'anti-pollution-cocktail',
  'purifying-cocktail',
  'radiance-cocktail',
  'dimenyl-dmae',
  'dm-silk',
  'idebenyl-tight',
  'lumicen',
  'lumicen-gel',
  'silicor',
  'tauricol',
  'glutamax-c',
  'cofinet',
  'saliforo',
  'asiacen',
  'thrinamide',
  'b-hidroxin',
  'polivitamin-bcae',
  'polivitamin-bcae-2'
);
