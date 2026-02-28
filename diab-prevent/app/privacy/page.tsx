"use client";

import { useState } from "react";
import { clearAll } from "@/lib/storage";

export default function PrivacyPage() {
  const [done, setDone] = useState(false);

  function wipe() {
    clearAll();
    setDone(true);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Confidentialité & RGPD</h1>

      <div className="rounded-2xl border p-5 space-y-3 text-sm text-gray-800">
        <p>
          Cette démo applique le principe de <b>minimisation des données</b> :
          vos réponses ne sont pas envoyées à un serveur.
        </p>
        <p>
          Le résultat du test est stocké <b>localement</b> dans votre navigateur (localStorage)
          pour pouvoir l’afficher sur la page “Résultat”.
        </p>
        <p>
          Vous pouvez effacer ces données à tout moment.
        </p>
        <p className="text-gray-600">
          Disclaimer : ce test n’est pas un dispositif médical et ne remplace pas un avis professionnel.
        </p>
      </div>

      <button onClick={wipe} className="rounded-xl bg-black px-4 py-2 text-white">
        Effacer mes données locales
      </button>

      {done && (
        <div className="rounded-xl border p-4 text-sm">
          ✅ Données effacées.
        </div>
      )}
    </div>
  );
}