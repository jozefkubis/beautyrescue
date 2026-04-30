# Speedup plan pre Beauty Rescue

Ciel: zrychlit prvotne nacitanie, preklikavanie medzi strankami a nacitavanie dat bez zbytocneho overengineeringu. Zmeny maju byt jednoduche, postupne a lahko vratitelne.

## Zasady

- Najprv riesit najvacsi dopad, nie drobne mikrooptimalizacie.
- Nemenit vizualny obsah, texty ani UI spravanie, pokial to nie je vyslovene cielom danej ulohy.
- Nepouzivat novy state manager ani komplikovanu cache vrstvu.
- `useMemo` pouzit iba tam, kde realne brani zbytocnym prepocitaniam v client komponentoch.
- Kazdu etapu overit cez `npm.cmd run lint`, `npm.cmd run build` a zakladne preklikanie webu.

## 1. Odpojit auth check z root layoutu

Aktualny problem:

- `app/layout.tsx` vola `getCurrentUser()`.
- `getCurrentUser()` pouziva `noStore()`, co zhorsuje cachovanie verejnych stranok.
- Verejny navstevnik tak spusta Supabase auth check aj pri beznom otvoreni homepage alebo sluzby.

Navrh:

- Odstranit `getCurrentUser()` z `app/layout.tsx`.
- Nechat ochranu `/admin` v `proxy.ts`, ktora uz je jedinym zdrojom pravdy pre admin pristup.
- Admin/login cast navigacie izolovat do maleho client komponentu alebo ju neriesit v kritickom server renderi verejnych stranok.

Ocakavany efekt:

- Lepsi TTFB na verejnych strankach.
- Lepsia sanca na staticke/ISR renderovanie.
- Menej Supabase auth volani.

## 2. Pridat jednoduchy public Supabase read client

Aktualny problem:

- Verejne data sa citaju cez server client naviazany na cookies.
- To je vhodne pre auth/admin akcie, ale zbytocne pre verejne read-only data.

Navrh:

- Pridat jednoduchy Supabase client pre verejne citanie bez `cookies()`.
- Pouzit ho iba pre read-only funkcie:
  - sluzby,
  - homepage obrazky,
  - o nas,
  - TKN kategorie a produkty.
- Auth/admin logiku nechat na existujucom cookie-aware server clientovi.

Ocakavany efekt:

- Menej dynamickeho renderovania.
- Jednoduchsie cachovanie verejnych dat.
- Jasnejsie oddelenie public read logiky od admin/auth logiky.

## 3. Zaviest jednoduche cachovanie verejnych dat

Aktualny problem:

- Verejne Supabase dotazy sa robia opakovane.
- Sluzby a textove data sa pravdepodobne nemenia tak casto, aby museli ist z databazy pri kazdom requeste.

Navrh:

- Zacat jednoducho:
  - route-level `revalidate = 300`, alebo
  - `unstable_cache` pre najcastejsie public data.
- Pri admin ulozeniach dalej pouzivat `revalidatePath`.
- Tag-based cache (`revalidateTag`) zaviest az vtedy, ked bude treba jemnejsie invalidovanie.

Prioritne cacheovat:

- `getServiceBySlug`
- `getAboutUs`
- `getHomeImage`
- TKN kategorie a produkty

Ocakavany efekt:

- Rychlejsie opakovane nacitania.
- Menej zatazenia Supabase.
- Snappier navigacia medzi verejnymi strankami.

## 4. Zredukovat pocet Supabase requestov

Aktualny problem:

- Niektore stranky volaju viacero podobnych dotazov samostatne.
- Cennik nacitava viac sluzieb po jednotlivych slugoch.

Navrh:

- Pridat `getServicesBySlugs(slugs)`.
- Pouzit jeden Supabase dotaz cez `.in("slug", slugs)`.
- Vysledok namapovat podla `slug`.
- Pri TKN strankach odstranit duplicitne nacitanie kategorie, ak sa kategoria uz raz nacitala.

Ocakavany efekt:

- Menej roundtripov do Supabase.
- Rychlejsie server renderovanie stranok s viacerymi datami.
- Jednoduchsi data flow na cenniku.

## 5. Rozdelit velke client komponenty na server shell a male client islands

Aktualny problem:

- Viacere verejne produktove/sluzbove komponenty su oznacene `"use client"`, hoci vacsina ich obsahu je staticka.
- Do prehliadaca tak ide viac JavaScriptu a viac hydratacie.

Navrh:

- Zacat jednou reprezentativnou sluzbou, napriklad chemicky peeling.
- Hlavny layout, texty, obrazky a staticke casti renderovat ako server komponent.
- Client ponechat iba pre interaktivne casti:
  - expand/collapse text,
  - modal,
  - admin formular,
  - stavove UI.
- Po overeni rovnaky vzor preniest na ostatne sluzby.

Ocakavany efekt:

- Mensi client bundle.
- Menej hydratacie.
- Rychlejsie zobrazenie sluzbovych stranok.

## 6. Optimalizovat obrazky

Aktualny problem:

- V kode je viacero `Image` komponentov s `unoptimized`.
- Lokalne obrazky tym obchadzaju Next image optimalizaciu.

Navrh:

- Odstranit `unoptimized` pri lokalnych obrazkoch.
- Pri Supabase obrazkoch overit, ze ich pokryva `images.remotePatterns` v `next.config.ts`.
- Pri `fill` obrazkoch doplnit presnejsie `sizes`.
- Skontrolovat najma hero a prve obrazky na sluzbovych strankach, lebo ovplyvnuju LCP.

Ocakavany efekt:

- Mensie obrazky pre mobil.
- Rychlejsi LCP.
- Lepsie spravanie na pomalsom pripojeni.

## 7. Zjednodusit homepage animacie

Aktualny problem:

- Homepage pouziva `framer-motion` aj na jednoduche fade/slide animacie.
- To zvysuje client bundle.

Navrh:

- Jednoduche animacie nahradit CSS-only riesenim alebo ich odstranit.
- Framer Motion ponechat iba tam, kde je realne potrebna zlozitejsia interaktivita.

Ocakavany efekt:

- Menej JavaScriptu na homepage.
- Rychlejsia hydratacia.
- Jednoduchsi kod.

## 8. Male `useMemo` a client optimalizacie

Tieto zmeny maju mensi dopad, preto patria az po predchadzajucich bodoch.

Navrh:

- V `PricingMain.tsx` memoizovat `pricingFormData`, aby sa pri otvarani accordionov zbytocne nevytvaral cely zoznam.
- Staticke navigacne polia presunut mimo komponentov, ak sa vytvaraju pri kazdom renderi.
- Lazy-loadnut login/admin modal, ak sa bundluje do verejnej navigacie.

Ocakavany efekt:

- Menej zbytocnych client render prepocitani.
- Mierne sviznejsie interakcie.
- Cistejsi client kod.

## Odporucane poradie implementacie

1. Odstranit auth check z root layoutu.
2. Pridat public Supabase read client.
3. Pridat jednoduche cachovanie public dat.
4. Zredukovat pocet Supabase requestov na cenniku a TKN strankach.
5. Prepisat jednu sluzbovu stranku na server shell + client islands.
6. Preniest overeny vzor na ostatne sluzby.
7. Optimalizovat obrazky.
8. Zjednodusit homepage animacie.
9. Doplnit male `useMemo` optimalizacie.

## Co zatial nerobit

- Nezavadzat novy state manager.
- Nerobit velky refactor celej appky naraz.
- Nepouzivat `useMemo` mechanicky vsade.
- Nevytvarat vlastnu komplikovanu cache vrstvu.
- Nemenit texty, dizajn ani UX bez samostatneho zadania.

## Overenie po kazdej etape

- `npm.cmd run lint`
- `npm.cmd run build`
- Preklikat homepage, cennik, sluzby, TKN stranky a `/admin`.
- Skontrolovat desktop aj mobilne zobrazenie.
- Pri cache zmenach overit, ze admin upravy sa po ulozeni stale prejavia.
