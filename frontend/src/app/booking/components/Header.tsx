export default function Header() {
  return (
    <div className="h-[60px] w-full bg-white shadow-sm sticky top-0 z-10">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-8">
        <span className="text-2xl font-bold">
          <span className="text-blue-600">Agenda</span>
          <span className="text-black">Stay.</span>
        </span>
      </div>
    </div>
  );
}
