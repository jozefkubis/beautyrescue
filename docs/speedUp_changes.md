# SpeedUp zmeny

Tento dokument popisuje konkretne vykonane zmeny pre zrychlenie aplikacie Beauty Rescue a dovod, preco boli urobene.

## 1. Root layout uz nerobi serverovy auth check

Zmenene subory:

- `app/layout.tsx`
- `app/_components/navigation/Navigation.tsx`
- `app/_components/navigation/AuthNavControls.tsx`
- `app/_lib/actions_all/auth_actions.ts`

Co sa zmenilo:

- Z `app/layout.tsx` bolo odstranene volanie `getCurrentUser()`.
- `Navigation` uz nedostava `isAdmin` zo server layoutu.
- Admin/login cast navigacie je presunuta do samostatneho client komponentu `AuthNavControls`.
- Bol pridany helper `getCurrentAdminStatus()`, ktory vracia informaciu, ci je pouzivatel prihlaseny a ci je admin.

Preco:

- `getCurrentUser()` pouziva `noStore()`, co blokovalo cachovanie verejnych stranok.
- Verejny navstevnik nepotrebuje auth check pri kazdom nacitani homepage, cennika alebo sluzby.
- Ochrana `/admin` ostava v `proxy.ts`, takze admin pristup je dalej chraneny.
- Vysledkom je mensi server work pre verejne stranky a lepsia sanca na staticke renderovanie.

## 2. Pridany public Supabase read client

Zmenene subory:

- `app/_lib/supabase/publicServer.ts`
- `app/_lib/data_services_all/data_services.ts`
- `app/_lib/data_services_all/data_about.ts`
- `app/_lib/data_services_all/data_home_image.ts`
- `app/_lib/data_services_all/data_tkn.ts`

Co sa zmenilo:

- Bol pridany `getSupabasePublicServerClient()`.
- Tento client nepouziva `cookies()`.
- Verejne read-only data funkcie boli presunute na tento public client.

Preco:

- Povodny server Supabase client bol naviazany na cookies, co je vhodne pre auth/admin logiku, ale zbytocne pre verejne citanie dat.
- Verejne data ako sluzby, homepage obrazok, about a TKN produkty nemusia byt citane cez session-aware client.
- Oddelenie public read logiky od auth logiky zjednodusuje cache a znizuje dynamicke spravanie verejnych stranok.

## 3. Pridane request dedupe cez React `cache()`

Zmenene subory:

- `app/_lib/data_services_all/data_services.ts`
- `app/_lib/data_services_all/data_about.ts`
- `app/_lib/data_services_all/data_home_image.ts`
- `app/_lib/data_services_all/data_tkn.ts`

Co sa zmenilo:

- Public data funkcie su obalene cez `cache()`.
- Opakovane volania rovnakej funkcie s rovnakymi argumentmi pocas jedneho server renderu sa nemusia vykonavat viackrat.

Preco:

- Niektore data sa pouzivaju na viacerych miestach pocas renderu.
- `cache()` je jednoduche riesenie bez pridania novej cache vrstvy alebo state managera.
- Zmena je lokalna a lahko vratitelna.

## 4. Cennik pouziva batch fetch sluzieb

Zmenene subory:

- `app/_lib/data_services_all/data_services.ts`
- `app/cennik/page.tsx`

Co sa zmenilo:

- Bol pridany `getServicesBySlugs(slugs)`.
- `app/cennik/page.tsx` uz nevola `getServiceBySlug()` 11-krat paralelne.
- Cennik cita sluzby jednym Supabase query cez `.in("slug", slugs)`.

Preco:

- Menej requestov do Supabase.
- Jednoduchsi a rychlejsi server render cennika.
- Zachovane su rovnake vstupne props pre `PricingMain`, aby sa nemenilo UI.

## 5. TKN nacitavanie ma menej duplicitnych query

Zmenene subory:

- `app/_lib/data_services_all/data_tkn.ts`
- `app/kozmetika/microneedling/page.tsx`
- `app/kozmetika/microneedling/tkn/page.tsx`
- `app/kozmetika/microneedling/tkn/[category]/page.tsx`
- `app/sitemap.ts`

Co sa zmenilo:

- Bol pridany `getTknProductsByCategoryId(categoryId)`.
- Bol pridany `getTknCategoriesWithProducts()`.
- Stranky, ktore uz maju kategoriu nacitanu, uz nemusia znova hladat produkty cez category slug.
- Sitemap tiez pouziva category id namiesto opatovneho hladania kategorie cez slug.

Preco:

- Povodne `getTknProductsByCategory(categorySlug)` muselo najprv nacitat kategoriu podla slugu a az potom produkty.
- Pri zoznamoch kategorii to vytvaralo zbytocne duplicitne dotazy.
- Novy postup je stale jednoduchy, ale ma menej DB roundtripov.

## 6. Homepage uz nepouziva `framer-motion`

Zmenene subory:

- `app/_components/home/Main.tsx`
- `app/_components/home/main/news/news_on_image/News_on_image_main.tsx`

Co sa zmenilo:

- Z homepage komponentov boli odstranene importy z `framer-motion`.
- Jednoduche animacie boli nahradene existujucou CSS triedou `fade-up`.
- EKG animacia sa spusta cez jednoduchy `setTimeout` v `useEffect`.

Preco:

- `framer-motion` bol pouzity len na jednoduche fade/slide efekty.
- CSS-only riesenie je jednoduchsie a zmensuje client JavaScript.
- Vizualny charakter animacie ostava podobny.

## 7. Verejne wrapper komponenty sluzieb uz nie su zbytocne client komponenty

Zmenene subory:

- `app/_components/about/AboutMain.tsx`
- `app/_components/products/acupuncture/Acupuncture.tsx`
- `app/_components/products/biokompatibilne-nite/Biokompatibilne_nite.tsx`
- `app/_components/products/botulotoxin/Botulotoxin.tsx`
- `app/_components/products/botulotoxin/potenie/botulotoxin_potenie.tsx`
- `app/_components/products/botulotoxin/vrasky/Botulotoxin_vrasky.tsx`
- `app/_components/products/chemical-peeling/Chemical_peeling.tsx`
- `app/_components/products/diamond-microdermabrasion/Diamond_microdermabrasion.tsx`
- `app/_components/products/jalupro/Jalupro.tsx`
- `app/_components/products/jalupro/classic/Jalupro_classic.tsx`
- `app/_components/products/jalupro/hmw/Jalupro_hmw.tsx`
- `app/_components/products/jalupro/super_hydro/Jalupro_super_hydro.tsx`
- `app/_components/products/jalupro/young_eye/Jalupro_young_eye.tsx`
- `app/_components/products/kyselina-hyaluronova/Kyselina_hyaluronova.tsx`
- `app/_components/products/kyselina-hyaluronova/face/Kyselina_hyaluronova_face.tsx`
- `app/_components/products/kyselina-hyaluronova/lips/Kyselina_hyaluronova_lips.tsx`
- `app/_components/products/mezoterapia/Mezoterapia.tsx`
- `app/_components/products/mezoterapia/invasive/Mezoterapia_invasive.tsx`
- `app/_components/products/mezoterapia/non-invasive/mezoterapia_non_invasive.tsx`
- `app/_components/products/microneedling/Microneedling.tsx`
- `app/_components/products/oxygeneo/Oxygeneo.tsx`
- `app/_components/products/profhilo/Profhilo.tsx`

Co sa zmenilo:

- Z verejnych wrapper komponentov bolo odstranene `"use client"`.
- Interaktivne casti ostali ako client komponenty:
  - `ExpandText`
  - pricing formy
  - admin/update formy
  - modaly a stavove UI

Preco:

- Vacsina tychto wrapperov len renderuje texty, obrazky a layout.
- Nemali vlastny `useState`, `useEffect` ani browser-only logiku.
- Server komponenty posielaju menej JavaScriptu do prehliadaca a menej sa hydratuju.

## 8. Obrazky uz nepouzivaju `unoptimized`

Zmenene subory:

- `app/_components/about/AboutMain.tsx`
- hlavne obrazky vo verejnych service komponentoch
- `app/_components/home/main/news/news_on_image/News_on_image_main.tsx`

Co sa zmenilo:

- Z hlavnych `Image` komponentov bolo odstranene `unoptimized`.
- Pri `fill` obrazkoch bolo doplnene `sizes`, najcastejsie:
  - `(min-width: 1024px) 50vw, 100vw`
  - `100vw` pre homepage hero obrazok

Preco:

- `unoptimized` obchadza Next image optimalizaciu.
- Bez neho vie Next podavat vhodnejsie velkosti obrazkov pre mobil a desktop.
- `sizes` pomaha browseru vybrat spravnu velkost obrazka.

## 9. `PricingMain` memoizuje zoznam accordion poloziek

Zmeneny subor:

- `app/_components/pricing/PricingMain.tsx`

Co sa zmenilo:

- `pricingFormData` je obalene cez `useMemo`.

Preco:

- Pri otvarani/zatvarani accordionov sa nemusi stale nanovo skladat cele pole poloziek a React elementov.
- Toto je mala client optimalizacia, vhodna prave tu, kde sa meni lokalny stav.

## 10. Overenie

Spustene prikazy:

- `npm.cmd run lint`
- `npm.cmd run build`

Vysledok:

- Lint presiel bez errorov.
- Build presiel uspesne.
- Ostali 3 povodne lint warningy, ktore nesuvisia s tymto speedup refactorom:
  - `app/_components/products/profhilo/ProfhiloSectionOne_update_form.tsx`
  - `app/_components/products/profhilo/ProfhiloSectionTwo_update_form.tsx`
  - `app/_lib/actions_all/actions_tkn.ts`

## 11. Poznamka k `framer-motion`

`framer-motion` uz nie je v kode importovany.

Pokus o `npm.cmd uninstall framer-motion` zlyhal na Windows `EPERM` chybe v `node_modules`, preto `package.json` a `package-lock.json` neboli menitene. Dependency je mozne odstranit neskor po uvolneni locku nad `node_modules`.

## 12. Vysledok v Next build reporte

Po zmenach Next build ukazal, ze viacero verejnych stranok je staticky prerenderovanych:

- `/`
- `/onas`
- `/cennik`
- `/novinky`
- `/kozmetika/microneedling/tkn`
- `/robots.txt`
- `/sitemap.xml`

Toto je hlavny prakticky prinos odstranenia auth checku z root layoutu a oddelenia public read dat od cookie-bound Supabase klienta.
