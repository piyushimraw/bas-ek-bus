type Props = {
    text: string
}
function Header({
    text
}:Props) {
  return (
    <header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          {text}
        </h1>
      </div>
    </header>
  );
}

export default Header;
