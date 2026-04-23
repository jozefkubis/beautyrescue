// app/_lib/email/resendClient.ts
import { Resend } from "resend"

// 1️⃣ vytvoríme 1 spoločnú inštanciu klienta
export const resend = new Resend(process.env.RESEND_API_KEY)

/*
  Tento súbor slúži len ako "centrálny klient".
  Neskôr ho použijeme v helperi sendCertificateEmail
  a pokojne aj v iných mailoch (napr. pozvánky, notifikácie).
*/
// Takto sa zabezpečí, že všade používame rovnaký kľúč a inštanciu klienta.
