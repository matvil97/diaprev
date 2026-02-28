import Link from "next/link";
import { Badge, Button, Card, CardBody, CardHeader } from "@/components/ui";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader
          title="Prévenir le diabète, simplement."
          subtitle="Test rapide, score indicatif, recommandations personnalisées. Tout reste sur votre appareil."
        />
        <CardBody className="pt-5">
          <div className="flex flex-wrap gap-2">
            <Badge>RGPD by design</Badge>
            <Badge>Sans serveur</Badge>
            <Badge>2 minutes</Badge>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/risk-test">
              <Button>Commencer le test</Button>
            </Link>
            <Link href="/privacy">
              <Button variant="secondary">Confidentialité</Button>
            </Link>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              { t: "Rapide", d: "8 questions pour estimer le risque." },
              { t: "Lisible", d: "Jauge + conseils actionnables." },
              { t: "Privé", d: "Stockage local + effacement 1 clic." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-white/50 bg-white/60 p-5">
                <div className="font-semibold">{c.t}</div>
                <div className="mt-1 text-sm text-gray-700">{c.d}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardBody>
            <div className="text-sm text-gray-600">Pourquoi c’est innovant ?</div>
            <div className="mt-2 font-semibold">Micro-coaching + recommandations conditionnelles</div>
            <p className="mt-2 text-sm text-gray-700">
              Le score déclenche des conseils adaptés (activité, boissons sucrées, IMC) — extensible vers une version
              connectée (HDS en cible).
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-sm text-gray-600">Note</div>
            <div className="mt-2 font-semibold">Ce n’est pas un dispositif médical</div>
            <p className="mt-2 text-sm text-gray-700">
              Cette démo sert à sensibiliser et orienter. Pour un avis, consultez un professionnel de santé.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}