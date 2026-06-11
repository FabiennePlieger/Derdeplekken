import { BookOpen, Users, TreePine, Coffee } from "lucide-react";

const infoBlocks = [
  {
    title: "Sociale cohesie",
    text: "Derde plekken zijn de lijm van een wijk. Ze brengen mensen samen die elkaar anders nooit zouden ontmoeten: buren, studenten, ouderen en nieuwkomers.",
  },
  {
    title: "Minder eenzaamheid",
    text: "Uit onderzoek van het Sociaal en Cultureel Planbureau (SCP) blijkt dat eenzaamheid in Nederland een groot probleem is. Laagdrempelige plekken waar je zonder afspraak kunt binnenlopen, helpen mensen verbinding te vinden.",
  },
  {
    title: "Betaalbare studieplekken",
    text: "Niet iedereen heeft thuis rust om te studeren of werken. Bibliotheken en buurtcentra bieden gratis wifi en een rustige omgeving, essentieel voor studenten en zzp'ers.",
  },
  {
    title: "Levendige buurten",
    text: "Buurten met actieve ontmoetingsplekken zijn veiliger en prettiger om in te wonen. Mensen kennen elkaar, zorgen voor elkaar en zijn trots op hun omgeving.",
  },
  {
    title: "Mentale gezondheid",
    text: "Buiten zijn, bewegen en sociale contacten zijn bewezen goed voor je mentale welzijn. Parken en andere derde plekken maken dit laagdrempelig toegankelijk.",
  },
];

const typeItems = [
  { color: "#8974d1", icon: <BookOpen size={16} />, label: "Bibliotheken", text: "Gratis, stil, met werkplekken en wifi. Ideaal om te studeren of te werken." },
  { color: "#ff7f63", icon: <Users size={16} />, label: "Buurtcentra", text: "Ontmoeting, activiteiten en een kop koffie. Vaak gratis of heel goedkoop." },
  { color: "#56ddac", icon: <TreePine size={16} />, label: "Parken", text: "Gratis, buiten, altijd open. Seizoensafhankelijk maar onmisbaar." },
  { color: "#f9fa97", icon: <Coffee size={16} />, label: "Horeca (binnenkort)", text: "Cafes met verblijfsdeals tijdens rustige uren. Speciaal voor studenten." },
];

export default function InfoColumn() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-3">Waarom derde plekken?</p>
        <div className="space-y-3">
          {infoBlocks.map((block) => (
            <div key={block.title} className="p-4 rounded-xl2 border-2 border-inkt" style={{ background: "var(--blauw-vlak)" }}>
              <p className="font-extrabold text-sm mb-1">{block.title}</p>
              <p className="text-sm text-gray-700">{block.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-3">Op de kaart</p>
        <div className="space-y-2">
          {typeItems.map((item) => (
            <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-white border-2 border-inkt">
              <span className="w-7 h-7 rounded-full border-2 border-inkt flex items-center justify-center flex-shrink-0" style={{ background: item.color }} aria-hidden="true">
                {item.icon}
              </span>
              <div>
                <p className="font-bold text-sm">{item.label}</p>
                <p className="text-xs text-gray-600 mt-0.5">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
