import Image from "next/image";

export default function Header() {
  return (
    <header className="flex px-4 py-4 bg-zinc-800 text-white">
      <div className="flex items-center w-full mx-auto px-10 gap-x-4">
        <div>Pokedex com Next.JS</div>
        <div>
          <Image
            src="/Pokeball-PNG-Image.png"
            alt="Pokeball"
            width={40}
            height={40}
          />
        </div>
      </div>
    </header>
  );
}
