export default function Layout({ children }) {
  return (
    <>
      <div className="p-8 pt-0 h-screen overflow-auto">{children}</div>
    </>
  );
}
