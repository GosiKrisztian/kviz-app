export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-8 text-center sm:text-left">
      <h1 className="text-5xl font-extrabold tracking-tight text-black dark:text-white mb-4">
        Üdvözöllek a Kvíz App-ban!
      </h1>
      <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
        Itt létrehozhatsz saját kvízeket, vagy kipróbálhatod mások által készített feladványokat.
        Használd az oldalsó sávot a kezdéshez!
      </p>
    </div>
  );
}
